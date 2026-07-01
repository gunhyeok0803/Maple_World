# 인벤토리 시스템 — 코드리뷰 자료

> 팀 설명용. 변경 로그가 아니라 **"무슨 코드를, 왜, 어떻게 짰는가"** 중심의 기술 설명.
> 짝 문서: 진행/검증 로그는 `Inventory_System.md` 참고.

---

## 0. 한 줄 요약 / 아키텍처

- **MSW 네이티브 `InventoryComponent` + `_ItemService`** 위에 얹은 구조. 직접 슬롯 배열을 만들지 않음.
- **서버 권위(server-authoritative)**: 아이템의 생성·증감·삭제는 전부 서버에서. 클라는 **표시(UI)** 만 담당하고 이벤트로 갱신.
- **획득 단일 진입점** `_InventoryLogic:AddItem(...)` 하나로 줍기/거래/보상 모두 처리.
- **영속화는 엔진 자동** (개수 + 커스텀 @Item 필드까지 유지).

```
[줍기 / 거래 / 보상]
   │  (server)
   ▼
InventoryLogic:AddItem(inv, name, count)   ← 유일한 획득 통로
   ├─ DataSet에서 Type/MaxStack 조회
   ├─ 스택형이면 기존 ItemCount 증가
   └─ 남으면 _ItemService:CreateItem 으로 개체 생성
   ▼
네이티브 InventoryComponent (자동 영속화)
   │  Added / Modified / Removed / Init 이벤트 (server→client)
   ▼
UIInventory (client) → 슬롯 생성/갱신/삭제 → UIItemSlot 렌더
```

---

## 1. 먼저 알아야 할 MSW 개념 (기술 정의)

리뷰 전에 팀이 공유해야 할 용어. 우리 코드가 이것들 위에 서 있음.

| 개념 | 정의 | 우리 코드에서 |
|---|---|---|
| **`@Logic`** | 월드 세션당 1개 자동 생성되는 싱글톤. 맵 이동에도 유지. `_스크립트이름`으로 전역 접근. | `InventoryLogic` → `_InventoryLogic` |
| **`@Component`** | 엔티티에 붙는 동작. 엔티티 수명과 함께. | `Item`(월드 아이템), `UIInventory`/`UIItemSlot`(UI) |
| **`@Item`** | 인벤토리 "아이템 종류"를 정의하는 스크립트 타입. 엔티티 컴포넌트가 아니라 `_ItemService:CreateItem`으로 인스턴스화됨. | `Weapon`, `UseItem` |
| **`@ExecSpace`** | 코드 실행 위치. `ServerOnly`(서버만), `Server`(클라서 호출 시 서버로 라우팅), `ClientOnly`(클라만). | 아래 각 메서드 |
| **네이티브 `InventoryComponent`** | 플레이어 기본 탑재. 소유 아이템 관리 + **Added/Modified/Removed/Init 이벤트** 발생 + **자동 영속화**. | UI가 이 이벤트를 구독 |
| **`_ItemService`** | 아이템 생성/삭제/조회 서비스. `CreateItem`/`RemoveItem`/`GetItemByGUID`(ServerOnly), `GetItemsWithType`/`GetMODItemsByOwner`. | InventoryLogic, UIInventory |
| **native `Item` vs MOD `Item`** | `GetItemList()`는 native `Item`(GUID/ItemCount/IconRUID/ItemTableName/ItemTableData). `GetMODItemsByOwner()`는 우리 `@Item`(Weapon 등) 객체 → 커스텀 필드(UpgradeLevel 등) 접근 가능. | 정보팝업에서 강화/잠재 읽을 때 후자 사용 |

핵심 원칙 2가지:
1. **아이템 변경은 서버에서만.** 클라는 이벤트를 듣고 화면만 바꾼다.
2. **UI는 즉시조회(`GetItemList`)가 아니라 이벤트 구독으로 갱신.** `CreateItem` 결과는 같은 프레임 `GetItemList`에 안 잡히고 1프레임 뒤 반영되기 때문(실측 확인).

