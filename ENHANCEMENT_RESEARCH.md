# 강화 시스템 — 리서치 & 레퍼런스 수집

> 목적: 메이플스토리의 강화 3종(일반강화·스타포스·컬렉션) 구조를 파악하고, 이를 **메월드(MSW)**에서 구현하기 위한 근거/설계 방향을 모은 문서. **UI는 나중에 한 번에** 처리(이 문서는 데이터/로직 레퍼런스). 작성: 2026-07-07.
> 우리 프로젝트 맥락: 방치형 모바일 "메이플키우기" 클론. 기존 자산 = 커스텀 인벤(`Inventory.mlua`, 이름 기준 스택) + 전투력(`CombatStats.mlua`, EquippedCsv 파생) + 재화(`resource-package`, 메소=Type1).

---

## 0. 한눈에 결론

| 항목 | 결론 |
|---|---|
| **MSW에 강화 전용 API/패키지?** | **없음.** `mlua_api_retriever "item enhancement upgrade reinforce"` → 0건. **직접 구현**해야 함. |
| **핵심 빌딩블록** | 확률 `_UtilLogic:RandomDouble()`(0~1)/`RandomIntegerRange(min,max)` · 저장 `_DataStorageService`(Inventory 디바운스 패턴 재사용) · 데이터 `UserItemDataSet`(+강화용 열/신규 데이터셋) · 스탯 반영 `CombatStats` 확장 |
| **⚠ 컴플라이언스** | 강화가 **유료 재화(월드코인 파생 포함)**와 얽히면 **"강화형 확률 아이템"**으로 분류 → **확률 % 의무 공개**(위반 시 월드 이용 제한). 인게임 메소만 쓰면 대상 아님(단 안전하게 확률 표기 권장). |
| **컬렉션** | 공식 `collections-package` 존재 → 등록/진행도/보상 골격 재사용 가능. |
| **실제 레퍼런스 게임(메이플키우기)** | 스타포스 3성 도달 시 **잠재옵션(큐브)** 개방, 잠재 6단계(노말·레어·에픽·유니크·레전더리·미스틱). 방치형은 사실상 "재화 관리형". |

---

## 1. 메이플스토리 강화 3종 구조

### 1.1 일반강화 — 주문서 / 스펠 트레이스(Spell Trace)

**구조:** 장비마다 **업그레이드 가능 횟수(업횟, upgrade slots)**가 정해져 있고, 주문서 1장 = 슬롯 1칸 소모. 성공 시 고정 스탯 부여.

- **성공률 등급: 100 / 70 / 30 / 15 %** (낮을수록 성공 시 스탯 상승폭 큼). 스펠 트레이스도 동일 4등급.
- **성공 보정 수단(누적):** 페버타임(금~일, 15→25 / 30→45 / 70→95%), 성향 "손재주"(만렙 +10%), 길드 스킬(+4%), 럭키데이 주문서(+10%, 페버와 중첩).
- **실패 처리(전통):** 슬롯만 소모(스탯 없음) / 일부 주문서는 실패 시 슬롯 보존·아이템 파괴 등 변형. 현대 스펠트레이스는 실패해도 아이템 파괴 없음(슬롯만 소모).
- **보조 아이템:** 황금망치(업횟 복구), 순백의 주문서(강화 초기화), 놀긍(놀라운 긍정의 주문서, 확률·다중스탯).

> **우리 적용 포인트:** 가장 단순. "강화석/주문서 재화 소모 → 확률 성공 → 성공 시 아이템에 +stat, 강화레벨↑". 실패해도 파괴 없음(방치형 친화). 업횟 상한으로 캡.

### 1.2 스타포스(Star Force)

**구조:** 장비에 별(★)을 부여. 별당 스탯/데미지 증가. 상한 15/25★(최근 **30★**로 확대).

- **성공률:** 별 오를수록 성공률↓, 실패율↑, 메소 비용↑(별·아이템 레벨에 비례해 급증).
- **파괴(Destruction):** **15★ 이상**부터 실패 시 일정 확률로 **파괴**(Superior 아이템은 5★+). 파괴 시 "흔적(trace)"만 남음(별 제외 스탯 유지, 착용 불가).
- **안전장치(Safeguard):** **15~17★** 구간에서 비용 **+200%(3배)** 지불하면 파괴 방지(파괴가 뜰 상황이 "실패"로 대체). 성공 확률 자체는 불변.
- **스타캐치(Star Catch):** 별이 하이라이트 구간에 올 때 Stop! 타이밍 미니게임 → 성공률 **+5%**.
- **찬스타임(Chance Time):** 같은 별에서 (하락이) **2연속** 나오면 다음 시도 **성공 확정**(진행 중인 그 아이템에만 적용).
- **실패 시 별 하락:** 특정 구간에서 실패 시 별 1개 감소(과거 규칙). **최근 개편: 15★ 이상 실패해도 별이 더 이상 하락하지 않음.**

