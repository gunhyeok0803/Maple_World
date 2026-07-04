# 인벤토리 & 재화 시스템 — 설계 · 유지보수 가이드

> 방치형(메이플키우기 스타일) 게임. **인벤토리 = 커스텀 슬롯(직접 구현)**, **재화(메소) = MSW 공식 `resource-package`**, **UI = 단일 창(좌 장비 페이퍼돌 + 우 가방 6탭 + 상세 팝업)**. 타겟 = 모바일 가로(1920×1080).
> 최종 갱신: 2026-07-04 (스택 누적 + 장착 −1/해제 +1 + 자석 픽업 + 개수 라벨 반영).

---

## 0. 폴더 구조 (RootDesk/MyDesk/)

기능별 폴더로 정리됨. **스크립트 타입명은 `script.<파일명>`이라 폴더 위치와 무관** — 폴더는 순전히 가독성/팀 통합용.

```
RootDesk/MyDesk/
├─ Inventory/     인벤토리 시스템 (커스텀)
│   ├─ Inventory.mlua            데이터 권위(슬롯/장착/해금/출석일 저장)
│   ├─ InventoryUI.mlua          단일 창 컨트롤러(UI 전체 제어)
│   ├─ UIItemSlot.mlua           가방 슬롯 1칸
│   ├─ InventoryChangedEvent.mlua 인벤 변경 신호(@Event)
│   ├─ Item.mlua                 필드 아이템 픽업
│   ├─ UserItemDataSet.csv + .userdataset   아이템 데이터셋
├─ Combat/  → (현재 CombatStats는 Inventory/에 위치)
│   └─ CombatStats.mlua          전투력/능력치 계산(Inventory와 분리)
├─ Attendance/
│   └─ AttendanceUI.mlua         출석판 UI 컨트롤러
├─ Resource/     재화 시스템 (MSW resource-package)
│   ├─ PlayerResource.mlua       플레이어 재화 보유/획득/소비
│   ├─ PlayerDBManager.mlua      재화 DB 로드/저장 오케스트레이터
│   ├─ ResourcePickup.mlua       필드 재화 픽업(우리 추가)
│   ├─ ResourceBase/RechargeableResource/ResourceData/ResourceConfig/
│   │  ResourceDataSetLogic/ResourceFactoryLogic/ResourceAdminLogic + 이벤트들
│   └─ ResourceDataSet.csv + .userdataset   재화 데이터셋(메소=Type 1)
└─ Util/         resource-package 유틸(Base64/DateTime/Cycle 등)
```

> ⚠️ **CombatStats.mlua**는 현재 `Inventory/` 폴더에 있음(장비 스탯 의존이라 인벤토리와 응집). 위 트리의 `Combat/`는 개념 표기일 뿐.
> UI 파일: `ui/InventoryGroup.ui`(그룹명 **InventoryGroup**, 구 "ItemWindows"에서 개명), `ui/AttendanceBoard.ui`, `ui/DefaultGroup.ui`(HUD 버튼).

---

## 1. 시스템 4개 — 한눈에

| 시스템 | 방식 | 핵심 파일 | 저장 |
|---|---|---|---|
| **인벤토리(아이템)** | 커스텀 슬롯 | `Inventory.mlua` | DataStorage `inventoryV2` = `slots#equipped#unlocked#attendDate` |
| **전투력/능력치** | 커스텀(파생 계산) | `CombatStats.mlua` | 저장 없음(장착에서 파생) |
| **출석 보상** | 커스텀 | `Inventory.mlua`(데이터) + `AttendanceUI.mlua`(UI) | 위 저장의 `attendDate` 세그먼트 |
| **재화(메소/다이아)** | **MSW resource-package** | `PlayerResource`/`PlayerDBManager` | 자체 DataStorage(패키지 관리) |

---

## 2. 인벤토리(아이템) — 커스텀 슬롯

