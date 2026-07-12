# UI 창 열림 문제 — 개인월드 → 그룹월드 이관 정리

개인월드에서 잘 되던 UI(사이드메뉴 / 강화 / 승급·컬렉션)가 그룹월드로 옮기니 **버튼을 눌러도 창이 안 열리는** 문제. 원인 2가지와 해결(자가치유)을 기록.

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
2. **스크립트만** 패키징(.modpackage) → 그룹월드 임포트 → `MyDesk` 우클릭 **Reimport All**.
   - UI 모델(.model)은 함께 임포트하면 이전 버전으로 덮을 수 있어 주의(스크립트만 갱신 시 배치 안전).
3. `play` → 각 진입 버튼 눌러 창 열림 확인. Build Console 에러 없어야 함.
4. 그룹 `Enable` 체크박스는 이제 안 건드려도 됨 — 스크립트가 부트/열기마다 켬.

> 참고: 그룹월드 몬스터 관련 `LEA-3015 CannotLoad ''` / `LEA-3028 MissingModel`은 `MonsterSpawnSystem`/`MonsterAttack`(몬스터 파트) 이슈로 이 UI 문제와 무관.
