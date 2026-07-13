# UI 창 열림 문제 — 개인월드 → 그룹월드 이관 정리

개인월드에서 잘 되던 UI(사이드메뉴 / 강화 / 승급·컬렉션)가 그룹월드로 옮기니 **버튼을 눌러도 창이 안 열리는** 문제. 원인 2가지와 해결(자가치유)을 기록.

---

## ★★ 모델 이관 원칙: **Update(제자리 덮어쓰기)** — 삭제-후-재생성 금지 (2026-07-13 검증)

**팀원 말이 맞다 — MSW 패키지는 "업데이트 시스템".** (공식 문서 *Package Storage / Updating a Package*, *Utilization of Packages / Rules Related to Importing*)

- 패키지 Import는 항목을 **Entry ID·이름으로 대조**해 diff 아이콘을 띄운다 → "내용 다름"으로 표시된 항목은 **제자리 덮어쓰기(Update)**. Import 직전 월드가 **자동 Revision 저장**(File → Revisions 롤백 가능).
- 모든 UI 모델은 **Entry ID**(= `EntryKey` = `ContentProto.Json.Id`)로 참조된다. `.ui`의 각 인스턴스가 이 Entry ID를 가리킨다.
- **모델을 삭제하고 새로 만들면 새 Entry ID가 발급된다** → 그 모델을 쓰던 `.ui` 인스턴스가 전부 옛 id를 가리킨 채 고아가 됨 → **`LEA-3028 MissingModel`**. (이번 그룹월드 오류의 정확한 원인.)
- 로컬 증거: `Model_EnhanceRootXX`(id `d7f909ac`)·`Model_PromoteRootXX`(`661a9e1c`) = 원본과 내용 동일·id만 새것 = 삭제-후-재생성의 산물. grep 결과 어떤 `.ui`/`.map`/`.mlua`도 참조 안 함(dead).

**→ 이관은 항상: 개인월드(여기)에서 패키지 생성 → 그룹월드에서 Import → 바뀐 항목만 Update.** 그룹월드에서 기존 모델을 **삭제하지 않는다**. 개인월드 모델은 캐논 Entry ID를 그대로 유지하므로, Update-import하면 그룹월드 `.ui` 참조가 자동으로 다시 붙는다.

### UI 그룹 → 모델(Entry ID) 의존도 — 이 id들이 그룹월드에 **같은 id로** 있어야 함
| `.ui` 그룹 | 필요한 모델 (Entry ID) |
|---|---|
| DefaultGroup | Model_Btn_Menu `f9837329`, Model_Btn_Inventory `c2e155f9` |
| SideMenuGroup | Model_Panel_Side `50a6635f` |
| InventoryGroup | Model_Controller `2b1a2c65`, Model_UI_Inventory `47f29cff` |
| **EnhanceGroup** | **없음 — self-contained** (그래서 안 깨진다 = 이관 정본 패턴) |
| PromoteGroup | Model_PromoteRoot `a0df5b3d` |

- **dead(참조 0 · 패키지에 넣지 말 것 · 삭제 권장):** `Model_EnhanceRoot`(`29fe0677`), `Model_EnhanceRootXX`(`d7f909ac`), `Model_PromoteRootXX`(`661a9e1c`).
- **영구 대비책(선택):** Inventory/Promote도 EnhanceGroup처럼 self-contained로 만들면 모델 의존 자체가 사라져 이 부류 오류에 면역(대량 `.ui` 편집이라 별도 작업).

---

## 증상
- 사이드패널·인벤 버튼을 눌러도 반응 없음 / 창이 안 뜸.
- 로그상 `[UISideMenu] 열림`은 찍히는데 화면엔 아무것도 안 보임(토글은 되는데 안 보이는 상태).

## 근본 원인 (2가지)

### 1) 배치 인스턴스 이름이 `Model_` 접두사로 남음
`.modpackage`로 UI 모델을 배치하면 인스턴스 이름이 모델명 그대로(`Model_Btn_Menu`, `Model_Panel_Side` 등)로 들어옴.
스크립트는 절대경로(`/ui/DefaultGroup/Btn_Menu`, `/ui/SideMenuGroup/Panel_Side`)로 찾으므로 **경로 불일치 → 배선 실패**.

