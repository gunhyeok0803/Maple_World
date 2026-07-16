const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/EnhanceGroup.ui");
const SP = "MOD.Core.SpriteGUIRendererComponent";
for (const p of [
  "Tab_StarForce/Panel/Layout_Cost/Img_BG",
  "Tab_Potential/Layout/Layout_Cost/Img_BG",
  "Tab_Flame/Layout/Layout_Cost/Img_BG",
]) {
  const sp = b.getComponent(p, SP);
  if (!sp) { console.log(p + " (no sprite)"); continue; }
  const r = sp.ImageRUID ? (sp.ImageRUID.DataId || "obj") : "-";
  const c = sp.Color || {};
  console.log(p + "\n   ruid=" + r + " type=" + (sp.Type ?? "?") + " color=(" + [c.r,c.g,c.b,c.a].map(x=>(x??1).toFixed(3)).join(",") + ")");
}