> **우리 적용 포인트:** 확률+비용 커브 + (선택)파괴/안전장치/찬스타임 = 방치형 핵심 과금·성장 루프. 파괴 대신 "하락/유지"만 써서 라이트하게도 가능.

### 1.3 컬렉션 / 도감(Collection)

- **몬스터 컬렉션(메이플 본편, 2015~):** 처치/획득한 몬스터를 도감에 **등록** → 누적 보상, **탐험(방치) 보상**(등록 몬스터 기반 아이템/재화 자동 수급), 등급/완성 보너스.
- **방치형 도감 일반형(메이플키우기 등):** 획득한 **장비/아이템을 도감에 영구 등록** → 아이템이 인벤에서 빠져도 등록 기록은 유지되고 **영구 패시브 스탯 보너스** 부여. 세트/등급 완성 시 추가 보너스. → 방치형의 핵심 "영구 성장" 레이어.

> **우리 적용 포인트:** 이전에 미룬 **"강화/획득 장비 개별 스택 분리"**와 직결. 컬렉션 = "이 아이템을 한 번이라도 가졌는가"의 영구 기록 + 스탯 보너스. `CombatStats`에 컬렉션 보너스 합산 항 추가.

### 1.4 실제 레퍼런스 게임 — 메이플키우기(방치형)

- 능력치 포인트(레벨업 5pt, 25pt마다 메이플 등급↑ + 특수능력치), **용사의 힘**(용사의 증표로 성장, 단계별 어빌리티 슬롯 개방), **어빌리티**.
- **장비 강화 3종 = 주문서 강화 + 스타포스 + 잠재옵션(큐브).** 스타포스 **3성 도달 시 잠재옵션 부여 가능**.
- **잠재능력 6단계: 노말 · 레어 · 에픽 · 유니크 · 레전더리 · 미스틱**(높을수록 수치↑). 큐브 실패 시 기존 옵션 전부 변경.
- **★ 메키 일반강화(주문서) 스펙(우리가 맞출 레퍼런스):** 장비 개별이 아니라 **"장비 슬롯"을 강화**. **총 10회** 시도, **5·10번째 시도는 성공률 +10%**. 레벨대별 성공률 — 45제(70/30%), 65제(70/30%), 85제(70/30/15%). 재료 = **주문의 흔적**("성장 던전:강화"에서 수급).
- "방치형이지만 사실상 매일 접속하는 재화 관리형" — 강화는 재화 소모 루프의 핵심.

### 1.5 강화 재료(재화) — 메키 & 본메이플 대조 (사용자 질문 답)

| 강화 | 본메이플 재료 | 메이플키우기 재료 | 유료성 |
|---|---|---|---|
| **일반강화(주문서/스펠트레이스)** | **주문의 흔적**(몬스터 처치·분해 수급) 또는 주문서 아이템, 성공률 100/70/30/15% | **주문의 흔적**("성장 던전:강화" 수급) | 인게임 획득(무료) → 확률 공개 의무 **대상 아님** |
| **스타포스** | **메소**(별·레벨 비례, 별도 재료 없음). 안전장치=추가 메소 | 게임 내 재화(메소류) | 인게임(무료) |
| **잠재(큐브)** | 미라클/에디셔널 큐브(캐시 or 이벤트) | 큐브(획득 한정적) | **유료 가능** → 유료면 확률 공개 의무 |

> **결론(일반강화 기준):** 본메이플·메키 **둘 다 "주문의 흔적"** 소모. 우리도 **"주문의 흔적"류 소모 재료**를 신설(드롭/보상/던전으로 수급)해 맞추는 게 정석. **무료 획득 재료라 확률 공개 의무 대상 아님**(안전). 메소는 스타포스용으로 남겨두는 게 레퍼런스와 일치.

---

## 2. MSW 공식 지원 현황 & 빌딩블록