- **데이터 권위 = `Inventory.mlua`**(DefaultPlayer 부착). 서버 `_T.slots`(배열, 각 원소 `{name, count}`) + `_T.equipped`(부위→아이템명) + `_T.unlocked`. **최대 `MaxSlots=300`칸**(고유 아이템 기준).
- `@Sync` 문자열 `SlotsCsv`(="name:count,name:count")/`EquippedCsv`/`UnlockedCsv`/`LastAttendDate` → 클라 동기화.
- **★ 스택 누적**: `AddItem`은 **같은 이름이면 무조건 한 칸에 누적(장비/무기 포함)** — 없을 때만 새 칸. `MaxStackCount` 열은 현재 미사용(강화 시스템 후 "이름+강화레벨"을 스택 키로 분리 예정). 로드 시 `MergeStacks()`가 같은 이름 중복 슬롯을 하나로 병합(개수 합산, 첫 등장 순서) → 이름당 한 칸 + 레거시 세이브 자동 정리.
- **★ 장착 = 가방에서 페이퍼돌로 이동**: `RequestEquip`은 `ConsumeOne`으로 **가방 −1**, 그 부위에 기존 장착품이 있으면 가방으로 반환(+1, 교체). `RequestUnequip`은 `AddItem`으로 **가방 +1** 반환. 즉 장착품 = 가방과 **별도 풀**. → `RemoveItemAt`(분해)은 가방 여분만 1개씩 차감하고 **착용품을 건드리지 않음**.
- API: `AddItem`(이름 누적) / `ConsumeOne`(장착용 1개 차감) / `RemoveItemAt`+`RequestRemoveAt`(분해 1개씩) / `RequestEquip`(−1, 교체 반환) / `RequestUnequip`(+1) / `MergeStacks` / `GetSlots`(→`{name,count}[]`) / `GetEquipped` / `RequestUnlockPart`+`IsUnlocked` / `HasSpaceFor`.
- 저장 = **디바운스**: 변경 시 `Publish()`(@Sync 즉시) + `MarkDirty()` → `Flush()`(15초 타이머)·`OnEndPlay`에서만 실제 `SetAsync`.
- **가방 슬롯 개수 표시**: `UIItemSlot.SetData(name, index, count)` → `count>1`이면 `SlotTemplate/Count` 라벨에 `x개수` 표시(검은 외곽선+흰 글씨: TextComponent `UseOutLine=true`/`OutlineColor`검정/`OutlineWidth=3`).

**데이터 흐름:**
```
AddItem/Equip/... (서버 권위) → Publish(@Sync) → MarkDirty → Flush/OnEndPlay 저장
                                    ↓
        Inventory.OnSyncProperty(클라) → SendEvent(InventoryChangedEvent)
                                    ↓
InventoryUI.HandleInventoryChangedEvent → Rebuild(그리드)+RefreshWorn(착용칸)+RefreshPower(전투력)+RefreshMeso
```

**UI(`InventoryUI.mlua`, `ui/InventoryGroup.ui`):** 단일 창. 경로 조회 기반(`base = self.Entity.Path`).
- 좌 `EquipPanel`: 27 착용칸(`EquipSlot_0..26`, 부위 = `SlotDefs()`) + 중앙 `Char/Avatar`(플레이어 아바타 미러링) + **`PowerBar`(전투력)** + 시각탭.
- 우 `BagPanel`: 6탭(`Tab_0..5` = `TabCategories()`) + `Grid`(ScrollLayout) + `MesoBar`(메소 표시) + `SlotTemplate`.
- `DetailPopup`(아이템 상세, 장착/분해), **`StatPopup`(전투력 상세, 🔍로 토글)**.

---

## 3. 전투력 — `CombatStats.mlua` (Inventory와 분리)

- **왜 분리?** Inventory는 "저장·아이템"만 책임. 전투력은 파생 계산이라 별도 컴포넌트로 빼서 God-컴포넌트化 방지.
- **공식: `전투력 = 공격력×PowerAtkWeight(100) + 방어력×PowerDefWeight(20) + 최대HP×PowerHpWeight(2)`** — 가중치 3개 모두 `property`(Maker 인스펙터 조절).
- `GetStatSummary()` → `{atk, def, hp, power}`, `GetPower()`. `EquippedCsv`의 각 아이템 데이터셋 스탯 합산(pull 방식, 저장 없음).
- UI: `InventoryUI.RefreshPower()`가 PowerBar + StatPopup 갱신. 장착 변경 시 실시간.

---

## 4. 출석 보상

- 데이터는 `Inventory.mlua`에: `RequestClaimAttendance()`(서버, `senderUserId` 검증) → 당일 미수령이면 `AddItem(AttendReward)`×`AttendRewardCount` + `LastAttendDate=오늘(KST)`. 중복 차단.
- `TodayKST()` = UtcNow+9h → 서버/클라 동일 판정. 리셋 = KST 자정.
- UI: `AttendanceUI.mlua` + `ui/AttendanceBoard.ui`. **여는 버튼 = `DefaultGroup/Btn_Attendance`(달력 아이콘)** → `AttendanceUI.OpenButtonPath`로 연결.

