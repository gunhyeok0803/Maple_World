# 인벤토리 설계 & 수정 가이드

> 방치형(메이플키우기 스타일) 인벤토리. **데이터=커스텀 슬롯(DataStorage 디바운스 저장)**, **UI=단일 창(좌 장비 페이퍼돌 27슬롯 + 우 가방 6탭 그리드 + 반투명 상세 팝업)**. 타겟 = 모바일 가로(1920×1080 캔버스).
> 게임 파일: `RootDesk/MyDesk/`(스크립트), `ui/ItemWindows.ui`(UI, 그룹 "ItemWindows"), `UserItemDataSet`(Maker 데이터셋).
> **2026-07-01 단일 창으로 재설계** (이전 무기창/장비창 2창 → 폐기).

---

## 1. 데이터 흐름

```
[필드 픽업] Item.mlua(TriggerEnter,서버) ─┐
[보상](미구현) ──────────────────────────┤→ Inventory:AddItem(name)  ← 서버 권위
                                          │     ├ _T.slots 변경
                                          │     ├ Publish(): SlotsCsv/EquippedCsv/UnlockedCsv(@Sync) 즉시
                                          │     ├ MarkDirty(): dirty=true
                                          │     └ Flush(15s타이머)/OnEndPlay 시 DataStorage 저장
                                          ▼        "slots#equipped#unlocked" (key inventoryV2)
                        [@Sync] Slots/Equipped/Unlocked CSV → 클라 동기화
                                          ▼
                    Inventory.OnSyncProperty(클라) → SendEvent(InventoryChangedEvent)
                                          ▼
        InventoryUI.HandleInventoryChangedEvent → Rebuild(그리드) + RefreshWorn(페이퍼돌)
```
접속 시: `Inventory.OnBeginPlay`(서버) → DataStorage 로드(slots/equipped/unlocked 복원) → Publish → 클라 UI.

---

## 2. 파일별 역할

| 파일 | 타입 | 역할 |
|---|---|---|
| `Inventory.mlua` | @Component(플레이어) | **데이터 권위.** 슬롯 + 장착(part→name) + 해금(unlocked). API: `AddItem`/`RemoveItemAt`/`HasSpaceFor`/`RequestEquip`/`GetEquipped`/`RequestUnlockPart`/`IsUnlocked`. DataStorage 디바운스. **★ DefaultPlayer에 Add Component 필요** |
| `InventoryUI.mlua` | @Component(컨트롤러) | **단일 창 컨트롤러.** 열고닫기(SetOpen/Toggle), 탭 필터(Rebuild), 상세 팝업(ShowDetail), 착용칸(RefreshWorn), 장착/분해/해금. 경로 조회 기반 |
| `UIItemSlot.mlua` | @Component(슬롯) | 가방 슬롯 1칸. 아이콘/선택 하이라이트. 클릭 → `InventoryUI:OnSlotClicked` (GetComponent) |
| `InventoryChangedEvent.mlua` | @Event | 인벤 변경 신호 |
| `Item.mlua` | @Component(필드) | 필드 아이템. `ItemIndex`→닿으면 AddItem |
| `ui/ItemWindows.ui` | UI | 단일 창(Controller/OpenBtn/Dimmer/EquipPanel/BagPanel/DetailPopup) |
| `UserItemDataSet` | Maker 데이터셋 | **한 CSV 관리(확정).** 컬럼: **Name, IconRUID, Description, Type, Part(부위), Category(탭=장비/소비/기타/설치/캐시/치장)**. Category 비면 Weapon/Armor→"장비" 추론 |
| `scratchpad/build_inventory_single.cjs` | 빌드 | `ItemWindows.ui` 생성. 슬롯 좌표=`EQUIP_SLOTS` 배열 |

---

## 3. 수정 지점 맵 (★ "뭘 바꾸려면 어디로")

