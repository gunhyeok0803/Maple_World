# 장비 강화(EnhanceGroup) 3탭 재구축 — 작업 이어가기

> 작성 2026-07-12. **새 세션은 이 문서 + 아래 필수 자료를 먼저 읽고 이어서 작업.**
> 범위 = **장비 강화 3탭만**(스타포스/잠재능력/환생의 불꽃). 승급·컬렉션은 **동결**(구조 변경·구현 금지).

---

## 0. 새 세션 시작 절차 (필수)

1. Foundation 스킬 로드: `Skill: msw-general`, `Skill: msw-ui-system` + Foundation 레퍼런스 4종(AGENTS.md 규정). `.mlua` 편집 전 `msw-scripting` + `references/verify-checklist.md`, `.ui` 편집 전 `msw-general/references/builder-protocol.md` §3.
2. 필수 자료 정독:
   - **`ITEMGRADE_POTENTIAL_REDESIGN.md`** (2축 체계 원문)
   - **`.claude/skills/msw-painter/scripts/mockup_enhance3tabs_v4.png`** = **확정 UX 스펙(잠금). 이 목업과 다른 디자인으로 구현하면 실패로 간주(사용자 강한 지침).**
   - `MVP_v11.html` §06(강화·잠재·환불) — HTML이 최우선 기준
3. 메모리 `msw-equip-growth-review-verdict` 확인.

---

## 1. 확정 3탭 설계 (사용자 최종 승인)

| 탭 | 개념 | 변경 데이터 | 데이터 풀 | 비용(재화) | CTA |
|---|---|---|---|---|---|
| **스타포스** | ★ 상승(강화). 성공/실패(유지)/파괴. **하락 없음**. 파괴 흔적→복구(동일 레전더리 순정 1개) | `star` | `StarforceData` | **메소** (`res:1`, 데이터 그대로) | 스타포스 강화 |
| **잠재능력** | **큐브 가챠**(강화 아님): 옵션 3줄 랜덤 재설정 + **확률적 등급 상승**(레어→에픽→유니크→레전더리). 하락 없음 | `pg`(등급)+`pot`(옵션) | `PotentialOptionData[PartClass,PotGrade]` | **큐브** (`res:7`) | 큐브 사용 |
| **환생의 불꽃** | 추가옵션 스탯 **변환**(종류+수치, 등급 무관). 사용=변환 실행 | `flame` | `FlameOptionData[PartClass]` | **불꽃** (`res:8`) | 확률 정보 제공 · 선호 옵션 저장 · **환생의 불꽃 사용** |

- 공통: 좌=착용 4슬롯 + 인벤 **2열 그리드**(스크롤). 중앙=**아이템 헤더 인라인 + [정보] 버튼**(메이플식, 별도 디테일 팝업 없음) + 탭별 시각화. 재화=**종류 드롭다운**(다종 확장 대비, 지금은 큐브 1종·불꽃 1종). 중앙 설명 문구 없음.
- 잠재/환생 중앙 = **현재 ↔ 결과 좌우 비교 박스**. 잠재 등급 사다리는 **제거**(등급은 옵션 박스 헤더 배지·아이템 헤더에만 표기).
- 강화 리스트 필터 = **전체 장비**(잠재/환생은 전 장비, 스타포스만 서버에서 pg 레전더리 차단).
- **미도입 확정**(HTML 우선): 스타캐치·대실패방지·동적가격·큐브 3종·에디셔널 잠재·하락.

**근거**: 잠재=큐브 가챠(원작·메이플N·PotentialOptionData 등급별 풀 일치). 환생 "사용"=변환 자체(원작 강력한/영원한/검은 환생의불꽃; 검은=신/구 선택→현재/결과 비교 UX). 스타포스=메소(HTML §06 AttemptCost·StarforceData 전부 `res:1`, 주문서 없음).

---

## 2. 완료된 작업 (✅ Maker refresh + 빌드 0에러 검증됨)