**해결:** 배치 인스턴스를 스크립트가 기대하는 이름으로 rename.

| 그룹 | 기대 이름 |
|---|---|
| DefaultGroup | `Btn_Menu`, `Btn_Inventory` |
| SideMenuGroup | `Panel_Side` (안에 `Controller`) |
| EnhanceGroup | `EnhanceRoot` (안에 `Controller`) |
| PromoteGroup | `PromoteRoot` (안에 `Controller`) |
| InventoryGroup | `Controller`, `UI_Inventory` |

### 2) 부모 UIGroup의 `Enable`이 false로 저장됨 ★핵심
`SideMenuGroup` / `EnhanceGroup` / `PromoteGroup` 자체가 그룹월드에 **`Enable=false`로 저장**돼 있음.
UI는 **부모가 disable이면 자식이 아무리 `Enable=true`여도 전부 안 보임**.
그래서 `SetOpen(true)`가 창(Panel_Side / EnhanceRoot / PromoteRoot)을 켜도 부모 그룹이 꺼져 있어 화면에 안 뜸.
에디터에서 체크박스로 켜도 **저장이 잘 안 붙어** play마다 다시 false가 됨(수동으론 계속 깨짐).

**해결(자가치유):** 컨트롤러 스크립트가 **부트/열기 시점에 부모 그룹을 코드로 강제 Enable**.
컨테이너 그룹은 항상 켜두고, 표시 여부는 안쪽 창(Panel/Root)이 토글하는 게 정상.

```lua
-- 열 때 조상(Root/Group)이 disable이면 강제로 켠다 — 이관 자가치유
if open then
    local root = self.Entity.Parent
    if isvalid(root) then
        if root.Enable == false then root.Enable = true end
        local grp = root.Parent
        if isvalid(grp) and grp.Enable == false then grp.Enable = true end
    end
end
```

---

## 변경 파일
- `UI/UISideMenu.mlua` — `EnsureBoot`(부트 시) + `SetOpen`(열 때) 부모 그룹 강제 Enable
- `UI/UIEnhancePanel.mlua` — `SetOpen` 열 때 조상(EnhanceRoot/EnhanceGroup) 강제 Enable
- `UI/UIPromotePanel.mlua` — `SetOpen` 열 때 조상(PromoteRoot/PromoteGroup) 강제 Enable

## 검증 (런타임)
- 그룹 Enable 후 `Open(1)` → `[FIX] EnhanceGroup.en=true Root.en=true Window.en=true` + `[UIEnhancePanel] 열림` → 창 정상 표시 확인.

---

## 이관 체크리스트 (다음에 UI 옮길 때)
1. UI 모델 배치 후 **인스턴스 이름을 위 표대로 rename** (`Model_` 접두사 제거).
2. **패키지 Import는 Update(덮어쓰기)로** — 그룹월드에서 기존 모델/스크립트를 **삭제하지 말 것**. Import 창 diff에서 "내용 다름" 항목만 골라 덮어쓰기. (삭제-후-재생성 = 새 Entry ID = `LEA-3028`. 위 ★★ 절 참조.)
   - 모델(.model)을 함께 Update할 땐 **개인월드가 최신인지 확인**(옛 버전으로 역-덮어쓰기 방지). 스크립트만 바뀌었으면 스크립트만 Update가 가장 안전.
   - `Model_*XX`(dead 모델)는 **절대 패키지에 포함하지 말 것** — 그룹월드에 참조 없는 복사본만 늘어난다.
3. `play` → 각 진입 버튼 눌러 창 열림 확인. Build Console 에러 없어야 함.
4. 그룹 `Enable` 체크박스는 이제 안 건드려도 됨 — 스크립트가 부트/열기마다 켬.

> 참고: 그룹월드 몬스터 관련 `LEA-3015 CannotLoad ''` / `LEA-3028 MissingModel`은 `MonsterSpawnSystem`/`MonsterAttack`(몬스터 파트) 이슈로 이 UI 문제와 무관.
