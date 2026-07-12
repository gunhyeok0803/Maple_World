# 아이템 등급 · 잠재 재설계 (2축 체계)

> 작성 2026-07-12. 담당 섹션: 드롭 아이템 습득 → 인벤토리 → 강화 → 승급 → 컬렉션.
> 드롭/아이템 생성/드롭 확률/필드 아이템 생성은 **다른 팀원 담당(수정 금지, 분석만)**.
> HTML 기획서(`MVP_v11.html`)의 단일 Grade(Rare~Legendary)를 **잠재(PotentialGrade)**로 재해석하고, 새 축 **품질(ItemGrade)**을 추가한 결과.

---

## 0. 용어 정의 (팀 공용 — 이 용어로만 지칭)

| 용어 | 의미 | 코드 |
|---|---|---|
| **품질 (ItemGrade)** | 하급 → 중급 → 상급 → 최상급. **승급**으로 상승 | `_ItemGrade` (`Enums/ItemGrade.mlua`), 저장 필드 `grade` |
| **잠재 (PotentialGrade)** | 레어 → 에픽 → 유니크 → 레전더리. **잠재등급강화창**으로 상승 | `_PotentialGrade` (`Enums/PotentialGrade.mlua`), 저장 필드 `pg` |
| **환생의 불꽃** | 추가옵션(flame) 부여/재설정 탭 | `FlameSystem`, 저장 필드 `flame` |
| **잠재등급강화창** | 잠재등급을 올리는 탭 (옵션 롤 아님) | `PotentialSystem`, 저장 필드 `pg` |
| **스타포스** | ★ 상승/파괴/복구 | `StarforceSystem`, 저장 필드 `star` |
| **계승** | 장비 레벨 이동(Lv10→Lv20…) | *(미구현 — 5단계 예정)* |

> ⚠ 내부 상수명(`ItemGrade.Rare/Epic/Unique/Legendary`)·CSV 키는 하위호환 위해 그대로 유지. 표기(Name)만 하급~최상급으로 매핑.

---

## 1. 장비의 최종 구조 (독립 4~5축)

```
Equipment
├─ Level         Lv10 ~ Lv200   (ItemData 정적 열 — 계승으로만 이동, 미구현)
├─ ItemGrade     하급/중급/상급/최상급   (승급)
├─ PotentialGrade 레어/에픽/유니크/레전더리 (잠재등급강화창)
├─ FlameOption   환생의 불꽃 추가옵션      (환생)
└─ StarForce     스타포스 수치            (스타포스, pg 레전더리 전용)
```

- 예: `Lv30 · 상급 · 에픽 · 환생옵션 · ★12` 처럼 하나의 장비가 모든 정보를 동시에 보유.
- **인벤토리가 유일한 기준.** 강화/승급/컬렉션은 모두 같은 `InventoryController` 인스턴스를 참조(별도 장비 데이터 없음). `StackKey = itemId|level|part|grade|pg|투자suffix`, @Sync CSV로 화면 동기화.

---

## 2. 시스템별 역할 (확정)

| 시스템 | 역할 | 게이트 |
|---|---|---|
| **승급** (`EquipmentUpgradeSystem`) | 품질 하급→최상급 (재료 합성 800/200/20) | ★0 순정만 |
| **잠재등급강화창** (`PotentialSystem`) | pg 레어→에픽→유니크→레전더리 등급업(확률, 하락 없음) | 제한 없음(모든 장비) |
| **환생의 불꽃** (`FlameSystem`) | 추가옵션(flame) 부여/재설정 | 제한 없음(모든 장비) |
| **스타포스** (`StarforceSystem`) | ★ 상승/파괴/흔적/복구 | **pg == 레전더리 전용** |
| **컬렉션** (`CollectionSystem`) | 도감 등록(부위×레벨×품질) → 영구 공/방/HP 누적 | ★0 순정 소모(등록 콘텐츠, 승급 재료 아님) |

**진행 체인**: 승급(품질↑) · 잠재등급강화창(pg↑) 은 독립. pg가 레전더리에 도달해야 스타포스 해금.
확률/비용은 Config/DataSet에서 관리(하드코딩 금지) — 현재 등급업 확률(0.10/0.05/0.02)·비용은 placeholder, **팀 튜닝 대상**.

---