### 큐브/불꽃 재화 신설
- ⚠⚠ **재화(Resource) 시스템은 사용자가 폴더별로 정리해 둔 워크스페이스 파일이다**: `Components/PlayerResource.mlua`, `Defines/ResourceData.mlua`, `Managers/ResourceDataSetLogic.mlua`, `Events/*ResourceEvent*`, **`Data/ResourceDataSet.csv`(+.userdataset)**. 옛 `RootDesk/MyDesk/Resource/` 경로는 비어있음(사용자가 이동/정리함, git상 D). **절대 `git checkout`/복원으로 옛 `Resource/`를 되살리지 말 것 — 되살리면 이름 중복 스크립트 에러(“이름이 중복되는 스크립트가 있습니다”) 발생.** (이번 세션에서 한 번 저질렀다가 되돌림.)
- 재화 지갑 컴포넌트 = `script.PlayerResource`(`GetResource(type).Value` / `ConsumeResource(type,amt)`), 비용 명세 `"res:<type>:<amt>"`.
- **`RootDesk/MyDesk/Data/ResourceDataSet.csv`**에 행 2개 추가(‑ ItemData와 별개 테이블):
  - `7,Cube,07b0f309e17d4b4ca5564b0c038d889d,0,0,0,0,0,1,0` (명장의 큐브 아이콘)
  - `8,Flame,139069e8b5ff40d48cb75edf9de27e3e,0,0,0,0,0,1,0` (강력한 환생의 불꽃 아이콘)
  - 기존 타입: 1 Meso / 2 Dia / 3 Heart / 4 Stamina / 5 Ticket / 6 SpellTrace.
  - `DefaultValue=0`이라 플레이어 초기 보유 0 → **검증 시 debug로 지급 필요**(획득 드롭/상점은 경제 담당 영역). 재화 지갑 = `script.PlayerResource`(`GetResource(type)`/`ConsumeResource(type,amt)`), 비용 명세 `"res:<type>:<amt>"`.

### `RootDesk/MyDesk/Systems/PotentialSystem.mlua` — 큐브 가챠로 전면 재작성
- 지웠던 옵션 롤 **복원**: `RollOptions(partClass, potGrade)` = `PoolRows`에서 `LinesPerRoll(=3)`줄 비복원 가중치 추첨 → `"스탯=값|..."`.
- `CubeSlot(slotIndex)`/`CubeEquipped(part)`: 비용(`CubeCost="res:7:1"`) 소모 → `NextPotGrade`(확률 등급업) → 결과 등급 풀에서 `RollOptions` → 가방은 `ConsumeItemPg`+`AddItemPg`(pot·pg 동시 교체), 착용은 `SetEquippedInvest`(pot)+`SetEquippedPg`(pg).
- 공개 진입: `RequestConvert(mode,key,times,keepBest)`(다회, keepBest 무시·하위호환) / `RequestCube(mode,key)`(1회). `DoCube(mode,key)` 라우팅. `PendingPot/PendingTarget`·`RequestApply/RequestDiscard`는 UI 재작성까지 하위호환 잔존.
- 확률 placeholder: `GradeUp1to2=0.10 / 2to3=0.05 / 3to4=0.02`. 비용/확률/줄수 팀 튜닝 대상.

### `RootDesk/MyDesk/Systems/FlameSystem.mlua`
- `FlameCost` `res:1:20000`(메소) → **`res:8:1`(불꽃)**. 롤 로직(스탯 종류+수치 변환)·나머지 그대로.

### `ui/EnhanceGroup.ui` — 잠재 탭 옛 옵션-롤 위젯 제거 (task 4 부분)
- 제거: `Tab_Potential/Layout/`의 `Btn_OptInfo, Btn_Prefer, Chk_X3, Chk_Keep, Text_X3, Text_Keep` + `EnhanceRoot/Popup_PotInfo`(34엔티티). **180→140 엔티티, 린트 에러 0(경고만).**
- 잠재 탭 잔존: `Layout/{Btn_Convert, Layout_Before, Layout_After, Layout_Cost}`.

---

## 3. 남은 작업 (⏳ 이어서 진행)

> 방식: **탭 단위 수직 슬라이스** — 해당 탭 `.ui` 증설 → `.mlua` 배선 → **Maker play·screenshot로 mockup_enhance3tabs_v4.png와 대조** → 수정. (400 방지 + 목업 fidelity)