---

## 2. 신규 작성 코드 (내가 처음부터 만든 것)

### 2.1 `InventoryLogic.mlua` — `@Logic`, 시스템의 심장

**역할**: 모든 아이템 변경의 서버측 단일 창구. 전역 `_InventoryLogic`로 어디서든 호출.

#### (a) `GetTypeMap()` — DataSet `Type` 문자열 → `@Item` 타입 매핑
```lua
method table GetTypeMap()
    return { Weapon = Weapon, UseItem = UseItem }
end
```
- `_ItemService:CreateItem`의 1번 인자는 **타입 객체**(문자열 아님). DataSet의 `Type` 열 값("Weapon"/"UseItem")을 실제 타입으로 변환하는 다리.
- 새 아이템 종류 추가 시 여기만 한 줄 추가하면 됨.

#### (b) `AddItem(inv, itemName, count)` — 획득 단일 진입점 `@ExecSpace("ServerOnly")`
```lua
local row = _DataService:GetTable("UserItemDataSet"):FindRow("Name", itemName)   -- 이름으로 행 조회
local itemType = self:GetTypeMap()[row:GetItem("Type")]                          -- Type → 타입 객체
local maxStack = math.tointeger(tonumber(row:GetItem("MaxStackCount")) or 1)
-- 1) 스택형이면 기존 슬롯 ItemCount부터 채움
if maxStack > 1 then
    for _, it in ipairs(inv:GetItemsWithType(itemType)) do
        if it.ItemDataTableName == itemName and it.ItemCount < maxStack then ... it.ItemCount += add end
    end
end
-- 2) 남은 수량은 새 개체 생성
while remain > 0 do
    local newItem = _ItemService:CreateItem(itemType, itemName, inv); newItem.ItemCount = add ...
end
```
- **로직 요지**: 스택 가능한 소비템은 기존 슬롯을 max까지 채우고, 넘치거나 비스택(장비)은 새 개체로 생성.
- **장비**는 `MaxStackCount=1`이라 항상 새 개체 → **개체별 강화/잠재 보존**.
- 가드: `inv` nil / 알 수 없는 이름 / 알 수 없는 Type → `log_error` 후 안전 종료.

#### (c) `RequestRemoveItem(guid)` / `RequestUseItem(guid)` — `@ExecSpace("Server")`
```lua
@ExecSpace("Server")              -- 클라(슬롯 버튼)에서 호출하면 서버로 자동 라우팅
method void RequestRemoveItem(string guid)
    local item = _ItemService:GetItemByGUID(guid)   -- GetItemByGUID는 ServerOnly
    local n = item.ItemCount - 1
    if n <= 0 then _ItemService:RemoveItem(item) else item.ItemCount = n end
end
```
- **왜 `Server`인가**: 클릭은 클라에서 일어나지만 `RemoveItem`/`GetItemByGUID`는 ServerOnly. `@ExecSpace("Server")`가 클라 호출을 서버로 넘겨줌.
- **버리기/사용 둘 다 "1개씩 감소, 0이면 제거"** 패턴. `RemoveItem` 후 `item`을 다시 안 건드리는 안전 패턴(파괴된 객체 접근 방지).
- 삭제하면 네이티브가 `InventoryItemRemovedEvent`를 쏴서 UI 슬롯이 자동으로 사라짐(추가 코드 0).

> **설계 결정**: 왜 `@Logic`인가? — 줍기/거래/보상이 전부 같은 함수 하나만 부르게 하려고. Logic은 자동 싱글톤이라 어디서든 `_InventoryLogic`로 접근 가능하고 플레이어/엔티티에 부착 불필요.

---