### 2.1 지원 현황
- **강화 전용 컴포넌트/서비스/이벤트 없음.** (API retriever 0건 확인.) 전부 스크립트로 직접 구현.
- 공식 튜토리얼 중 가장 근접한 참고: **"Creating Maple GYM"**(PlayerStats 컴포넌트로 스탯 성장/저장), **"Item Creation"**(UserItemDataSet/ItemType/OnCreate) — 단 우리는 커스텀 슬롯 인벤이라 엔진 Item 시스템은 안 씀.

### 2.2 빌딩블록(직접 구현용)
| 필요 기능 | MSW 수단 |
|---|---|
| 성공/실패 확률 | `_UtilLogic:RandomDouble() < p`(내장 `PlayerAttack.CalcCritical`과 동일 패턴), 다중결과는 `RandomDouble()` 구간 분기(BT `RandomSelector` 개념) |
| 강화 상태 저장 | `_DataStorageService` — `Inventory.mlua`의 디바운스(dirty+Flush 타이머+OnEndPlay SetAndWait) 패턴 재사용 |
| 강화 데이터(레벨별 확률·비용·스탯) | 신규 데이터셋(`.csv`+`.userdataset`) 또는 `UserItemDataSet` 열 확장 |
| 재화 소모(강화비용) | `resource-package` `PlayerResource:ConsumeResource(type, cost)`(부족 시 실패) |
| 강화 결과 스탯 반영 | `CombatStats` 확장 — 현재 EquippedCsv 파생 합산에 "강화 보너스" 항 추가 |
| 서버 권위/치팅 방지 | 강화 판정은 `@ExecSpace("Server")` + `senderUserId` 검증(현재 `RequestEquip`/`RequestClaimAttendance` 패턴) |

### 2.3 ⚠ 확률 정보 공개 의무(반드시 확인)
- MSW 정책: **"강화형 확률 아이템"**(다른 아이템의 등급/성능을 확률로 바꾸며 결과가 우연으로 결정)은, **유료로(직접/간접, 월드코인 파생 재화 포함) 구매하는 요소**가 있으면 **확률을 % 로 의무 공개**(반올림·소수 자리 규정 포함). 위반 시 최대 월드 이용 제한.
- **판단:** 강화 비용을 **인게임 획득 메소만** 쓰면 통상 대상 아님. **유료 재화(다이아 등 월드코인 파생)**를 강화·강화확률·안전장치 등에 쓰면 **공개 대상** → 강화 UI에 확률 표기 설계 필요.

---

## 3. 우리 프로젝트 매핑(설계 방향, 구현 전 논의용)

### 3.1 ★ 핵심 설계 갈림길 — "부위 슬롯 강화" vs "아이템 개별 강화"
리서치로 드러난 중요 분기. 어느 쪽이냐에 따라 데이터 모델이 완전히 달라짐:

- **(A) 부위 슬롯 강화 — 메키 방식(레퍼런스 일치).** 강화 상태가 **아이템이 아니라 착용 부위(슬롯)**에 붙음. 어떤 무기를 끼든 "무기 슬롯"의 강화 수치가 적용. 가방 스택은 **이름 기준 그대로 유지**(강화품 분리 불필요). 강화 데이터 = `equipped[part]`에 강화레벨/성공횟수 부가(또는 부위별 강화 테이블). **← 메키와 일치, 인벤 구조 변경 최소.**
- **(B) 아이템 개별 강화 — 본메이플 방식.** 강화가 **개별 아이템 인스턴스**에 붙음. 인벤 스택 키를 `이름`→`이름+★성급(+잠재)`으로 분리(강화 안 한 건 이름 누적 유지). 이전에 [[msw-inventory-two-window-system]]에 적어둔 "강화 후 스택 분리" 방향. **← 자유도 높지만 인벤/스택 로직 대공사.**

