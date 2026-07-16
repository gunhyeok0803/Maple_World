// 3탭 Layout_Cost 구성 비교(SF-2 통일 대상): rect/폰트/색.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/EnhanceGroup.ui");
const T = "MOD.Core.UITransformComponent";
const TL = "MOD.Core.TextComponent";
const TG = "MOD.Core.TextGUIRendererComponent";
const fmt = (c) => c ? `(${(c.r??0).toFixed(2)},${(c.g??0).toFixed(2)},${(c.b??0).toFixed(2)})` : "-";
const BASES = {
  star: "Tab_StarForce/Panel/Layout_Cost",
  pot: "Tab_Potential/Layout/Layout_Cost",
  flame: "Tab_Flame/Layout/Layout_Cost",
};
for (const [k, base] of Object.entries(BASES)) {
  console.log("==== " + k + " (" + base + ")");
  if (!b.getId(base)) { console.log("  없음!"); continue; }
  const bt = b.getComponent(base, T);
  console.log("  (root) pos=(" + bt.anchoredPosition?.x + "," + bt.anchoredPosition?.y + ") size=(" + bt.RectSize?.x + "x" + bt.RectSize?.y + ")");
  for (const leaf of ["Img_BG", "Img_BG/Img_Cost", "Img_BG/Img_Dia", "Label_Cost", "Text_Cost", "Text_Dia", "Text_Cost/Img_Cost"]) {
    const p = base + "/" + leaf;
    if (!b.getId(p)) continue;
    const t = b.getComponent(p, T);
    let txt = b.getComponent(p, TL); let kind = "TL";
    if (!txt) { txt = b.getComponent(p, TG); kind = "TG"; }
    let info = txt ? ("  " + kind + " size=" + (txt.FontSize ?? "?") + " color=" + fmt(txt.FontColor)) : "";
    console.log("  " + leaf + " pos=(" + t.anchoredPosition?.x + "," + t.anchoredPosition?.y + ") size=(" + t.RectSize?.x + "x" + t.RectSize?.y + ")" + info);
  }
}