### 2.2 `UseItem.mlua` — `@Item`, 소비 아이템 타입
```lua
@Item
script UseItem extends Item
    @Sync property string Name = ""
    @Sync property integer MaxStackCount = 1
    @Sync property integer EffectAmount = 0
    method void OnCreate()                       -- CreateItem 시 호출, DataSet 행이 ItemTableData로 주입됨
        self.Name = self.ItemTableData:GetItem("Name")
        self.MaxStackCount = math.tointeger(tonumber(self.ItemTableData:GetItem("MaxStackCount")) or 1)
        self.EffectAmount = math.tointeger(tonumber(self.ItemTableData:GetItem("EffectAmount")) or 0)
    end
end
```
- `@Item extends Item` → 인벤토리가 인식하는 아이템 종류. `OnCreate`에서 `self.ItemTableData:GetItem("열")`로 DataSet 정적값을 로드.
- 소비템 분류(소비 탭/사용 동작)의 기준이 되는 타입.

---

## 3. 수정한 코드 (기존/프리셋을 고친 것)

### 3.1 `Weapon.mlua` — 장비 `@Item` (개체 고유 필드 추가)
- 기존: Name/MaxStackCount/Damage 만.
- **추가한 것**: `Defense`, 그리고 **개체 고유값** `UpgradeLevel`(강화), `Potential`(잠재).
```lua
@Sync property integer UpgradeLevel = 0   -- 같은 장비라도 인스턴스마다 다름
@Sync property string  Potential = ""
```
- **핵심 의미**: 정적 데이터(공격력 등)는 DataSet 공유값, **강화/잠재는 개체별 값** → 이걸 분리하려고 `@Item` 필드로 둠. (이게 우리가 "타입-인덱스 방식" 대신 네이티브 개체 방식을 택한 이유)

### 3.2 `Item.mlua` — 월드에 떨어진 아이템 (`@Component`)
- **리팩터**: 줍기 로직을 `_InventoryLogic:AddItem` 단일 진입점 호출로 변경(기존엔 다른 인벤토리 호출).
- **하드닝**: `ItemIndex` 유효성 검사 추가(0/범위초과 시 에러 대신 경고).
```lua
@Sync property number ItemIndex = 0           -- 이 아이템이 DataSet 몇 번째 행인지

@ExecSpace("ServerOnly")
@EventSender("Self")                          -- 자기 TriggerComponent의 충돌 이벤트 구독
handler HandleTriggerEnterEvent(TriggerEnterEvent event)
    local inv = event.TriggerBodyEntity.InventoryComponent   -- 충돌한 플레이어의 인벤
    if inv == nil then return end
    local ds = _DataService:GetTable("UserItemDataSet")
    local idx = math.tointeger(self.ItemIndex) or 0
    if idx < 1 or idx > ds:GetRowCount() then ... return end  -- 범위 가드(크래시 방지)
    _InventoryLogic:AddItem(inv, ds:GetRow(idx):GetItem("Name"), 1)
    self.Entity:Destroy()
end
```
- **줍기 동작의 본체**. 무엇이 들어가나는 **`ItemIndex`(DataSet 행)** 가 결정 — RUID/스프라이트 아님.
- 픽업 필수 컴포넌트: `SpriteRenderer + TriggerComponent + script.Item(ItemIndex)`.
- 드롭 시 통통 튀는 트윈/`TweenFloatingComponent` 의존 코드는 **제거**(불필요).

### 3.3 `UIInventory.mlua` — 인벤토리 창 컨트롤러 (프리셋 → 수정)
> 원본은 MSW 기본 인벤토리 프리셋이 생성. 네이티브 이벤트 기반이라 우리 백엔드와 그대로 호환. 거기에 기능을 얹음.