> **결정(2026-07-07): (B) 아이템 개별 강화 확정.** 이유 = **거래 시스템 도입 예정.** 거래는 강화가 아이템에 붙어 함께 넘어가야 성립 → (A) 슬롯 강화면 강화가 내 칸에 남아 거래 시 안 따라감. (A)는 메키 일치·구현 간단하지만 거래와 상충. **성공률 커브·재료·10회 캡 등 "메커니즘"은 메키식을 차용하되, "강화가 어디 붙나"는 본메(B)식으로.**
>
> **(B) 채택 시 인벤 변경:** 스택 원소 `{name, count}` → `{name, count, star}`. `star=0`(미강화)은 이름 기준 누적 유지, `star>0`은 **(name,star)별로 분리 스택**(같은 이름·같은 성급끼리만 count 누적). `AddItem`/`MergeStacks`/`SerializeSlots`/`GetSlots`/장착·해제·분해 전부 star 반영 필요. 저장 CSV도 `name:count:star`로 확장(구버전 `name:count` 파싱 호환 유지). → **일반강화 착수 = 이 인벤 모델 확장이 1단계.**

### 3.2 3종을 우리 게임에 매핑
| 메이플 시스템 | 우리 구현 방향(초안) |
|---|---|
| **일반강화(주문서)** | 강화석/주문서 재화 소모 → 확률 성공 시 아이템 `+stat`·`upgradeCount++`. 실패 시 파괴 없음(방치 친화), 업횟 상한. 가장 먼저 붙이기 쉬움. |
| **스타포스** | 별 레벨별 (확률·메소비용·스탯) 데이터셋. 실패 = 유지(또는 하락). 파괴/안전장치/찬스타임은 **선택 심화**(라이트 버전부터). 메이플키우기처럼 "N성 도달 시 잠재 개방" 게이트 가능. |
| **컬렉션/도감** | 획득 이력 영구 기록(별도 DataStorage 세그) → `CombatStats`에 컬렉션 패시브 합산. 공식 `collections-package` 골격 참고. 강화품 분리(3.1)와 연결. |

### 3.3 아키텍처 원칙(기존 합의 유지)
- **강화 로직은 Inventory에 몰지 말고 별도 컴포넌트로**(예: `Enhance/EnhanceManager.mlua`) — God-컴포넌트 방지(전투력·재화 분리 원칙과 동일).
- 스탯 반영은 `CombatStats` 확장으로 일원화(강화 보너스 = 파생 합산 항).
- UI는 나중에 일괄(강화창) — 이 문서는 데이터/로직 레퍼런스만.

---

## 4. 열린 결정사항 (구현 착수 전 확정 필요)
1. **3종 중 무엇부터?** (추천: 일반강화 → 스타포스 → 컬렉션 순, 난이도/의존도 순)
2. **강화 비용 재화:** 메소만? 아니면 전용 재화(강화석)/유료 재화? → 유료면 확률 공개 UI 필수.
3. **실패 페널티 수위:** 파괴 있음(하드코어) vs 유지/하락만(방치 친화).
4. **강화 스탯 반영 방식:** 아이템 개별 데이터에 저장 vs 강화레벨→데이터셋 룩업.
5. **컬렉션 보너스 범위:** 개별 등록 보너스 / 세트·등급 완성 보너스 / 계정 vs 캐릭터.

---