## 3. 구현 완료 내역 (1~4단계, 빌드 0에러 · 런타임 검증)

### 1단계 — 스타포스 게이트 축 전환 (품질 최상급 → pg 레전더리)
- `StarforceSystem.mlua`: `DoEnhance`/`DoEnhanceEquipped` 게이트 `grade < _ItemGrade.Legendary` → `pg < _PotentialGrade.Legendary`. `DoRestore` 복구 재료도 "레전더리(잠재) 순정"(`CountItemPg`/`ConsumeItemPg`, pg=Legendary).
- `UIEnhancePanel.mlua`: 좌측 리스트 필터를 **전체 장비**로(잠재/환생은 전 장비 대상, 스타포스만 서버에서 pg 차단), 별 게이지 표시 게이트를 pg 기준으로.

### 2단계 — 잠재등급강화창 재작성 (pg 등급업 전담)
- `PotentialSystem.mlua`: 옵션 롤(`RollOptions`/`pot` 생성) 제거, **pg 등급업만** 유지. `NextPotGrade` 확률 재사용. `TryGradeUpSlot`/`TryGradeUpEquipped`/`DoGradeUp(times)` 추가. `RequestConvert`→pg 등급업으로 매핑. UI 호환 위해 공개 메서드/`PendingPot`·`PendingTarget` 표면 유지. `PartClassOf`/`PoolRows`는 구 옵션확률팝업 호환용 obsolete로 잔존(최종 UI 정리 시 제거).
- `InventoryController.mlua`: `SetEquippedPg(part, pg)` 신설.
- ✅ **런타임 실증**: `나뭇가지 pg1(레어)→pg2(에픽) 성공` — 구 pg 개체 소모 후 신 pg 개체 생성 확인.

### 3단계 — 환생의 불꽃 게이트 해제
- `FlameSystem.mlua`: `grade < _ItemGrade.Legendary` 게이트 제거(추가옵션은 전 장비). 롤 기능 유지. `grade` 파라미터는 호출부 호환용 유지.

### 4단계 — 상세팝업 명칭
- `UIInventoryPopup.mlua`: 잠재(pot) 라인 제거, **"추가 옵션" = 환생(flame)만** 표시.

---

## 4. 보류 / 확인 필요 (기상 후 최종 리뷰)

1. **⚠ 강화 리스트 필터 편차**: 원지시는 "품질 최상급 → pg 레전드리"였으나, 그러면 pg를 올리는 잠재 탭이 대상 아이템을 못 찾음. 그래서 **전체 장비 표시**로 구현(스타포스 자격은 서버 차단). → 확정/수정 필요.
2. **잠재등급강화창 UI 목업 승인 대기**: `\.claude\skills\msw-painter\scripts\mockup_potgrade.png` — 등급업 전용 재설계(등급 사다리·확률·비용·[등급 강화] 버튼, 옵션 요소 전부 제거). 승인 시 `UIEnhancePanel` 잠재 탭 실제 구현. HTML 근사 → 실구현은 UIResourceSimpleFantasy 팩 스프라이트로 대체.
3. **계승 시스템 신규(5단계)**: HTML §07 — 레전드리 전용, Lv10→20 순차, 재료=목표 레벨 동일 부위 레전드리, 기존 소멸, 스타포스 계승 공식.
4. **pot 필드 물리 제거 여부**: 현재 데이터층에 잔존(생성·표시 안 함). 완전 제거는 대량 리팩터라 별도 결정.

---

## 5. 관련 파일

- Enum: `RootDesk/MyDesk/Enums/ItemGrade.mlua`, `PotentialGrade.mlua`
- 시스템: `RootDesk/MyDesk/Systems/{StarforceSystem, PotentialSystem, FlameSystem, EquipmentUpgradeSystem, CollectionSystem, CombatPowerSystem}.mlua`
- 컨트롤러: `RootDesk/MyDesk/Controllers/{InventoryController, EquipmentController}.mlua`
- UI: `RootDesk/MyDesk/UI/UIEnhancePanel.mlua`, `UIPromotePanel.mlua`, `UI/Popups/UIInventoryPopup.mlua`
- 목업: `.claude/skills/msw-painter/scripts/mockup_potgrade.{html,png}`
- 기획: `MVP_v11.html` (§05 승급·컬렉션 / §06 강화·잠재·환불 / §07 장비 계승)