### task 4 — `ui/EnhanceGroup.ui` 나머지 (UIBuilder만, raw JSON 금지)
`.ui` 쓰기는 셸 가드에 막히므로 **`.builder-work/*.cjs` 스크립트 작성 후 `node`로 실행**(참고: `.builder-work/enhance_pot_remove.cjs`). `b.write(path,{strict:false})` 사용(strict 실패 시 .ui 롤백 삭제 위험 — 이 파일은 기존 경고 다수).

- **잠재 탭**: `Layout_Before`→"현재 잠재옵션"/`Layout_After`→"가챠 결과"(헤더·등급배지·3줄은 .mlua로 채움). **큐브 종류 드롭다운**(선택명+▼, 보유/필요/최고등급) 신설. **등급 상승 확률** 표기. `Btn_Convert` 라벨 "큐브 사용".
- **환생 탭(`Tab_Flame/Layout`)**: 현재 `Img_ItemHdr/Icon, Layout_PotenInfo(Img_Grade>Text_Grade, Text_Opts), Layout_Cost, Btn_Ok, Text_ItemName`. → **현재/결과 2박스**(PotenInfo 복제로 결과박스 추가), **불꽃 종류 드롭다운**, **[확률 정보 제공][선호 옵션 저장]** 유틸 2버튼, `Btn_Ok`→"환생의 불꽃 사용".
- **스타포스 탭(`Tab_StarForce/Panel`)**: 이미 별게이지/현재→다음/확률3박스/비용/강화·복구 완비. **대실패방지 위젯 숨김**(`Chk_Protect, Text_Protect, Text_NoDown`). 목업 대조만.
- **공통**: 각 탭 **아이템 헤더 인라인 + [정보] 버튼**. 중앙 `Panel_Summary`(공유, 합산스탯)는 잠재/환생 탭에서 **숨김**(스타포스에서만 유지) — 또는 목업대로 헤더로 대체. 인벤 2열 그리드는 이미 `UIEnhancePanel.EnsureListWired`가 GridView(FixedCount=2)로 구성.

### task 5 — `RootDesk/MyDesk/UI/UIEnhancePanel.mlua` 3탭 로직 재작성
- 현재 파일은 옛 옵션-롤/스타/환생 로직 혼재. 재작성 포인트:
  - **잠재 탭(`RefreshPotTab`/`EnsurePotWired`)**: "최상급만" 문구 게이트 제거(백엔드 제한 없음). 현재/결과 옵션 비교(등급 배지=`_PotentialGrade:SlotRUID(pg)`/색=`ColorOf`), 등급 상승 확률(`GradeUp*`), 큐브 드롭다운(보유=`GetWallet:GetResource(7)`, 필요 1), `Btn_Convert`→`ps:RequestCube(mode,key)` 또는 `RequestConvert(...,1,false)`.
  - **환생 탭(`RefreshFlameTab`/`EnsureFlameWired`)**: "최상급만" 게이트 제거(:924 부근). 현재/결과 추가옵션 비교, 불꽃 드롭다운(보유=`GetResource(8)`), 유틸 2버튼(확률 정보 제공=옵션풀 확률 팝업/선호 옵션 저장=추후), `Btn_Ok`→`fs:RequestFlame`/`RequestFlameEquipped`.
  - **공통**: 아이템 헤더 인라인 채움 + [정보] 버튼(디테일). 잠재의 `pot` 표시는 `pg`(별도 필드)로 등급 표기(구 `ParsePotGrade(pot)` 대신 `sel.pg`). `OnUpdate`의 PendingPot 폴링 제거.
  - 바인딩: 새 `.ui` 노드 UUID를 property에 주입(`b.write(path,{bind:{mlua,props}})` 또는 런타임 `GetChildByName` 탐색 — 현 파일은 그룹월드 대비 상대 이름탐색 방식).

### task 6 — 검증 (Maker)
- `stop`→`clear_logs`→`refresh`→`logs(build)`(0 확인)→`play`→강화창 3탭 열어 동작 로그 확인.
- **검증 전 큐브/불꽃 지급 필요**: `maker_execute_script`로 로컬플레이어 `PlayerResource:AddResource(7, N)` / `AddResource(8, N)`(정확 API는 `Environment/NativeScripts` 또는 복원된 `Resource/PlayerResource.mlua` 확인).
- verify-checklist.md 준수: "무에러 ≠ Pass", log() 증거 필요.