## 5. 참고 링크
- Star Force: [MapleStory Wiki](https://maplestorywiki.net/w/Star_Force_Enhancement) · [Guide:Star Force](https://maplestorywiki.net/w/Guide:Star_Force) · [StrategyWiki](https://strategywiki.org/wiki/MapleStory/Spell_Trace_and_Star_Force)
- 주문서/스펠트레이스: [Scroll Enhancement (Wiki)](https://maplestorywiki.net/w/Scroll_Enhancement) · [Item Enhancement (MapleWiki)](https://maplestory.fandom.com/wiki/Item_Enhancement) · [Spell Trace 가이드(whackybeanz)](https://www.whackybeanz.com/guides/spell-trace)
- 컬렉션: 몬스터 컬렉션(나무위키, 등록·탐험 보상) · [collections-package](https://github.com/MSW-Git/MSWPackages/tree/main/collections-package)
- 메이플키우기(레퍼런스 게임): [메이플 키우기/시스템(나무위키)](https://namu.wiki/w/메이플%20키우기/시스템) · [Peak 후기·공략](https://peak.nexon.com/post/467)
- MSW 확률 공개 정책: MSW 문서 "Probability Information Disclosure"(mlua_document_retriever 최상위 결과)

---

## 6. 구조 설계 — 일반강화 1차 (구현 청사진, 코드 전)

> 확정: (B) 아이템 개별 강화 · 유지/하락(파괴 없음) · 재료 "주문의 흔적"(무료) · 메커니즘 메키식(최대 10성, 5·10번째 +10%, 레벨대별 성공률).

### 6.1 컴포넌트 책임 분리
```
Inventory.mlua        (기존, 데이터 권위) — 슬롯/장착/저장. ★ star 인지하도록 확장.
Enhance/EnhanceManager.mlua  (신규, @Component on DefaultPlayer) — 강화 "규칙"만.
                      재료 확인·소모, 확률 판정, 성공/실패 결과를 Inventory 메서드로 반영.
CombatStats.mlua      (기존) — 장착템 스탯 합산에 ★ 강화 보너스 항 추가.
PlayerResource        (기존 resource-package) — 재료(주문의 흔적) 보유/소모.
EnhanceDataSet        (신규 .csv+.userdataset) — 레벨대·성급별 성공률/재료/스탯 테이블.
```
> 원칙: 강화 규칙은 Inventory에 넣지 않고 EnhanceManager로 분리(전투력·재화 분리와 동일). **슬롯 변형(추가/차감)은 Inventory가 소유**, EnhanceManager는 오케스트레이션만.

### 6.2 인벤 데이터 모델 확장 (Inventory.mlua)
- 슬롯 원소: `{name, count}` → **`{name, count, star}`** (star=0 미강화).
- **스택 규칙:** `name` **AND** `star`가 같을 때만 한 칸 누적. `나뭇가지 ★0`과 `나뭇가지 ★5`는 **다른 칸**.
- 저장 `SlotsCsv`: `name:count` → **`name:count:star`**. 파싱 하위호환: 필드 1개=`name`(cnt1,star0), 2개=`name:count`(star0), 3개=`name:count:star`.
- 착용 `EquippedCsv`: `part:name` → **`part:name:star`**(장착품도 성급 보존). 파싱 하위호환 동일.
- **시그니처 변경:**
  | 기존 | 변경 후 |
  |---|---|
  | `AddItem(name)` | `AddItem(name, star=0)` — star 기본 0(필드픽업·출석보상은 0) |
  | `ConsumeOne(name)` | `ConsumeItem(name, star)` — (name,star) 1개 차감 |
  | `RequestEquip(part, name)` | `RequestEquip(part, name, star)` |
  | `MergeStacks` / `SerializeSlots` / `GetSlots` | (name,star) 3필드 반영 |
  | `RemoveItemAt(index)` | 그대로(인덱스 기반, 내부에서 star 무관하게 1개 차감) |

### 6.3 강화 재료 — ★ 확장 가능하게(데이터 주도 범용 비용)
> 사용자 결정(2026-07-07): 흔적만 갈지, 흔적+메소로 갈지, 다른 아이템을 쓸지 **미정** → **비용을 스키마 고정하지 말고 데이터로 자유 구성**.

- **비용 = "비용 스펙 문자열"** 하나로 표현(성급 row마다). 형식 예: `Cost = "res:6:5;res:1:1000"` — `;`로 항목 구분, 각 항목 `kind:key:amount`.
  - `kind`: `res`(resource-package 재화, key=Type번호) | `item`(가방 소비 아이템, key=아이템명)
  - 예: 흔적만 = `res:6:5` / 흔적+메소 = `res:6:5;res:1:1000` / 특수 재료 아이템 = `item:강화의정수:1` (모두 **데이터만 수정**, 코드 불변)
- "주문의 흔적"은 `ResourceDataSet.csv`에 신규 Type 행 신설(IsRechargeable=0, 무료 통화형). Type 번호는 구현 시 현재 CSV의 빈 번호 배정.
- EnhanceManager가 Cost 스펙을 파싱→항목별로 보유 확인·소모(§6.5). 소모처: `res`→`PlayerResource:ConsumeResource`, `item`→`Inventory:ConsumeItem`.

### 6.4 강화 데이터셋 (신규 EnhanceDataSet.csv)
| 열 | 타입 | 설명 |
|---|---|---|
| `Band` | integer | 레벨대(예 45/65/85). 아이템 `ReqLevel`로 결정 |
| `Star` | integer | 목표 성급(1~**10**) |
| `SuccessRate` | number | 성공 확률(0~1). **5·10성 +10%는 이 값에 미리 반영**(데이터 주도) |
| `Cost` | string | 범용 비용 스펙(§6.3). 예 `res:6:5` 또는 `res:6:5;res:1:1000` |
| `AtkGain`/`DefGain`/`HpGain` | integer | 성공 시 증가 스탯(해당 성급 1회분) |
| `FailDown` | boolean | 실패 시 성급 하락 여부. **일반강화는 전 행 false(항상 유지)** — 열은 유지해 스타포스 등 미래 재사용 |

- Band 결정: 아이템 `UserItemDataSet.ReqLevel` → 임계값 매핑(≤45→45, ≤65→65, 그 외 85). 데이터셋에 없는 Band/Star는 강화 불가 처리.
- **최대 성급 = 10**(메키 기준). Star 10에서 RequestEnhance 거부.

### 6.5 강화 로직 (EnhanceManager.mlua, 서버 권위)
```
@ExecSpace("Server") RequestEnhance(integer slotIndex)   -- senderUserId 검증
  1. Inventory에서 slotIndex의 {name, star} 조회 (없으면 return)
  2. star >= 10 → 만렙, return(실패 사유 로그)
  3. Band = ReqLevel→매핑; row = EnhanceDataSet(Band, star+1) (없으면 return)
  4. 비용 확인: ParseCost(row.Cost) → 각 항목 보유량 체크(res=PlayerResource / item=Inventory)
       하나라도 부족하면 return(부족 로그) — 부분 소모 방지 위해 "전부 확인 후 소모"
  5. 비용 소모: 항목별 res→ConsumeResource(type,amt) / item→ConsumeItem(name,amt)
  6. 판정: _UtilLogic:RandomDouble() < row.SuccessRate
       성공 → Inventory:ConsumeItem(name, star) ; Inventory:AddItem(name, star+1)
       실패 → (일반강화 FailDown=false) 변화 없음(비용만 소모)
              ※ row.FailDown=true면 ConsumeItem(name,star)+AddItem(name,max(0,star-1)) — 스타포스 등 미래 재사용
  7. Inventory:Publish()+MarkDirty()  → @Sync → InventoryChangedEvent → UI/전투력 갱신
  (결과 성공/실패는 추후 이벤트로 클라 통지; 지금은 log)
```
> 접근: **star를 슬롯 튜플에 저장**(별도 아이템 인스턴스 ID 안 씀). 일반강화는 성급만 고유값이라 (name,star) 스택으로 충분. 잠재(랜덤옵션) 추가 시엔 진짜 유니크 → 그때 인스턴스 ID 도입 검토.

### 6.6 전투력 반영 (CombatStats.mlua)
- 현재: EquippedCsv의 각 아이템 → 데이터셋 Attack/Defense/MaxHP 합산.
- 확장: EquippedCsv가 `part:name:star`가 되므로, **base 스탯 + (성급 1..star 누적 Gain)** 합산. 누적 Gain은 EnhanceDataSet에서 star까지 합.

### 6.7 거래 시스템(미래) 연동
- 강화가 (name,star)에 실려 있으므로 거래 = (name,star) 1개를 A→B로 이동하면 강화가 자연히 전승. 별도 처리 불필요(설계상 이미 대응).

### 6.8 구현 순서(각 단계 승인 후 진행)
1. **Inventory star 확장**(6.2) — 이미 동작 중인 스택/저장/장착 손봄. 하위호환 파싱 필수. 검증(로드·스택·장착·분해).
2. **주문의 흔적 재화 + EnhanceDataSet**(6.3/6.4) — 데이터만, 등록 검증.
3. **EnhanceManager**(6.5) — 서버 강화 판정. execute_script로 성공/실패/재료소모/성급변동 검증.
4. **CombatStats 강화 보너스**(6.6) — 강화 시 전투력 상승 검증.
5. UI(강화창) 나중에 일괄.

### 6.9 확정/미정 정리 (2026-07-07)
**확정:**
- 최대 성급 = **10** (Star 10에서 강화 거부).
- 실패 = **항상 유지**(FailDown 전 행 false; 하락 메커니즘은 미래용으로 코드/열만 보존).
- 비용 = **데이터 주도 범용 스펙**(§6.3) — 흔적만/흔적+메소/다른 아이템 전부 데이터로 확장, 코드 불변.

**미정(구현 중/후 확정 가능):**
- 스탯 증가량·성급별 성공률 수치 → 내가 초안 테이블 제안 후 사용자 튜닝.
- Band 임계값(45/65/85) → 우리 아이템 실제 레벨대 보고 조정.
- 실제 비용 조합(흔적 수, 메소 병행 여부) → 데이터로 언제든 변경.