---

## 5. 재화(메소) — MSW `resource-package`

> 출처: https://github.com/MSW-Git/MSWPackages/tree/main/resource-package (Core+Util 수동복사 + Sample의 `PlayerDBManager`).

**구조:** 재화는 "지갑" 인프라. `ResourceDataSet.csv`에 재화 정의(Type/Name/RUID/IsRechargeable/MaxValue/DefaultValue…). 메소=**Type 1**(IsRechargeable=0 통화).

**핵심 API (`PlayerResource`, 플레이어 부착):**
| 함수 | 설명 |
|---|---|
| `GetResource(type)` → `.Value` | 현재 보유량 조회 (메소 = `GetResource(1).Value`) |
| `AddResource(type, n)` (ServerOnly) / `RequestAddResource`(Server RPC) | **번다** |
| `ConsumeResource(type, n)` / `RequestConsumeResource` | **쓴다**(부족하면 실패) |
| 이벤트 `ResourceValueChangedEvent`(값 변경)·`ClientResourceInitializedEvent`(초기 동기화) | UI가 구독 |

**⚠️ 중요 — 이건 "언제 벌고 쓰는지"는 모름:**
- `AddResource`/`ConsumeResource`는 **원시 기능(building block)**. 게임 규칙(호출부)은 우리가 붙임:
```
메소 픽업 닿음   → AddResource(1, Amount)      (ResourcePickup.mlua ✅ 구현)
보상 수령 버튼   → AddResource(1, 보상액)        (미구현 — 보상 UI에서 호출)
상점 구매        → ConsumeResource(1, 가격)      (미구현 — 상점 UI에서 호출)
몬스터 처치      → AddResource(1, 드롭액)         (미구현)
```

**메소 표시:** `InventoryUI.RefreshMeso()`가 `PlayerResource:GetResource(1).Value` → `BagPanel/MesoBar/Value`(천단위). `ResourceValueChangedEvent` 구독으로 실시간 갱신. 검증: `AddResource(1,5000)` → MesoBar "5,000".

**메소 픽업(`ResourcePickup.mlua`):** 필드 오브젝트. `property ResourceType(1=메소), Amount(지급량)`. TriggerEnter(서버) → `PlayerResource:AddResource(ResourceType, Amount)` → Destroy. **픽업 금액 = 오브젝트의 `Amount` property**(10/100/1000 코인 = Amount 다른 오브젝트). Item.mlua 픽업 패턴과 동일. 배치는 Maker에서 직접(SpriteRenderer+TriggerComponent+ResourcePickup, 또는 기존 필드아이템 복제 후 스크립트 교체).

**★ 자석 자동 픽업(`Item.mlua`·`ResourcePickup.mlua` 공통):** 방치형답게 바닥 아이템/재화가 가까운 플레이어에게 **가속하며 빨려옴**. `OnUpdate`에서 **2D(x,y) 거리**로 판정(엔티티 z가 SortingLayer로 크게 달라서 `Vector3.Distance`(3D)는 항상 멀게 나옴 → 반드시 2D). 이동은 x,y만(아이템 z 보존, Body 없는 엔티티라 `TransformComponent.WorldPosition` 직접 쓰기 가능). property: `MagnetRadius`(끌림 시작 반경)/`CollectRadius`(획득 반경)/`MagnetAccel`(가속)/`MagnetMaxSpeed`(최대속도). **끌림 속도 조절 = 이 property들**(빠르면 `MagnetMaxSpeed`↓).

---

## 6. 아바타 미러링 (좌측 창 중앙 캐릭터)

- `InventoryGroup/Controller/EquipPanel/Char/Avatar` = `AvatarGUIRendererComponent` + `CostumeManagerComponent`.
- `InventoryUI.SetupAvatar()`: `CostumeManagerComponent.DefaultEquipUserId = LocalPlayer.UserId` → **내 캐릭터 실제 아바타 복제 표시**. Char 스프라이트(흰 박스)는 배경 프레임(인스펙터에서 이미지/투명도 조절).

---

## 7. 커스텀 vs 패키지 — 설계 결정 (자주 나온 질문)

