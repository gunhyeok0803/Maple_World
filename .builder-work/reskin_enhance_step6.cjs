// 강화창 리스킨 7차: 밝은 회색 버튼 위 흰 글자 → 진회색(가독성).
// 대상: 환생(확률 정보/선호 저장/▼재료) + 잠재(▼재료 토글). 어두운 버튼(변환/큐브 사용 등)은 흰 글자 유지.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const TG = "MOD.Core.TextGUIRendererComponent";
const TITLE = { r: 0.23, g: 0.26, b: 0.31, a: 1 };
const b = UIBuilder.read("ui/EnhanceGroup.ui");
for (const p of [
  "Tab_Flame/Layout/Btn_FlameProb",
  "Tab_Flame/Layout/Btn_FlamePref",
  "Tab_Flame/Layout/Btn_MatToggle",
  "Tab_Potential/Layout/Btn_MatToggle",
]) {
  b.patchComponent(p, TG, { FontColor: TITLE });
}
b.write("ui/EnhanceGroup.ui");
console.log("[RESKIN] step6 — light button labels darkened");
