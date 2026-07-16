// 잠재탭 Before/After 패널 스타일 비교(폰트/정렬/rect/줄간격 차이 파악).
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/EnhanceGroup.ui");
const T = "MOD.Core.UITransformComponent";
const TL = "MOD.Core.TextComponent";
const TG = "MOD.Core.TextGUIRendererComponent";
for (const side of ["Layout_Before", "Layout_After"]) {
  console.log("==== " + side);
  for (const leaf of ["", "/Img_Grade", "/Img_Grade/Text_Grade", "/Text_Opts"]) {
    const p = "Tab_Potential/Layout/" + side + leaf;
    if (!b.getId(p)) { console.log("  (없음) " + leaf); continue; }
    const t = b.getComponent(p, T);
    const ap = t && t.anchoredPosition || {}; const rs = t && t.RectSize || {};
    let txt = b.getComponent(p, TL); let kind = "TL";
    if (!txt) { txt = b.getComponent(p, TG); kind = "TG"; }
    let info = "";
    if (txt) {
      info = " " + kind + " size=" + (txt.FontSize ?? "기본") + " lineH=" + (txt.LineSpacing ?? txt.LineHeight ?? "-")
        + " alignH=" + (txt.HorizontalAlignment ?? txt.Alignment ?? "-") + " alignV=" + (txt.VerticalAlignment ?? "-")
        + " bold=" + (txt.FontStyle ?? "-");
    }
    console.log("  " + (leaf || "(root)") + "  pos=(" + ap.x + "," + ap.y + ") size=(" + rs.x + "x" + rs.y + ")" + info);
  }
}
