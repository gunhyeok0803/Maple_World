# 인벤토리 시스템 개발 노트

> 코드 회의 / 추후 수정용 단일 정리 문서. 코드 주석은 최소로 두고, 설계·핵심로직·변경이력은 여기서 관리.

## 0. 한눈에 보는 구조 결정

- **데이터 모델: 네이티브 `InventoryComponent` + `_ItemService` 사용** (직접 슬롯 배열을 만들지 않음).
- **영속화(저장): 엔진이 자동 처리.** 네이티브 인벤토리는 게임 종료 후에도 유지되고, 재접속 시 `InventoryItemInitEvent`로 복원됨. → 별도 저장 코드 불필요(단, 아래 "미해결" 참고).
- **장비 개체성: 강화/잠재는 커스텀 `@Item` 스크립트의 `@Sync property`로 보관.** 같은 장비라도 인스턴스마다 다른 값.
- **획득 단일 진입점: `_InventoryLogic:AddItem(inv, name, count)`.** 줍기·거래·보상이 전부 이 함수 하나만 호출 → 확장 쉬움(#7).
- **메소(재화): 아이템 인벤토리와 분리된 카운터로 유지**(메이플 UI도 메소는 하단 별도). Phase 1 범위 밖, 추후 정리.

### 데이터 흐름
```
[줍기 / 거래 / 보상]
        │
        ▼
_InventoryLogic:AddItem(inv, name, count)   ← 서버 전용, 유일한 획득 통로
        ├─ DataSet에서 Type/MaxStackCount 조회
        ├─ 스택형이면 기존 슬롯 ItemCount 증가
        └─ 남으면 _ItemService:CreateItem 으로 새 개체 생성
        ▼
네이티브 InventoryComponent (자동 영속화) → Added/Modified/Init 이벤트 → (Phase2) UI 갱신
```

## 1. 파일 구성

| 파일 | 상태 | 역할 | 핵심 |
|---|---|---|---|
| `RootDesk/MyDesk/UserItemDataSet.csv` | 수정 | 아이템 정적 데이터 | `Type` 열 추가(Weapon/UseItem) |
| `RootDesk/MyDesk/Weapon.mlua` | 수정 | 장비 `@Item` 타입 | 개체 필드 `UpgradeLevel`(강화)·`Potential`(잠재) 추가 |
| `RootDesk/MyDesk/UseItem.mlua` | 신규 | 소비 `@Item` 타입 | Name/MaxStackCount/EffectAmount |
| `RootDesk/MyDesk/InventoryLogic.mlua` | 신규 | `@Logic` `_InventoryLogic` | `AddItem` = 획득 단일 진입점(스택+생성) |
| `RootDesk/MyDesk/Item.mlua` | 수정 | 월드에 떨어진 아이템(아이템 측) | 트리거 시 `_InventoryLogic:AddItem` 호출로 변경 |

### 삭제 완료
- `LiteInventory.mlua` : 타입-인덱스 수동 인벤토리. 네이티브로 대체. (삭제됨)
- `ItemPickUpComponent.mlua` : 플레이어 측 하드코딩 픽업. `Item.mlua`(아이템 측)로 대체. (삭제됨)
  - ※ 살릴 로직(Phase 2 사용/장착에서 재구현): "나뭇가지 → CustomOneHandedWeaponEquip 무기 장착", "빛나는물약 → PlayerComponent.Hp +10".

### 유지 (Phase 2~3에서 재사용/재작성 예정)
- `OnClickSlot.mlua` : 슬롯 클릭 → 장착. Phase 2에서 정보팝업/사용/장착으로 재작성. (현재 `UIItemSlot` 미존재로 경고 1건 — 정상)
- `Get_Item_Component.mlua` / `Drop_Item_Component.mlua` : 메소(재화) 픽업/드롭. Phase 3 통화 시스템에서 재정비.
- `Inventory_component.mlua` / `UIPopup.mlua` / `UIToast.mlua` : Phase 2 UI 베이스.

## 2. 핵심 로직 메모

### `_InventoryLogic:AddItem(inv, itemName, count)` (ServerOnly)
1. `UserItemDataSet`에서 `FindRow("Name", itemName)`로 행 조회.
2. `Type` 열 → `{Weapon=Weapon, UseItem=UseItem}` 매핑으로 `@Item` 타입 결정.
3. `MaxStackCount > 1`(스택형)이면 기존 같은 이름 슬롯의 `ItemCount`를 max까지 채움.
4. 남은 수량은 `_ItemService:CreateItem(type, name, inv)`로 새 개체 생성 후 `ItemCount` 설정.
- 장비(MaxStackCount=1)는 항상 새 개체 → 개체별 강화/잠재 보존.

### 커스텀 `@Item` 필드
- `Weapon`: Name, MaxStackCount, Damage, Defense + **UpgradeLevel, Potential(개체 고유)**.
- `UseItem`: Name, MaxStackCount, EffectAmount.
- `OnCreate()`에서 `self.ItemTableData:GetItem("열이름")`으로 정적값 로드.

## 3. 필요한 Maker 수동 작업 (AI가 못 하는 부분)
- (테스트용) 월드에 아이템 엔티티 배치 시: `SpriteRendererComponent` + `TriggerComponent` + `Item` 컴포넌트(ItemIndex 설정)가 있어야 픽업됨.
- `InventoryComponent`는 `Player.model`에 기본 포함되어 있어 추가 작업 불필요(확인 완료).

## 4. 검증 결과 / 미해결

### 완료 (2026-06-30, play 모드 server_main에서 `_InventoryLogic:AddItem` 직접 호출)
- [x] 빌드 에러 0 (LiteInventory 삭제 후). 남은 경고는 `UIItemSlot`(Phase2 예정)·`PlayerAttack.Damage` Info뿐.
- [x] **스택**: 빛나는물약 +3, +2 → 한 슬롯 `x5` (UseItem). MaxStackCount 기반 스택 정상.
- [x] **장비 개체 분리**: 나뭇가지 → 별도 슬롯 `x1` (Weapon). Type 열 라우팅 정상.
- [x] **중요 발견**: `_ItemService:CreateItem` 직후 같은 프레임의 `GetItemList`엔 새 아이템이 아직 안 보임(1프레임 지연). → **UI 갱신은 `GetItemList` 즉시조회가 아니라 `InventoryItemAddedEvent` 구독으로 해야 함.** (Phase 2 설계 반영)

### 영속화 검증 완료 (2026-06-30, stop→play 재접속 사이클)
- [x] **존재·개수·개체필드 전부 보존**: 빛나는물약 x7, 나뭇가지 upgrade=7 / pot="TestPot" 가 재접속 후 그대로 복원됨.
- [x] **결론: 네이티브 InventoryComponent가 ItemCount + 커스텀 @Item @Sync 필드(강화/잠재)까지 자동 영속화 → 별도 저장 레이어 불필요(#3 충족).**
- [⚠️] **주의(캐비엇)**: 자동저장은 **주기적/디바운스**. 아이템 추가 "직후 즉시" 급작 종료하면 직전 변경이 유실될 수 있음(첫 테스트에서 x5가 x1로 보인 원인). 실게임 정상 플레이/정상 퇴장에선 문제 없음. 더 엄격히 하려면 `UserLeaveEvent`에서 명시적 저장 호출을 보강(선택).

### 걸어가서 줍기 end-to-end 검증 완료 (2026-06-30)
- [x] 맵 (1, 0.3)에 테스트 아이템 배치 → 플레이어 우측 이동 → 충돌 → 픽업 → 인벤 반영 → 월드 아이템 파괴 확인.
- [x] 로그 스택: `Item.HandleTriggerEnterEvent → InventoryLogic.AddItem` / `AddItem ok: 빛나는물약`. 픽업 후 `GetEntityByPath(TestPotion)` = invalid(파괴됨).
- [x] 기존 스택에 합산(7→8) 확인.
- 검증 후 테스트 픽스처 TestPotion은 맵에서 제거함(맵 클린 상태).

### 월드 아이템 배치 레시피 (MapBuilder)
실제 아이템 엔티티는 아래 컴포넌트 조합 + script.Item으로 배치(이동 안 하므로 Body 컴포넌트 불필요):
- `MOD.Core.TransformComponent` / `MOD.Core.SpriteRendererComponent`(SpriteRUID=아이콘) / `MOD.Core.TriggerComponent` / `MOD.Core.TweenFloatingComponent` / `script.Item`
- `script.Item` 값: `ItemIndex`(UserItemDataSet 1-based 행번호; 1=나뭇가지, 2=빛나는물약), `DropTweenTime`(예: 0.2)
- 호출: `m.sprite(name,{ruid,pos,order})` → `m.upsertComponent(name, "...TriggerComponent", {})` → `...TweenFloatingComponent` → `m.upsertComponent(name,"script.Item",{ItemIndex,DropTweenTime})` → `write` → refresh.

### 환경 메모
- node가 PATH에 없음. 빌더 실행은 PowerShell + `& "C:\Program Files\nodejs\node.exe" <script>` 형태로.

## 4-bis. Phase 2 UI — 메이플월드 기본 인벤토리 프리셋 채택

### 결정: 수제 UI 대신 MSW 기본 "인벤토리" 프리셋 사용
- 사용자가 에디터에서 인벤토리 프리셋을 추가 → 디스크 저장 시 `UIInventory.mlua` + `UIItemSlot.mlua` 생성됨.
- **결정적 사실: 프리셋이 네이티브 InventoryComponent 모델용임** (우리 Phase 1과 동일 모델):
  - `UIInventory`가 `InventoryItemInitEvent`/`AddedEvent`/`RemovedEvent`/`ModifiedEvent`(@EventSender "LocalPlayer") 구독.
  - `item.GUID`/`item.IconRUID`/`item.ItemCount`로 렌더, **GUID당 슬롯 1개** → 장비 개체(강화/잠재)와 호환.
- **검증(play+screenshot)**: 백엔드 변경 0으로, 영속 저장된 아이템(빛나는물약 x8·나뭇가지)이 프리셋 UI 슬롯에 그대로 렌더됨. ✅
- 정리: 내가 만들었던 `/ui/InventoryGroup/Window` 수제 서브트리 제거(프리셋 `Inventory`만 남김). `ui/InventoryGroup.ui`에 프리셋 14엔티티만 존재.

### 프리셋 UI 구조 (`ui/InventoryGroup/Inventory`)
- `InventoryPanel/CloseButton` (닫기 = Enable=false)
- `InventoryPanel/CoinPanel/coin_count`,`coin_icon` (메소 표시)
- `InventoryPanel/Inventory_ScrollView/item_slot/img_slot/item_count` (슬롯 프리팹, `script.UIItemSlot`)
- `script.UIInventory`는 `Inventory` 엔티티에 부착.

### 여닫기 배선 완료 (2026-06-30)
- **여는 버튼**: `ui/DefaultGroup/Btn_Inventory`(우상단 88×88, 가방 아이콘 `11fb713ba7494fedad4ca1f2c953a432`) 생성.
- `UIInventory.inventoryBtnPath` 인스턴스값을 `/ui/DefaultGroup/Btn_Inventory`로 설정.
- **시작 닫힘 처리(중요)**: `Inventory` 엔티티의 Enable을 끄면 UIInventory.OnBeginPlay가 안 돌아 배선 자체가 안 됨. 그래서 **스크립트가 붙은 `Inventory`는 켜둔 채, 자식 `InventoryPanel`만 토글**하도록 `UIInventory` 수정:
  - open/close 함수가 `self.Entity.Enable` → `panel(InventoryPanel).Enable` 토글
  - `OnBeginPlay` 끝에서 `panel.Enable=false`로 시작 닫힘
- 검증(play): 시작 시 닫힘(로그 `before enable=false`) → 패널 열기 시 아이템 2개 표시 확인. 단, **UI 버튼 실제 클릭은 mouse_input이 못 누름**(엔진 UI 한계) → 실제 플레이/기기에서 확인 필요(배선은 코드상 정상).
- **정보팝업(#5)**: `UIItemSlot.HandleButtonClickEvent`의 `-- TODO: item logic` 자리에 장비 정보팝업 연결. 강화/잠재는 native Item에 없으므로 `_ItemService:GetItemByGUID`/`GetMODItemsByOwner`로 MOD 아이템(Weapon) 조회해 UpgradeLevel/Potential 표시.
- **중복 정리(예정, 확인 후)**: `Inventory_component.mlua`(프리셋 자체 open/close로 대체), `OnClickSlot.mlua`(프리셋 UIItemSlot으로 대체) → 삭제 후보. 현재 빌드 경고 1건도 OnClickSlot 출처.
- **카운트 표시 확인**: 빛나는물약 스택 수(x8)가 슬롯에 표시되는지 확인 필요.

### 정보 팝업(#5) + 버리기/사용 완료 (2026-06-30)
- **정보 팝업 UI**: `ui/InventoryGroup/ItemInfo`(시작 숨김, 스크립트 없음 — `UIInventory`가 제어). Bg/Icon/Name/Stats + [사용]/[버리기]/[X].
- **`UIInventory` 확장**: `OnBeginPlay`에서 팝업 버튼 ConnectEvent 배선(와이어링 위해 잠깐 켜고 끔) + `ShowItemInfo(item)` 추가.
  - `ShowItemInfo`: 정적값(설명/공/방)=`item.ItemTableData`, **개체값(강화/잠재)=`_ItemService:GetMODItemsByOwner`로 GUID 매칭해 Weapon에서 읽음(클라 동작 확인)**.
- **`UIItemSlot` 슬롯 클릭** → `Inventory.UIInventory:ShowItemInfo(self.item)` (기존 TODO 자리).
- **`InventoryLogic` 서버 메서드**: `@ExecSpace("Server") RequestRemoveItem(guid)`=`_ItemService:RemoveItem`; `RequestUseItem(guid)`=소비형 개수-1(0이면 제거). 클라 버튼→서버 라우팅.
- **삭제 시 UI 슬롯 자동 제거**: 네이티브 `InventoryItemRemovedEvent` → 프리셋이 슬롯 Destroy(추가 코드 0).
- **검증(play+screenshot)**: 클릭→팝업(나뭇가지 / 공99999·방0 / **강화+7·잠재 TestPot** / 개수1) ✅. 버리기→item·슬롯 제거(2→1) ✅. 사용→빛나는물약 개수-1 ✅.

## 4-ter. Phase 2 마무리 상태

### 완료 (현재 동작)
- 메이플 기본 인벤토리 프리셋 + 우리 네이티브 백엔드.
- HUD 가방 버튼으로 열기 / CloseButton·X로 닫기 (시작 닫힘).
- 슬롯 클릭 → 정보 팝업(아이콘/이름/설명/공·방/**강화·잠재**/개수).
- 버리기(1개씩, 0이면 제거) / 사용(소비형 1개씩).
- 줍기 → 자동 반영, 영속화(개수+강화/잠재).

### 정리 완료
- 삭제: `OnClickSlot.mlua`(프리셋 `UIItemSlot`이 대체), `Inventory_component.mlua`(프리셋 open/close가 대체). 관련 빌드 경고 제거됨.

### 남은 빌드 경고(무해, 에러 아님)
`UIInventory`에서 4건의 LIA Info:
- 1115 `RequestRemoveItem`/`RequestUseItem` — 린트가 커스텀 `_InventoryLogic` 메서드를 정적으로 못 찾음(런타임 OK, 검증됨).
- 1114 `UpgradeLevel`/`Potential` on Item — 린트가 native Item로 보지만 런타임은 MOD(Weapon) 객체(검증됨).
→ 무시 가능. 거슬리면 추후 타입 힌트/래퍼로 정리.

### Phase 2 범위 밖(향후, 원하면)
- 탭 분류(장비/소비/설치/기타) — 현재 프리셋은 단일 리스트.
- 장비 [사용]→실제 [장착](코스튬 연동). 현재 [사용]은 소비형만 동작.
- 수량 입력 버리기 / Shift+클릭 전체 버리기.
- 메소(재화) 표시·저장 = Phase 3 통화.

## 4-quater. UI 바인딩 계약 (비주얼은 사용자가 편집)

> 스크립트(`UIInventory`)는 아래 **엔티티 경로/이름**만 보고 동작. 이 이름·컴포넌트만 유지하면 위치·크기·색·스킨은 메이커에서 자유롭게 편집 가능.

**디테일은 중앙 팝업이 아니라 "인벤 창 옆 패널"** (`Inventory/DetailPanel`). 창 닫으면 같이 숨김.

| 엔티티 경로 | 컴포넌트 | 스크립트가 하는 일 | 편집 가능 |
|---|---|---|---|
| `/ui/InventoryGroup/Inventory` | `script.UIInventory` | 컨트롤러(항상 켜둠) | 위치/스킨 X(루트) |
| `…/Inventory/InventoryPanel` | — | 열고닫기 대상(창 본체) | 자유 |
| `…/InventoryPanel/CloseButton` | Button | 닫기(창+디테일) | 위치/스킨 자유 |
| `…/Inventory/DetailPanel` | — | 슬롯 선택 시 표시되는 디테일 영역 | **위치/크기/스킨 자유** |
| `…/DetailPanel/Icon` | SpriteGUIRenderer | 아이콘 = `item.IconRUID` | 자유(이름 유지) |
| `…/DetailPanel/Name` | Text | 이름 | 자유(이름 유지) |
| `…/DetailPanel/Stats` | Text | 설명/공·방/강화·잠재/개수 텍스트 | 자유(이름 유지) |
| `…/DetailPanel/BtnUse` | Button | 사용(소비 -1) | 자유(이름 유지) |
| `…/DetailPanel/BtnDrop` | Button | 버리기(-1) | 자유(이름 유지) |
| `/ui/DefaultGroup/Btn_Inventory` | Button | 인벤 열기(경로는 `UIInventory.inventoryBtnPath`) | 자유 |
| `…/InventoryPanel/Inventory_ScrollView/item_slot` | `script.UIItemSlot` | 슬롯 프리팹(아이콘+개수, 클릭=디테일) | 자유(자식 `img_slot`/`item_count` 이름 유지) |

**편집 규칙(중요)**: 위 **경로의 마지막 이름**(DetailPanel/Icon/Name/Stats/BtnUse/BtnDrop, item_slot의 img_slot/item_count)만 유지하면 됨. 이름 바꾸면 스크립트가 못 찾음 → 바꿀 거면 `UIInventory`의 `GetEntityByPath(...)` 경로도 같이 수정.
- 표시 항목/문구 바꾸기 → `UIInventory.ShowItemInfo`의 Stats 텍스트 조립부.
- 디테일 위치를 창 안/옆 어디로 둘지 → `DetailPanel`의 anchor/pos만 메이커에서 조정.

## 4-quinque. 인벤 UI 3구역 풀화면 레이아웃 (image-2 스타일)

풀스크린 오버레이(`InventoryPanel` = 토글 대상, `Dimmer` 풀스크린) 안에 3구역:
- **왼쪽 `InventoryPanel/EquipBg`** = 착용 장비 **placeholder**(부위 슬롯 8개 + `CharBox` 캐릭터 자리 + `Power` 전투력). 실제 장착/아바타 연동은 추후.
- **가운데 `Inventory/DetailPanel`**(display_order 100, 디머 위) = 선택 아이템 상세(Icon/Name/Stats/BtnUse/BtnDrop). 슬롯 클릭 시 표시.
- **오른쪽** = `InventoryPanel/Tabs/Tab0~4`(장비/소비/설치/기타/캐시) + `InventoryPanel/Inventory_ScrollView`(슬롯 리스트, 재배치) + `CoinPanel`(메소) + `ListCount`(0/300) + `BtnSalvageAll`(일괄분해 placeholder).

배치 좌표(대략): 좌 x≈-600 / 중앙 x≈0 / 우 x≈+600, 각 폭 ~520, 높이 ~800. 비주얼 미세조정은 사용자가 메이커에서.

**미완(다음)**:
- **탭 필터링 로직 미배선** — 탭은 화면에만 있고 아직 카테고리 필터 안 함. `UIInventory`에 `장비=Weapon / 소비=UseItem` 필터(나머지 빈 탭) 추가 필요.
- 비주얼 폴리시(가운데 패널 솔리드감, 오른쪽 리스트 배경색, 슬롯 크기)는 사용자 편집 영역.

## 4-sextus. 탭 필터링 + 카테고리 타입

- **아이템 타입 5종** = 탭 5개와 1:1: `Weapon`(장비)/`UseItem`(소비)/`SetupItem`(설치)/`EtcItem`(기타)/`CashItem`(캐시). 신규 3종(Setup/Etc/Cash)은 UseItem과 동일 패턴 thin `@Item`.
- `InventoryLogic.GetTypeMap`에 5종 등록(DataSet `Type` 문자열 → 타입 객체). DataSet에 의자/주문서조각/캐시모자 행 추가(아이콘은 임시 RUID 재사용 → 실제 IconRUID로 교체 필요).
- **`UIInventory` 탭 필터**: `self._T.curTabType` + `SetTab(typeName)` + `ApplyTabFilter()`. Tab0~4 클릭 → 해당 타입만 슬롯 `Enable`. 슬롯 생성(Init/Added) 시 현재 탭 기준 표시. 여는 버튼에서도 `ApplyTabFilter` 호출.
- 검증(play): 5종 모두 생성(Weapon4/Use1/Setup1/Etc1/Cash1), 장비/소비/설치 탭에서 해당 타입만 노출 확인.

### 알아둘 점
- ⚠️ **이름 충돌**: 월드드롭 스크립트 이름이 `Item`(@Component)이라 `@Item ... extends Item`이 로컬 diagnose에서 false-positive 에러("got Component"). **메이커 빌드/런타임은 정상**(Weapon/Use/Setup/Etc/Cash 다 동작). 깔끔히 하려면 월드드롭 `Item`을 `WorldItem` 등으로 리네임 → 단, 맵에 배치된 `script.Item`(에디터의 item-21604 포함) 전부 재지정 필요.
- 탭 활성표시(선택된 탭 하이라이트) 미구현 — 폴리시.
- 신규 카테고리 아이콘은 임시 → CSV IconRUID 교체.

## 4-septimus. ★ 제네릭 카테고리 인벤토리 창 시스템 (현재 정식 구조)

> 단일 탭 인벤 폐기 → **카테고리별 독립 창**(무기/장비/…)으로 전환. 한 스크립트를 재사용해 카테고리만 바꿈(#6 재사용·수정성).

- **데이터**: native InventoryComponent 1개(모든 아이템). 각 창은 자기 `Category`(아이템 Type)만 필터해 표시.
- **`UIInvWindow.mlua` (제네릭, @Component)**: 창 루트에 부착. 인스펙터 값 2개로 구성:
  - `Category` = 보여줄 아이템 Type ("Weapon"/"Armor"/…)
  - `openButtonPath` = 이 창을 여는 버튼 경로
  - 동작: LocalPlayer 인벤 이벤트(Init/Added/Removed/Modified) 구독 → `Matches(item)`(ItemTypeName==Category)인 것만 `SlotList`에 슬롯 스폰. 슬롯 클릭→`ShowDetail`(왼쪽 상세). 닫기/버리기/메인액션(stub) 버튼.
- **창 바인딩 계약(이름 유지하면 비주얼 자유)**: `<root>/Window`(토글) · `Window/SlotList`(슬롯부모, ScrollLayoutGroup) · `Window/SlotTemplate`(슬롯 프리팹=script.UIItemSlot, 자식 `img_slot`>`item_count`) · `Window/CloseBtn` · `Window/Detail/{Icon,Name,Stats,BtnMain,BtnDrop}`.
- **`UIItemSlot.mlua`**: 슬롯 1칸 렌더(`SetData`) + `ownerWindow`(소속 창) 보유 → 클릭 시 `ownerWindow.UIInvWindow:ShowDetail`.
- **현재 창 2개**(`ui/ItemWindows.ui`): `WeaponWin`(Category=Weapon) / `EquipWin`(Category=Armor). 임시 열기버튼 `DefaultGroup/Btn_Weapon`·`Btn_Equip`(사용자가 교체·재배치).
- **새 카테고리 추가법**: ① `@Item` 타입 + `GetTypeMap` 등록 + DataSet `Type` ② `UIInvWindow` 단 창 1개 복제(Category/openButtonPath만 변경) + 버튼. 코드 변경 0.
- **검증(play)**: 무기창=Weapon만 / 장비창=Armor만, 슬롯 클릭→상세, 동일 스크립트로 두 창 동작 확인.

### 폐기/주의
- 구 단일 탭 인벤(`InventoryGroup`의 `UIInventory`)은 컴포넌트 제거로 비활성화(이벤트 중복 제거). `UIInventory.mlua` 파일은 미사용(추후 삭제 가능). `Btn_Inventory` 제거.
- 새 카테고리 아이콘/장비창 갑옷 아이콘은 임시 RUID → DataSet IconRUID 교체.
- `Item`(월드드롭) 이름충돌로 `@Item extends Item` 로컬 diagnose false-positive 지속(메이커 빌드/런타임 정상). 정리하려면 월드드롭 `Item`→`WorldItem` 리네임(맵 배치 재지정 필요).
- v1은 동작 위주: 착용 슬롯/등급/각성/장착 실제 동작은 stub → 추후.

## 4-octavus. 비주얼 폴리시 + 각성/장착

- **창 스타일**: 풀스크린 디머 오버레이 + 반투명 상세 패널(왼쪽) + 프레임 목록(오른쪽). 레퍼런스 느낌. 좌표는 §4-septimus 계약 유지.
- **열기 버튼**: `장비`/`무기` 하단 중앙(`DefaultGroup`, anchor bottom-center).
- **각성(awaken)**: `InventoryLogic.RequestAwaken(guid)`(@Server) → Weapon/Armor의 `UpgradeLevel +1`. 상세 패널 버튼 `각성`.
- **장착(equip)**: `Weapon`/`Armor`에 `@Sync Equipped` 추가. `RequestEquip(guid)`(@Server) → `Equipped=true`. 상세 버튼 `장착`. ※ v1은 같은 타입 자동해제/스탯적용 미구현(추후) — 현재는 Equipped 플래그만.
- 상세 패널은 Weapon/Armor일 때 `GetMODItemsByOwner`로 `강화 +N` / `[장착중]` 표시.
- **검증(play)**: 각성 2회 → UpgradeLevel=2, 장착 → Equipped=true(로그+상세 표시 확인).

### 남은 것(장착/각성 심화)
- 장착 시 같은 타입 기존 장착 해제(1슬롯 규칙) + 전투력/스탯 실제 적용 + 왼쪽 착용 슬롯 표시.
- 각성 비용/확률/레벨업 분리, 마스터리 등.

## 4-nonus. 창 전환(겹침)·닫기 수정 + 레퍼런스 재스타일

- **창 매니저 `InvWindowManager.mlua`(@Logic, `_InvWindowManager`)**: 각 `UIInvWindow`가 `Register(self.Entity)`로 등록. 열 때 `OpenOnly(win)` → win만 열고 나머지 창 닫음(겹침 방지). `CloseAll`도 제공.
  - `UIInvWindow` 여는버튼 핸들러가 `self._T.window.Enable=true` → `_InvWindowManager:OpenOnly(self.Entity)`로 변경.
  - 검증: 무기→장비 전환 시 무기창 자동 닫힘(`[SWITCH] Weapon=false Equip=true`), 닫기 동작(`[CLOSE]=false`).
- **레퍼런스 재스타일(무기 이미지 기준)**: 풀스크린 디머 + 중앙 `Frame`(네이비 #1A1E2A) + `HeaderBar`(타이틀 골드/닫기) + **왼쪽 상세 패널**(아이콘/이름/`장착 효과` 구분선/스탯/각성·장착·버리기 버튼) + **오른쪽 목록 프레임**(`ListBg`+슬롯). 색감 네이비+골드.
- `UIInvWindow.Category`/`openButtonPath`는 client-only UI라 `@Sync` 제거(인스턴스값은 .ui 저장).

### 주의/한계
- `.ui` write가 strict 린트 에러나면 **파일이 롤백 삭제됨**(off-canvas 등 주의). 이번에 ItemWindows가 한 번 삭제돼 전체 재생성함.
- 장비창의 좌측 "착용 슬롯"(이미지2 3분할)은 미반영 — 장착 시스템과 함께. 현재는 무기 레퍼 기준 2분할(상세/목록).

## 4-decimus. ★ 2창 분리 레이아웃 + 그리드 목록 (현재 정식 UI — 사용자 확정 설계)

사용자 확정(AskUserQuestion): ① 무기 = **분리된 2창**(좌 상세 / 우 목록)이 **연결**된 형태, 색상 완전 분리. ② 목록은 **4열 그리드**(가로 채우고 다음 줄로 wrap). ③ 등급(하급/중급/상급)은 **무기 시스템 소관 — 인벤토리에서 구현 안 함**. ④ 장비 = **3패널**(착용 + 상세 + 목록).

- **1열 누적 버그 해결**: 목록 부모 `SlotList`의 `ScrollLayoutGroupComponent`를 `Type=Vertical(1)` → **`Type=Grid(2)`** 로 변경. `Constraint=FixedColumnCount(1)` + `ConstraintCount=4` + `StartAxis=Horizontal(0)` + `CellSize{150,150}` + `GridSpacing{12,12}`. 스폰된 슬롯이 **가로 4칸 채우고 자동 wrap** — `UIInvWindow`의 슬롯 스폰 로직은 그대로(부모 컴포넌트만 교체).
- **색상 분리**: 좌(상세) `Bg #1E2336` 어두운 네이비 / 우(목록) `ListBg #E4E1D8` 밝은 베이지. 두 패널이 화면 좌·우에 떨어져 배치 → "연결된 2창" 느낌.
- **무기창(WeaponWin)**: 좌 상세(x=-500) + 우 목록(x=470). 헤더(타이틀/닫기)는 목록 패널 위. 하단 placeholder 버튼 2개(마스터리/일괄각성 — 사용자 교체).
- **장비창(EquipWin) 3패널**: 좌 **착용 장비**(WornBg, 6슬롯 모자/상의/하의/장갑/신발/망토 + 전투력 placeholder) / 중앙 상세 / 우 목록.
- **두 패널 동시 표시**: 창 열면 상세 패널도 항상 보임(`detail.Enable=true` 상시). 선택 전엔 아이콘 숨김(`dIcon.Enable=false`)으로 빈 흰 박스 제거 → `ShowDetail`에서 `dIcon.Enable=true`.
- play 검증: 무기 6개 → 4+2 그리드 wrap, 좌측 상세 동시 표시, 클릭 시 아이콘/이름/스탯/강화 표시. 장비 6개 → 3패널 + 그리드.
- **등급 티어는 의도적으로 미구현**(무기 시스템 책임). `UIItemSlot`/그리드는 등급 무관.

## 5. 변경 이력
- 2026-06-30 Phase 1: 네이티브 인벤토리 채택. DataSet Type열 추가 / Weapon 개체필드(UpgradeLevel·Potential) / UseItem 신규 / InventoryLogic(`_InventoryLogic:AddItem` 단일 진입점) 신규 / Item 픽업 리팩터. LiteInventory.mlua 삭제(수동 인벤토리, 네이티브로 대체). 빌드0에러 + 스택/개체 런타임 검증 통과.
- 2026-06-30 영속화 검증 통과(개수+강화/잠재 보존). 코드 정리: ItemPickUpComponent.mlua 삭제(Item+InventoryLogic으로 대체). 빌드 에러 0 / 경고 1(OnClickSlot의 UIItemSlot, Phase2에서 해소).
- 2026-06-30 걸어가서 줍기 end-to-end 검증 통과(트리거→AddItem→스택→월드아이템 파괴). 테스트 픽스처 제거, 맵 클린. **→ Phase 1 완료.** 다음: Phase 2 UI(탭/슬롯/정보팝업).
- 2026-06-30 Phase 2 시작: `ui/InventoryGroup.ui` 정적 구조 생성(창/탭5/그리드/슬롯템플릿/메소바). 린트 에러 0. 런타임 스크립트 배선은 다음 단계.
- 2026-06-30 Phase 2 방향 전환: 수제 UI 폐기, **MSW 기본 인벤토리 프리셋 채택**(`UIInventory`/`UIItemSlot`). 프리셋이 네이티브 InventoryComponent 이벤트 기반이라 백엔드 변경 0. play+screenshot로 아이템 렌더 확인. 수제 Window 서브트리 제거.
- 2026-06-30 여닫기 배선: HUD에 가방 여는 버튼(`Btn_Inventory`) 추가 + `inventoryBtnPath` 연결. `UIInventory`를 자식 `InventoryPanel` 토글 방식으로 수정(시작 닫힘). play 검증 통과(버튼 실제 클릭만 시뮬레이터 한계로 실기기 확인 필요).
- 2026-06-30 정보 팝업(#5)+버리기/사용: `ItemInfo` 팝업 UI + `UIInventory.ShowItemInfo` + `UIItemSlot` 클릭 연결 + `InventoryLogic` 서버 RequestRemove/UseItem. 정보(강화/잠재 포함)·삭제·사용 모두 play 검증 통과. 빌드 에러 0(Info 경고만).
- 2026-06-30 버리기 수정: 통째 제거 → **1개씩 감소(0이면 제거)**로 변경(`RequestRemoveItem`). 사용/버리기 둘 다 count-1 안전 패턴(제거 후 item 접근 안 함). play 검증: 물약 x3 → 버리기 → x2.
- 2026-06-30 정리: `OnClickSlot.mlua`·`Inventory_component.mlua` 삭제(프리셋이 대체). **→ Phase 2 마무리.** 남은 빌드경고 4건은 UIInventory 린트 정적분석 한계(무해).
- 2026-06-30 테스트 아이템 배치: 스폰 오른쪽 x=1~5에 물약 5개(Potion_1~5, ItemIndex=2). 나뭇가지는 사용자가 좌측에 배치. ※ 다수/재사용 시엔 .model+placeModel 권장.
- 2026-06-30 둥둥(플로팅) 제거: `Item.mlua`에서 드롭 트윈/`TweenFloatingComponent` 의존 삭제(OnBeginPlay 제거, 트리거는 기본 켜짐). Potion_1~5에서 TweenFloatingComponent·DropTweenTime 제거. play 검증: 가만히 있는 아이템도 픽업 정상.
- 메모: 바닥 아이템 픽업 필수 조건 = 엔티티에 `SpriteRenderer + TriggerComponent + script.Item(ItemIndex)`. RUID만 바꾼 스프라이트는 안 주워짐(script.Item/Trigger 없으면). 무엇이 들어가나는 ItemIndex(DataSet 행)가 결정.
- 2026-07-01 Phase 3 시작(경제): `RewardLogic.mlua`(@Logic, `_RewardLogic`) 신규 — `GiveItem`/`GiveItemToUser`/`GiveRewards` 전부 `_InventoryLogic:AddItem`만 호출하는 독립 보상 모듈(씬/UI 의존 0 = 병렬-독립 개발 충족). play 검증: GiveRewards → 인벤 반영. 통합 계약 = `_InventoryLogic` API + `UserItemDataSet`.
- 2026-07-01 UI 재구성: 중앙 팝업 `ItemInfo` 제거 → 인벤 창 옆 `Inventory/DetailPanel`로 이동(슬롯 선택 시 표시, 창 닫으면 같이 숨김). `UIInventory` 배선 갱신. 공식 inventory-package는 무겁고(직업/DB/관리자) 충돌+클릭팝업이라 미채택, 백엔드 유지. play+screenshot 검증. 비주얼 편집용 바인딩 계약은 §4-quater.
- 2026-07-01 인벤 UI 3구역 풀화면 레이아웃(image-2 스타일): 풀스크린 디머 + 왼쪽 착용장비 placeholder / 가운데 상세 / 오른쪽 탭+리스트+일괄분해. play+screenshot로 균형 배치 확인. 상세 §4-quinque.
- 2026-07-01 탭 필터링 배선 + 카테고리 타입 5종(Weapon/UseItem/SetupItem/EtcItem/CashItem). GetTypeMap 확장, DataSet 3행 추가, UIInventory에 SetTab/ApplyTabFilter. play 검증: 탭별 해당 타입만 노출. 상세 §4-sextus. (Item 이름충돌 diagnose false-positive는 메이커빌드 정상)
- 2026-07-01 ★구조 전환: 단일 탭 인벤 폐기 → **제네릭 카테고리 창 시스템**(`UIInvWindow`). 무기창/장비창(Armor 타입 신규) 각각 독립 창, 같은 스크립트 재사용. UIItemSlot에 ownerWindow 콜백. 구 UIInventory 비활성화. play 검증: 카테고리별 필터+상세 동작. 상세·바인딩계약 §4-septimus.
- 2026-07-01 구 InventoryGroup 내용물 전부 제거(빈 그룹 껍데기만 남음 — 메이커에서 삭제 필요).
- 2026-07-01 비주얼 폴리시(디머/반투명/프레임) + 열기버튼 하단중앙. 각성(UpgradeLevel++)/장착(Equipped) 서버 메서드 + 상세 표시. play 검증 통과. 상세 §4-octavus.
- 2026-07-01 창 겹침/닫기 수정: `InvWindowManager`(하나만 열기) + 닫기 검증. 레퍼런스(무기) 기준 좌우분할 재스타일(네이비+골드/Frame/Header/좌상세·우목록). @Sync 경고 제거. 상세 §4-nonus.
- 2026-07-01 ★UI 전면 재설계(사용자 확정): 단일 Frame 2분할 폐기 → **분리된 2창**(좌 어두운 상세 / 우 밝은 목록, 색상 완전 분리). **1열 누적 버그 근본 해결**: SlotList를 `ScrollLayoutGroup Type=Grid(2)` + `ConstraintCount=4`로 → 가로 4칸 채우고 wrap. 장비창 3패널(착용+상세+목록). 상세 패널 상시 표시(빈 아이콘 숨김). 등급 티어는 무기 시스템 소관이라 인벤서 미구현. ItemWindows.ui 전체 재생성(60엔티티, 린트 통과). 무기/장비 play+screenshot 검증 통과. 상세 §4-decimus.