---

## 4. 핵심 사실 (구현 시 근거 — 추측 금지)

### 인벤 데이터 모델 (`RootDesk/MyDesk/Controllers/InventoryController.mlua`)
- `pot` 포맷 = `"스탯=값|스탯=값|..."`(순수 옵션, 등급은 별도 `pg` 필드). `ParseOptPairs`(‘=’ 토큰만), `ParsePotGrade`(선두 숫자, 신설계는 미사용).
- 슬롯/장착 버킷 키 = (name,star,grade,**pg**,pot,flame). `GetSlotInfo(idx)`/`GetEquippedInfo(part)` → {name,count?,star,grade,pg,pot,flame}.
- 아이템 API: `AddItemPg / ConsumeItemPg / CountItemPg(name,star,grade,pot,flame,pg)`, 착용 `SetEquippedInvest(part,pot,flame)`/`SetEquippedPg(part,pg)`/`SetEquippedStar`. `MetaCell(name,"Part")` + `_ItemPart:ClassOf(part)` → 풀 클래스(무기/방어구/장신구).

### 데이터 테이블 (수정 주의: **ItemData 금지**, 나머지는 강화 관련이면 편집 가능)
- `PotentialOptionData.csv`: `OptionId,PartClass,PotGrade(1~4),Stat,Value,Weight`(등급별 옵션 풀, Value 고정).
- `FlameOptionData.csv`: `OptionId,PartClass,Stat,MinValue,MaxValue,Weight`(등급 무관, 값 범위).
- `StarforceData.csv`: `Star,SuccessRate,DestroyRate,Cost(res:1:N),AtkGain,DefGain,HpGain`.
- `ResourceDataSet.csv`: 위 §2. `.userdataset`는 메타만(행은 csv 사이드카).

### UIResourceSimpleFantasy 팩 RUID (디자인 참고 — 사용자 지침 "팩 요소만")
- 등급 슬롯 배경(`_ItemGrade:SlotRUID`/`_PotentialGrade:SlotRUID`): 일반 `aa931a755e5949699233b817029a3e36` / 레어 `dcbbede8a7a0478b97e2ffa23b7fc14a` / 에픽 `90c4bb16c95a4ae3916098b6ffb4d0e4` / 유니크 `74d4021ef1794501acb73b78d267574e` / 레전더리 `70565cb756634ae7a168975f7a18fb1d`.
- 다크 패널 = 흰패널 `6e8e561a4582462eaad762cb11d1f835` + Color(0.04,0.05,0.07,0.90). 구분선 `66b6a9dde07b4c3abb90c16c0feeed3f`. X버튼 `07096261a9944312b01dee501fed7599`. 아이템 슬롯 base `3bee7ba0853b4fe698ff6adb5c65480e`. 버튼=팩 Core_Button(진남색 라운드+흰글자). 상세 카탈로그: 메모리 `msw-uipack-simplefantasy-ruids`.

### 관련 파일
- 시스템: `Systems/{StarforceSystem,PotentialSystem,FlameSystem,EquipmentUpgradeSystem,CollectionSystem,CombatPowerSystem}.mlua`
- 컨트롤러: `Controllers/{InventoryController,EquipmentController}.mlua`
- UI: `ui/EnhanceGroup.ui`(루트 `/ui/EnhanceGroup/EnhanceRoot`), `RootDesk/MyDesk/UI/UIEnhancePanel.mlua`, 슬롯 위젯 `UIEquipmentSlotWidget`
- 목업: `.claude/skills/msw-painter/scripts/mockup_enhance3tabs_v4.{html,png}` (+ 잠재 단독 `mockup_potgrade_v2`, 초기 `mockup_potgrade`)

---

## 5. 규칙/주의 (사용자 강한 지침)

