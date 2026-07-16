// 잠재 탭 버튼 재구성: [취소] 제거, [적용]을 하단(큐브 사용 좌측 미러)으로 이동.
// 메이플 큐브식 2버튼(큐브 사용=재롤 / 적용=확정).
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/EnhanceGroup.ui");
const CTA_RUID = "c2660e96661c4a6e8dc8eaa17eb0655c";  // 큐브 사용과 동일 팩 스킨
const base = "EnhanceRoot/Tab_Potential/Layout";

// 1) [취소] 제거
if (b.find(base + "/Btn_KeepPot")) b.remove(base + "/Btn_KeepPot");

// 2) [적용]을 하단 좌측으로 재배치 — Btn_Convert(큐브 사용, bottom-center pos(230,60) 205x74)의 좌우 미러.
b.button(base + "/Btn_ApplyPot", "적용", {
  anchor: "bottom-center", pivot: [0.5, 0.5], pos: [-230, 60], rect_size: [205, 74],
  font_size: 26, color: "#2B2B2B",
  image_ruid: CTA_RUID, sprite_type: 0,
  bg_color: { r: 0.68, g: 0.92, b: 0.18, a: 1 },
});

b.write("ui/EnhanceGroup.ui");
console.log("취소 제거 + 적용 하단 이동 완료");
console.log("Btn_ApplyPot -> " + (b.find(base + "/Btn_ApplyPot") || {}).id);
console.log("Btn_KeepPot exists? " + (b.find(base + "/Btn_KeepPot") ? "YES(오류)" : "no(제거됨)"));
