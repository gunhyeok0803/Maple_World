const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/EnhanceGroup.ui");
for (const p of ["EnhanceRoot/Tab_Potential/Layout/Btn_Convert", "EnhanceRoot/Tab_Potential/Layout/Layout_After"]) {
  const e = b.find(p);
  console.log("==== " + p);
  if (!e) { console.log("  (not found)"); continue; }
  const js = e.jsonString || {};
  const comps = js["@components"] || [];
  for (const c of comps) {
    const t = (c["@type"]||"").replace("MOD.Core.","");
    if (t === "UITransformComponent") {
      console.log("  XFORM ap=" + JSON.stringify(c.anchoredPosition) + " AMin=" + JSON.stringify(c.AnchorMin) + " AMax=" + JSON.stringify(c.AnchorMax) + " Pivot=" + JSON.stringify(c.Pivot) + " RectSize=" + JSON.stringify(c.RectSize));
    } else if (t === "SpriteGUIRendererComponent") {
      console.log("  SPRITE ruid=" + JSON.stringify(c.ImageRUID) + " Type=" + c.Type + " Color=" + JSON.stringify(c.Color));
    } else {
      console.log("  " + t);
    }
  }
}