| 하고 싶은 것 | 수정 위치 |
|---|---|
| **아이템 추가** | `UserItemDataSet`(Maker) 행 추가(Name/IconRUID/Description/Type/Part/Category). 필드에 놓으려면 `Item` 오브젝트+`ItemIndex` |
| **인벤 용량** | `Inventory.mlua` `MaxSlots` |
| **저장 주기** | `Inventory.mlua` `FlushInterval`(기본 15초) |
| **저장 키/형식** | `Inventory.mlua` `SaveKey`, `DataString()`, `OnBeginPlay`(로드 파싱) |
| **장비 슬롯 배치/좌표** | ★ `build_inventory_single.cjs`의 `EQUIP_SLOTS`(x,y,locked) 수정 후 재빌드 |
| **장비 슬롯 부위(Part) 이름** | ★ `InventoryUI.SlotDefs()`(순서=EQUIP_SLOTS와 1:1). **둘 다 같은 길이/순서/locked 유지** |
| **탭 목록/카테고리** | `InventoryUI.TabCategories()` + `.ui`의 `Tab_0..5` 라벨(빌드 스크립트) + 데이터셋 `Category` 값 |
| **탭 필터 기준** | `InventoryUI.CategoryOf(row)` (Category 컬럼 우선, 없으면 Type→장비 추론) |
| **잠금 슬롯 해금** | `Inventory:RequestUnlockPart(part)` 호출(조건 판단은 호출부). 기본 잠금 목록 = SlotDefs의 locked=true |
| **장착 규칙** | `Inventory.RequestEquip`(부위당 1개 교체) / `InventoryUI.OnEquipClicked`(장비 카테고리+미잠금만) |
| **분해 동작** | `InventoryUI.OnDropClicked` → `Inventory.RequestRemoveAt` |
| **하단 기능줄(정렬/판매/확장)** | `.ui`의 `BagPanel/FuncRow`(빈 컨테이너)에 버튼 추가(빌드 스크립트) + `InventoryUI`에 Wire |
| **상세 팝업 항목** | `InventoryUI.ShowDetail` + `.ui` DetailPopup 자식(Icon/Name/Desc) |
| **메소/포인트/프리셋(현재 placeholder)** | `.ui` MesoBar/PointBar/Preset_* + `InventoryUI`에 갱신/핸들러 추가 |
| **창 열기 버튼** | 자체 `OpenBtn`(항상표시) 또는 `InventoryUI.OpenButtonPath`(외부 HUD 버튼 경로) |
| **레이아웃/색/크기** | `build_inventory_single.cjs` 수정 후 재빌드 |
| **슬롯 클릭 동작** | `UIItemSlot.HandleButtonClickEvent` |

---

## 4. ★ 동기화 주의: 함께 맞춰야 하는 것

- **장비 슬롯**: `build_inventory_single.cjs`의 `EQUIP_SLOTS`(좌표+locked) **순서** == `InventoryUI.SlotDefs()`(part+locked) **순서** == `.ui`의 `EquipSlot_0..26`. 세 곳 길이/순서/locked 일치.
- **부위(Part)**: `SlotDefs()`의 part 값 == 데이터셋 `Part` 값(예: 나뭇가지→무기, 산타모자→모자).
- **탭(Category)**: `TabCategories()` == `Tab_0..5` 라벨 == 데이터셋 `Category` 값(없으면 Type 추론).

---

## 5. 알려진 이슈 / 개선 여지

- **[해결됨] DataStorage 디바운스**: 변경 시 @Sync만 즉시 + `Flush()`(15초)/`OnEndPlay`에서만 저장.
- **[해결됨] 해금 지원**: `UnlockedCsv` 영속 + `RequestUnlockPart`/`IsUnlocked`. 기본 잠금 슬롯(뱃지/보조무기/엠블렘/포켓 등)은 SlotDefs locked=true.
- **[정보] UIItemSlot/InventoryUI 접근은 `GetComponent`로 통일**(dot 지양).
- **[정보] SlotTemplate은 `raycast:true`**(RaycastTarget 없으면 클릭이 Dimmer로 빠짐).
- **[성능] Rebuild가 슬롯 전체 파괴/재생성**: ≤100개는 무방. 커지면 GridView 가상화 고려.
- **[UI 경고 33개] 84px 슬롯 터치타깃(<88)·가장자리 근접**: 비치명적. 슬롯 크게 하려면 EQUIP_SLOTS 좌표+빌드 rect 조정.
- **[미구현] 메소/포인트/프리셋/하단기능줄**: placeholder·빈 컨테이너로 자리만. 나중에 로직 연결.
- **[필수 수동작업] Maker**: DefaultPlayer에 `Inventory` Add Component / 데이터셋 `Part`(+선택 `Category`) 값 지정 / 삭제된 UIInvWindow·InvWindowManager 참조 잔재 제거.
- **[검증 대기] MCP 재연결 후**: refresh → 빌드로그 → play → 창 열기/탭 전환/장착/분해/재접속 유지 확인.