**(a) `OnBeginPlay` `@ExecSpace("ClientOnly")`** — UI는 클라 전용:
- 슬롯 프리팹/스크롤뷰 참조 확보.
- **여닫기**: 여는 버튼(`inventoryBtnPath`) 클릭 → 패널 열기, CloseButton → 닫기.
  - ⚠️ **중요 설계**: 토글 대상을 스크립트가 붙은 `Inventory` 엔티티가 아니라 **자식 `InventoryPanel`** 로 함. 스크립트 엔티티를 끄면 `OnBeginPlay`가 안 돌아 배선이 깨지기 때문. (비활성 엔티티 스크립트 함정)
- **정보 팝업 배선**: 팝업(`ItemInfo`)엔 스크립트를 안 붙이고, 여기서 BtnUse/BtnDrop/BtnClose를 `ConnectEvent`로 연결 + 시작 시 숨김.

**(b) `ShowItemInfo(item)` `@ExecSpace("ClientOnly")`** — 슬롯 클릭 시 팝업 채우기:
- 정적값(설명/공격력/방어력) = `item.ItemTableData:GetItem(...)`.
- **개체값(강화/잠재)** = `_ItemService:GetMODItemsByOwner(inv)`에서 GUID 매칭해 `Weapon`의 `UpgradeLevel`/`Potential` 읽음(클라 동작 확인).

**(c) 이벤트 핸들러 4종 `@EventSender("LocalPlayer")`** — 네이티브 인벤토리 변화에 반응:
| 이벤트 | 동작 |
|---|---|
| `InventoryItemInitEvent` | 접속 시 보유 아이템 → 슬롯 생성(영속 복원) |
| `InventoryItemAddedEvent` | 새 아이템 → 슬롯 생성 |
| `InventoryItemModifiedEvent` | 개수 변경 → 슬롯 갱신 |
| `InventoryItemRemovedEvent` | 제거 → 슬롯 Destroy |
- 슬롯은 `SlotItems[item.GUID]`로 매핑 관리. **GUID당 슬롯 1개** → 장비 개체 분리 표시.

### 3.4 `UIItemSlot.mlua` — 슬롯 1칸 (프리셋 → 수정)
```lua
method void SetData(any item)                 -- 아이콘+개수 렌더
    self.Entity:GetChildByName("img_slot").SpriteGUIRendererComponent.ImageRUID = item.IconRUID
    ...item_count...TextComponent.Text = tostring(item.ItemCount)
end
@EventSender("Self")
handler HandleButtonClickEvent(ButtonClickEvent event)   -- 슬롯 클릭
    if self.item == nil then return end
    _EntityService:GetEntityByPath("/ui/InventoryGroup/Inventory").UIInventory:ShowItemInfo(self.item)
end
```
- **수정 포인트**: 원본의 `-- TODO: item logic` 자리에 **슬롯 클릭 → 정보 팝업 호출** 연결.

### 3.5 `UserItemDataSet` (`.csv`) — 아이템 정적 데이터 스키마
| 열 | 의미 |
|---|---|
| `Name` | 아이템 이름(= `CreateItem`의 dataTableName 키, AddItem 조회 키) |
| `IconRUID` | 인벤토리 아이콘 RUID |
| `Description` | 설명 |
| `MaxStackCount` | 최대 스택(>1이면 소비 스택, 1이면 개체) |
| `EffectAmount` | 소비 효과량 |
| `Damage`/`Defense` | 장비 정적 스탯 |
| `Type` | **`Weapon`/`UseItem`** — InventoryLogic이 타입 매핑에 사용 |
- ⚠️ **빈 행 금지**: 빈 행이 있으면 `GetRowCount`에 포함되어 `GetRow`가 빈 행을 반환/인덱스 오류 유발. 행은 깔끔하게 유지.

---

## 4. 전체 데이터 흐름 (시퀀스)

**줍기**
```
플레이어가 월드 아이템과 충돌
 → Item.HandleTriggerEnterEvent (server)
 → _InventoryLogic:AddItem(inv, name, 1) (server)
 → _ItemService:CreateItem / ItemCount++ (네이티브 인벤 변경)
 → InventoryItemAdded/Modified 이벤트 (server→client)
 → UIInventory 핸들러 → 슬롯 생성/갱신
```

