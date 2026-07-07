# 강화 시스템 — 구현 & 수정 가이드

> 오늘 구현한 **승급 · 스타포스 · 컬렉션** 3대 시스템의 동작·파일·**수정(튜닝) 방법**. MVP v11 스펙(§04/§05/§06) 기준.
> 작성: 2026-07-08. UI(강화창)는 아직 없음 — 로직만 완성(승급만 인벤 상세팝업에 버튼 있음).

---

## 0. 세 시스템 한눈에

| 시스템 | 한 줄 | 입력 → 결과 | 재화 |
|---|---|---|---|
| **승급(Promote)** | 같은 장비 여러 개 → 상위 등급 1개 | 레어800→에픽 / 에픽200→유니크 / 유니크20→레전드리 | 없음(아이템만) |
| **컬렉션(Collection)** | 같은 장비 대량 등록 → 영구 전투력 + 소멸 | 레어800/에픽200/유니크20/레전드리1 등록 단위 | 없음(아이템 소멸) |
| **스타포스(Starforce)** | 레전드리에 별(★) | ★+1 / 유지 / 파괴 | **메소** |

**등급 체계:** 레어(1) → 에픽(2) → 유니크(3) → 레전드리(4)

---

## 1. 데이터 모델 (Inventory)

- 가방 슬롯 1칸 = `{name, count, star, grade}`
  - `name` 아이템명 · `count` 개수 · `star` 스타포스 성급(0=미강화) · `grade` 등급(1~4)
- **StackKey = 이름 + 성급 + 등급** → 셋 다 같아야 한 칸에 누적 (예: `나뭇가지 레어 ★0` ≠ `나뭇가지 에픽 ★0` ≠ `나뭇가지 레전드리 ★3`)
- 저장(DataStorage `inventoryV2`): `slots#equipped#unlocked#attendDate#traces` (5세그)
  - slots = `name:count:star:grade,...` · equipped = `part:name:star:grade,...` · traces = `name:star:grade,...`(파괴 흔적)
- **파괴 흔적** = `_T.traces` 별도 저장(일반 아이템과 분리). 스타포스 파괴 시 생성, 복구 시 소멸.

---

## 2. 시스템별 동작 & 파일

### 2-1. 승급 — `Enhance/PromoteManager.mlua`
- **동작:** ★0 순정 (동일 이름·등급) `RegUnit`개 소모 → 상위 등급 1개 생성. 일괄(가능한 만큼).
- **핵심 메서드:** `RequestPromote(name, grade, times)`(서버) → `DoPromote` / `MaxPromotable(name, grade)`
- **UI:** 인벤 상세팝업 `BtnPromote`("일괄 승급") — 장비·★0·상위등급일 때만 노출 (`InventoryUI.RefreshPromote`/`OnPromoteClicked`)

### 2-2. 스타포스 — `Enhance/EnhanceManager.mlua`
- **동작:** **레전드리(grade4)만.** 메소 소모 → `RandomDouble()`로 **성공(★+1) / 실패(유지) / 파괴(흔적 생성)** 3분기. 하락 없음. 최대 20성.
- **파괴/복구:** 파괴 시 아이템 소멸 + 파괴 흔적 생성(`inv:AddTrace`). 복구 = 동일 레전드리 순정 1개 소모 → 원래 성급으로 복원(`DoRestore`/`RequestRestore`).
- **핵심 메서드:** `RequestEnhance(slotIndex)` → `DoEnhance` / `RequestRestore(traceIndex)` → `DoRestore` / `GetEnhanceBonus(name, star)`(전투력용)
- **UI:** 아직 없음(리스킨 때 스타포스 탭/버튼 + 흔적 복구 UI 추가 예정)

### 2-3. 컬렉션 — `Enhance/CollectionManager.mlua`
- **동작:** ★0 순정 `RegUnit`개 소모(소멸) → 등급별 영구 보너스 누적(`@Sync CollAtk/CollDef/CollHp`). 자체 DataStorage(`collectionV1`) 저장. 일괄.
- **핵심 메서드:** `RequestRegister(name, grade, times)` → `DoRegister` / `MaxRegister(name, grade)` / `GetBonus()`(전투력용)
- **UI:** 아직 없음(리스킨 때 등록 버튼 추가 예정)