- **아이템 인벤토리 = 커스텀이 맞음.** MSWPackages에 `inventory-package`(완성형 UI 1개: 가방그리드+장착장비+아바타)가 있지만, 우리 레퍼런스 디자인(단일 창·전투력 바·스탯 팝업·좌우 배치)과 달라서 커스텀 제작. 이미 검증·동작.
- **재화 = 패키지 채택.** 통화는 단순 + 영속/동기화/치팅방지를 패키지가 검증된 방식으로 처리 + 다이아/스태미나 확장 용이 → 직접 짜기보다 이득.
- **보관 아이템에 컴포넌트 안 붙임(정상):** 컴포넌트는 월드 엔티티(필드 픽업 `Item`/`ResourcePickup`)에만. 가방 안 아이템은 데이터(CSV 행 참조)가 표준.
- **원칙: 새 기능은 Inventory에 몰지 말고 자기 컴포넌트로 분리**(전투력·재화 이미 분리).

---

## 8. ★ 필수 Maker 수동작업 (Global/월드는 스크립트로 못 건드림)

| 대상 | 작업 |
|---|---|
| **DefaultPlayer** | `Inventory`, `CombatStats`, `PlayerResource`, `PlayerDBManager` **4개 Add Component** |
| **WorldConfig** | `PlayerEntityAuthorityCheck = true` (resource-package 보안 요구) |
| **데이터셋** | 아이템 추가 시 `UserItemDataSet` 행(Category/Part/스탯), 재화 추가 시 `ResourceDataSet` 행 |
| **메소 픽업** | 필드에 SpriteRenderer+TriggerComponent+`script.ResourcePickup` 오브젝트 배치(Amount 설정) |

---

## 9. 수정 지점 맵 ("뭘 바꾸려면 어디로")

| 하고 싶은 것 | 수정 위치 |
|---|---|
| 아이템 추가 | `Inventory/UserItemDataSet.csv` 행 추가 |
| 재화 추가(다이아 등) | `Resource/ResourceDataSet.csv` 행 추가(Type/Name/…) |
| 인벤 용량 / 저장주기 | `Inventory.mlua` `MaxSlots` / `FlushInterval` |
| 전투력 공식 | `CombatStats.mlua` 가중치 property(또는 Maker 인스펙터) |
| 출석 보상 아이템/개수 | `Inventory.mlua` `AttendReward`/`AttendRewardCount`(인스펙터) |
| 메소 획득량 | 픽업 오브젝트의 `Amount`(인스펙터) |
| 자석 끌림 속도/반경 | `Item.mlua`·`ResourcePickup.mlua`의 `MagnetMaxSpeed`/`MagnetAccel`/`MagnetRadius`(인스펙터) |
| 스택/장착 규칙 | `Inventory.mlua` `AddItem`(누적)·`ConsumeOne`·`RequestEquip`/`RequestUnequip`(−1/+1) |
| 개수 라벨 스타일 | `ui/InventoryGroup.ui` `BagPanel/SlotTemplate/Count`의 TextComponent(인스펙터: `UseOutLine`/색/두께/폰트) |
| 메소 보상/구매 연결 | 보상·상점 로직에서 `AddResource`/`ConsumeResource` 호출 |
| UI 위치/색/투명도/크기 | **Maker 인스펙터**(시각 값은 사용자 관리). 에이전트는 `UIBuilder.load→patchComponent→write` 부분 패치만, **전체 리빌드 금지** |
| 장비 슬롯 부위 | `InventoryUI.SlotDefs()`(순서 = `EquipSlot_0..26`) |
| 탭 목록 | `InventoryUI.TabCategories()` + `.ui` `Tab_0..5` + 데이터셋 Category |

---

## 10. 알려진 이슈 / 함정

- **[함정] resource-package 수동복사**: raw `.csv`만으론 데이터셋 등록 안 됨(LEA-2007) → 같은 이름 `.userdataset` 짝 필요. 저장 오케스트레이터 `PlayerDBManager`는 Core가 아니라 **Sample**에 있음(누락 주의).
- **[함정] 패키지 import LEA-1118**: 파일별 stale 캐시 → 각 파일 재편집+refresh로 해소(빌드 에러 0 될 때까지).
- **[정보] 남은 LIA 1113/1114**: 크로스 스크립트 참조 false-positive(무해).
- **[유지보수 원칙]** 위치/투명도/색 등 시각 값은 컴포넌트 속성 → 사용자가 인스펙터 조절. 에이전트는 구조/로직만, `.ui`는 부분 패치.
- **[미구현]** 메소 보상/구매 경로, 잠금 슬롯 해금 조건, 포인트/프리셋.
- **[예정]** 강화/업그레이드 장비의 **개별 스택 분리** — 강화 시스템 제작 후 `AddItem`/`MergeStacks`의 스택 키를 "이름"에서 "이름+강화레벨"로 변경(현재는 이름 기준 누적).