- **목업과 다른 디자인 = 실패.** UI는 `mockup_enhance3tabs_v4.png` 기준.
- **모든 UI는 UIBuilder로만**(raw JSON 편집·grep 금지). 팩 스프라이트만 사용, 임의 색/요소 금지.
- **한 번에 몰아서 금지(400 방지)** — 탭 단위로 쪼개 진행, 단계별 확인.
- **ItemData 수정 금지.** 드롭/아이템 생성/필드 아이템/재화 획득 경제 = 다른 팀원 담당(분석만).
- HTML(MVP_v11) 최우선. 레퍼런스는 UX/흐름 참고용. 충돌 시 차이 설명 후 제안.
- 추측 금지 — 코드/데이터/HTML 근거 제시.

---

## 6. 진행 상태 · 블로커 (2026-07-13)

**커밋:** `ded902d`(백엔드+.mlua) · `29c663a`(잠재탭 옛 위젯 제거) · `992e5d1`(라벨·재화 종류명). working tree clean.

- ✅ **백엔드 완료+동작검증(server_main 로그)+커밋**: 재화 큐브(7)/불꽃(8)@`Data/ResourceDataSet.csv`, PotentialSystem 큐브가챠(옵션롤+확률등급업 res:7), FlameSystem 불꽃(res:8), UIEnhancePanel 잠재/환생 로직.
- ✅ **UI 안전 개선(커밋)**: 잠재탭 옛 옵션-롤 위젯 제거(180→140), "인벤 장비" 라벨, 비용 라인 재화 종류명(수상한 큐브 / 강력한 환생의 불꽃).
- ⚠ **블로커 — 목업-정확 레이아웃 재배치 실패(3회)**: `Tab_*/Layout` **하위 중첩** 노드는 UIBuilder `patchComponent(OffsetMin/Max/RectSize)`로 값이 저장돼도 **렌더가 계산 좌표와 불일치**(부모체인/앵커 해석 블라인드로 못 맞춤). 반면 `Panel_Summary`(EnhanceGroup **직속**)는 오프셋대로 정확 렌더. → **중첩 노드 프로그래밍 재배치는 신뢰 불가.**
  - **권장 경로**: (a) **Maker 에디터 캔버스 시각 드래그**(원래 UI 제작 방식, 신뢰), 또는 (b) 중앙 콘텐츠를 **EnhanceGroup 직속 노드로 재구성**(직속은 좌표 정확) + 탭별 표시 토글. **신뢰되는 것**: 기존 노드 **텍스트/라벨 수정**(위치 불변).
- **구조 확정(정정)**: 현재 `EnhanceGroup 직속`(탭/패널이 `/ui/EnhanceGroup/` 직속, `EnhanceRoot`는 빈 컨테이너) = **그룹월드 이관 정본**. §4의 "루트 `/ui/EnhanceGroup/EnhanceRoot`" 표기는 폐기 — 실제 경로는 `/ui/EnhanceGroup/Tab_Potential` 등. **EnhanceRoot 재-nest 금지**(reparent는 UIBuilder 불가=Maker Hierarchy 작업). **옛 `Resource/` 복원 금지**(재화는 Components/Data 등에 정리됨).
- ⏳ **남은 목업 요소**(현 배치 유지 전제): 큐브/불꽃 **종류 드롭다운 위젯**, 인라인 **아이템 헤더+[정보]버튼**(중앙 합산스탯 대체), 환생 **[확률 정보 제공][선호 옵션 저장] 버튼**, 스타포스 **대실패방지 위젯 숨김**. 위치가 필요한 신규 요소는 위 (a)/(b) 방식으로.
- 검증 재화지급: play 후 server_main에서 `pe:GetComponent("script.PlayerResource"):AddResource(7/8, N)`.

### 진행 상태 요약
- ✅ tasks 1–3(백엔드) 완료, 빌드 0에러. ✅ task 4 잠재 탭 위젯 제거.
- ⏳ task 4 나머지(잠재 큐브 드롭다운/라벨, 환생 결과박스·드롭다운·2버튼, 스타포스 방지위젯 숨김, 공통 헤더+정보버튼) → task 5(UIEnhancePanel 재작성) → task 6(검증).
- **다음 착수: 잠재능력 탭 수직 슬라이스부터.**