**정보 보기 → 버리기/사용**
```
슬롯 클릭 (client) → UIInventory:ShowItemInfo(item) → 팝업 표시
[버리기]/[사용] 클릭 (client)
 → _InventoryLogic:RequestRemoveItem/UseItem(guid)  (@Server → 서버로 라우팅)
 → ItemCount-- 또는 RemoveItem (server)
 → InventoryItemModified/Removed 이벤트 → UI 슬롯 갱신/삭제
```

**영속화**: 네이티브 InventoryComponent가 자동 저장. 재접속 시 `InventoryItemInitEvent`로 복원(개수 + 강화/잠재 포함).

---

## 5. 코드리뷰 체크포인트 / 의도적 결정

1. **서버/클라 경계** — 아이템 변경은 전부 `ServerOnly`/`Server`. UI는 `ClientOnly`. 클라 버튼 → `@Server` 메서드로 라우팅하는 패턴 확인.
2. **이벤트 구동 UI** — `CreateItem`은 같은 프레임 `GetItemList`에 안 잡힘(1프레임 지연). 그래서 UI는 반드시 Added/Modified/Removed/Init **이벤트로** 갱신.
3. **비활성 엔티티 스크립트 함정** — 스크립트 붙은 엔티티의 `Enable`을 끄면 `OnBeginPlay`가 안 돈다. → 표시 토글은 **자식 패널**로(UIInventory). 정보 팝업도 스크립트 없이 컨트롤러(UIInventory)가 제어.
4. **개체 vs 정적 데이터 분리** — 공격력 등은 DataSet 공유, 강화/잠재는 `@Item` 개체 필드. 정보팝업은 native Item(정적)과 MOD Item(개체)을 둘 다 조회.
5. **단일 진입점** — 거래/보상도 `_InventoryLogic:AddItem` 한 줄이면 합류(확장 지점).
6. **ItemIndex 유효성** — 월드 아이템은 `ItemIndex`(1-based 행)가 정체를 결정. 0/범위초과는 경고 처리(크래시 방지).
7. **남은 린트 경고(무해)** — `UIInventory`에서 `UpgradeLevel`/`Potential`을 native Item 타입으로 보는 1114 Info 경고. 런타임은 MOD 객체라 정상 동작(검증 완료). 에러 아님.
8. **영속화 캐비엇** — 자동저장은 주기적/디바운스. 변경 "직후 즉시" 강제종료 시 직전 변경 유실 가능(정상 플레이엔 무영향). 엄격히 하려면 `UserLeaveEvent` 명시 저장 보강 가능.

---

## 6. 파일별 한 줄 요약 (리뷰 순서 추천)

| 순서 | 파일 | 종류 | 한 줄 |
|:-:|---|---|---|
| 1 | `InventoryLogic.mlua` | 신규 @Logic | 서버 권위 핵심: 획득/버리기/사용 단일 창구 |
| 2 | `Weapon.mlua` / `UseItem.mlua` | @Item | 아이템 종류 정의(장비=개체+강화/잠재, 소비=스택) |
| 3 | `Item.mlua` | 수정 @Component | 월드 드롭 픽업 → AddItem |
| 4 | `UIInventory.mlua` | 수정(프리셋) @Component | 창 여닫기 + 이벤트→슬롯 + 정보팝업 |
| 5 | `UIItemSlot.mlua` | 수정(프리셋) @Component | 슬롯 렌더 + 클릭→정보팝업 |
| 6 | `UserItemDataSet.csv` | 데이터 | 아이템 정적 스키마(Type 열 추가) |

> 삭제된 코드(컨텍스트용): `LiteInventory`(타입-인덱스 수동 인벤 — 네이티브로 대체), `ItemPickUpComponent`(구 픽업 — Item으로 대체), `OnClickSlot`/`Inventory_component`(프리셋이 대체).
