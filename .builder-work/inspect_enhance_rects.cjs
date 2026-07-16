// 강화창 핵심 컨테이너 rect 측정: Window/Img_Bg vs 탭 루트 vs 내부 패널.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/EnhanceGroup.ui");
const T = "MOD.Core.UITransformComponent";
for (const p of [
  "Window", "Window/Img_Bg", "Window/Text_WinTitle",
  "Tab_StarForce", "Tab_StarForce/Panel",
  "Tab_Potential", "Tab_Potential/Layout",
  "Panel_EquipList", "Panel_Summary",
]) {
  const t = b.getComponent(p, T);
  if (!t) { console.log(p + "  (no transform)"); continue; }
  const ap = t.anchoredPosition || {}; const rs = t.RectSize || {};
  const amin = t.AnchorsMin || {}; const amax = t.AnchorsMax || {};
  console.log(p + "  pos=(" + (ap.x??"?") + "," + (ap.y??"?") + ") size=(" + (rs.x??"?") + "x" + (rs.y??"?") + ") anchors=(" + (amin.x??"?") + "," + (amin.y??"?") + ")-(" + (amax.x??"?") + "," + (amax.y??"?") + ")");
}
