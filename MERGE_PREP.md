# 병합 준비 — DefaultPlayer 부착 · 데이터셋 · 수동 설정 · 스크립트 구조

> 내일 팀원 작업을 한 씬에 합칠 때 필요한 체크리스트. 우리 파트(인벤·강화·재화·출석) 기준.
> 작성: 2026-07-08.

---

## 1. ★ DefaultPlayer 부착 컴포넌트 (Add Component, Maker 수동)

`Global/DefaultPlayer.model`에 붙어 있어야 하는 스크립트 컴포넌트 (현재 부착됨):

| 순서 | 컴포넌트 | 역할 |
|---|---|---|
| 1 | `script.PlayerHit` | 피격 처리(전투) |
| 2 | `script.PlayerAttack` | 공격 처리(전투) |
| 3 | `script.Inventory` | 인벤토리 데이터 권위(슬롯/장착/흔적/저장) |
| 4 | `script.CombatStats` | 전투력 계산(장착+강화+컬렉션 합산) |
| 5 | `script.PlayerResource` | 재화 보유/획득/소비(resource-package) |
| 6 | `script.PlayerDBManager` | 재화 DB 로드/저장 오케스트레이터 |
| 7 | `script.EnhanceManager` | 스타포스(레전드리 강화·파괴·복구) |
| 8 | `script.PromoteManager` | 승급(등급↑) |
| 9 | `script.CollectionManager` | 컬렉션(대량 등록→영구 스탯) |

> ⚠️ `DefaultPlayer.model`은 Global(에이전트 읽기전용) → **Maker에서 수동 Add Component**. 병합 시 이 9개가 다 붙어 있는지 확인.

---

## 2. 필수 데이터셋 (`.csv` + 짝 `.userdataset` 둘 다 있어야 등록됨)

| 데이터셋 | 경로 | 용도 |
|---|---|---|
| `UserItemDataSet` | `RootDesk/MyDesk/Inventory/` | 아이템 정의(Name/IconRUID/Category/Part/Grade/ReqLevel/Attack/Defense/MaxHP/…) |
| `ResourceDataSet` | `RootDesk/MyDesk/Resource/` | 재화 정의(메소=Type1, 다이아, …, 주문의흔적=Type6) |
| `EnhanceDataSet` | `RootDesk/MyDesk/Enhance/` | 스타포스 Star1~20 확률/파괴율/메소비용/스탯 |
| `CollectionDataSet` | `RootDesk/MyDesk/Enhance/` | 컬렉션 등급별 등록단위/보너스 |

---

## 3. 수동 설정 (Maker)

- **WorldConfig**: `PlayerEntityAuthorityCheck = true` (resource-package 보안 요구)
- **DataStorage 키**(자동 생성, 참고): `inventoryV2`(인벤 5세그), `collectionV1`(컬렉션 누적), resource-package 자체 키

---

## 4. UI 그룹 (`ui/`)

| 파일/그룹 | 내용 |
|---|---|
| `InventoryGroup.ui` | 인벤토리 단일 창(좌 장비 페이퍼돌 + 우 가방 6탭 + 상세팝업 + 승급버튼) |
| `AttendanceBoard.ui` | 출석판 |
| `DefaultGroup.ui` | HUD 버튼(`Btn_Inventory`, `Btn_Attendance`) — 각 창 여는 버튼 |

> 강화창(승급/스타포스/컬렉션 탭)은 아직 UI 없음(로직만). 스타포스·컬렉션은 버튼 없이 로직만 존재.

---

## 5. 스크립트 구조 — 현황 & §13 정합 제안

**현재(기능 폴더):** `RootDesk/MyDesk/` 아래
```
Inventory/  Inventory, InventoryUI, UIItemSlot, Item, CombatStats, InventoryChangedEvent
Enhance/    EnhanceManager, PromoteManager, CollectionManager, EnhanceDataSet, CollectionDataSet
Resource/   PlayerResource, PlayerDBManager, ResourcePickup, ResourceDataSet, (resource-package 일체)
Attendance/ AttendanceUI
Util/       (resource-package 유틸)
(평면)      Monster, MonsterAttack, PlayerAttack, PlayerHit, UIPopup, UIToast
```

**MVP §13 컨벤션:** `Scripts/{Data, Defines, Enums, Managers, Systems, Controllers, Components, UI/{Views,Popups,Panels,Widgets}}` + PascalCase + 역할 접미사(예: `StarforceSystem`, `InventoryController`).

**정합 제안 (2단계로 분리):**
- **A. 폴더만 §13식으로 이동 (안전 — 타입명 불변, 참조/부착 무손상):**
  | 현재 | §13 폴더 |
  |---|---|
  | EnhanceManager, PromoteManager, CollectionManager, CombatStats | `Systems/` |
  | InventoryUI, AttendanceUI | `Controllers/`(또는 `UI/`) |
  | Inventory, PlayerResource, PlayerDBManager, Item, ResourcePickup, UIItemSlot, PlayerHit, PlayerAttack, Monster… | `Components/` |
  | InventoryChangedEvent, Resource*Event | `Events/` |
  | *DataSet.csv/.userdataset | `Data/` |
  | Util 일체 | `Util/`(유지) |
- **B. 파일명까지 §13 규칙으로 개명 (위험 — 부착 9개 + 모든 참조 갱신 + 재부착 필요):** 예 `EnhanceManager→StarforceSystem`, `InventoryUI→InventoryController`. 병합 직후 안정화되면 진행 권장.

> **권장:** 병합 전엔 **A(폴더 이동)**만, 혹은 팀과 컨벤션 합의 후 진행. B(개명)는 병합 후.

---

## 6. 병합 체크리스트

- [ ] 스크립트 **이름 충돌** 확인 (팀원과 같은 파일명 `GameManager` 등 있으면 타입명 충돌 → 하나로 합치거나 개명)
- [ ] 중복 **매니저/시스템** 확인 (양쪽에 인벤/재화 등 겹치면 하나로)
- [ ] DefaultPlayer 부착 9개(§1) 유지 확인
- [ ] 데이터셋 4종(§2) `.csv`+`.userdataset` 짝 존재 확인
- [ ] WorldConfig `PlayerEntityAuthorityCheck=true`
- [ ] UI 그룹(§4) + HUD 버튼 경로 확인
- [ ] 등급 용어 통일: **레어/에픽/유니크/레전드리**(하급/중급/상급/최상급 금지, §13 ItemGrade enum)
- [ ] refresh → build 로그 0 에러 → play 검증