### 2-4. 전투력 연동 — `Inventory/CombatStats.mlua`
- 전투력 = (**장착템 base 스탯** + **스타포스 성급 보너스** + **컬렉션 영구 보너스**) 를 가중치로 합산
- 공식: `atk×PowerAtkWeight(100) + def×PowerDefWeight(20) + hp×PowerHpWeight(2)`

### 2-5. 부착된 플레이어 컴포넌트 (DefaultPlayer, Maker에서 수동 부착)
`Inventory` · `CombatStats` · `PlayerResource` · `EnhanceManager` · `PromoteManager` · `CollectionManager`

---

## 3. ★ 수정(튜닝) 방법 — "뭘 바꾸려면 어디"

| 바꾸고 싶은 것 | 수정 위치 |
|---|---|
| **승급 비율**(레어→에픽 몇 개 등) | `PromoteManager` 인스펙터 property `RareToEpic`/`EpicToUnique`/`UniqueToLegendary` |
| **스타포스 성공률/파괴율/메소비용/성급당 스탯** | `Enhance/EnhanceDataSet.csv` (Star 1~20 행: SuccessRate·DestroyRate·Cost·AtkGain/DefGain/HpGain) |
| **스타포스 최대 성급** | `EnhanceManager` 인스펙터 `MaxStar`(현재 20) |
| **스타포스 비용 재화**(메소→다른 것) | `EnhanceDataSet.csv`의 `Cost` = `res:1:메소` → `res:<type>:<수량>`(예 메소=1) |
| **컬렉션 등록 단위/보너스** | `Enhance/CollectionDataSet.csv` (Grade별 RegUnit·Atk·Def·Hp) |
| **전투력 가중치** | `CombatStats` 인스펙터 `PowerAtkWeight`/`PowerDefWeight`/`PowerHpWeight` |
| **아이템 기본 스탯**(공/방/HP) | `Inventory/UserItemDataSet.csv` (Attack/Defense/MaxHP 열) |
| **드랍 아이템 등급** | 현재 전부 레어(1) 고정 — `Item.mlua`의 `AddItem(name, 0, 1)` 마지막 인자 |

> **비용 스펙 형식**: `Cost = "res:1:5000"` (kind:key:amount, `res`=재화Type / `item`=가방 아이템명, `;`로 여러 개). 데이터만 고치면 코드 변경 없이 재화 조합 변경 가능.

---

## 4. 알려진 참고사항

- **★ 레전드리 도달이 매우 큼**: 승급으로만 레전드리 = 레어 320만 개(레어800→에픽, ×200, ×20). 스타포스는 레전드리 전용이라 실플레이에선 레전드리 확보가 관문. 테스트는 스크립트로 레전드리 지급.
- **LIA-1115 Info**(EnhanceManager가 Inventory의 AddTrace 등 못 찾음) = 크로스스크립트 false-positive, **런타임 정상**(빌드 errors=0).
- **커밋 함정**: git 명령/메시지에 `.ui`/`.model` 확장자 토큰 있으면 셸 가드가 막음 → 파일명 확장자 빼거나 `git add -A` 사용.
- **컴포넌트 부착은 수동**: DefaultPlayer가 Global(읽기전용)이라 새 매니저는 Maker에서 Add Component 필요.

---

## 5. 미구현 (다음 후보)
- **UI**: 강화창(승급/스타포스/컬렉션 탭 + 파괴 흔적 복구), 인벤 등급 표시, 스타포스·컬렉션 버튼 — **MSW 스프라이트로 리스킨**
- **스크립트 구조 정리**: MVP §13 컨벤션(Systems/Managers/Controllers/UI 폴더, PascalCase)에 맞춰 재정비 검토
- **MVP 나머지**: 장비 계승(§07) · 장신구·엘리트(§08) · 보스 필드(§09) · 거래(§10) · 전투 공식 정교화(§11)
