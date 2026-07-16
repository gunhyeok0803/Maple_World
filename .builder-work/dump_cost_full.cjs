const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/EnhanceGroup.ui");
const bases = {
  "스타포스": "EnhanceRoot/Tab_StarForce/Panel/Layout_Cost",
  "잠재":     "EnhanceRoot/Tab_Potential/Layout/Layout_Cost",
  "환생":     "EnhanceRoot/Tab_Flame/Layout/Layout_Cost",
};
function comp(p, key) {
  const e = b.find(p);
  if (!e) return null;
  return (e.jsonString["@components"] || []).find(c => (c["@type"]||"").includes(key));
}
for (const [tab, base] of Object.entries(bases)) {
  console.log("\n==== " + tab);
  for (const e of b.listEntities()) {
    const p = (e.path || "").replace(/^\/ui\/[^/]+\//, "");
    if (p !== base && !p.startsWith(base + "/")) continue;
    const tr = comp(p, "UITransform");
    const sp = comp(p, "SpriteGUIRenderer");
    const tx = comp(p, "TextGUIRenderer") || comp(p, "TextComponent");
    const ap = tr && tr.anchoredPosition || {}, rs = tr && tr.RectSize || {};
    let extra = "";
    if (sp) { const c = sp.Color||{}; extra += " SP col(" + [c.r,c.g,c.b,c.a].map(x=>(x==null?1:x).toFixed(2)).join(",") + ")" + (sp.ImageRUID?(" ruid="+(sp.ImageRUID.DataId||sp.ImageRUID)):""); }
    if (tx) { const fc = tx.FontColor||tx.Color||{}; extra += " TX '" + (tx.Text||"") + "' fc(" + [fc.r,fc.g,fc.b,fc.a].map(x=>(x==null?1:x).toFixed(2)).join(",") + ") size=" + (tx.FontSize||tx.fontSize||"?"); }
    const rel = p.slice(base.length) || "/(self)";
    console.log("  " + rel.padEnd(22) + " pos(" + (ap.x??"?") + "," + (ap.y??"?") + ") size(" + (rs.x??"?") + "x" + (rs.y??"?") + ")" + extra);
  }
}
