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
for (const [tab, base] of Object.entries(bases)) {
  console.log("\n==== " + tab + "  (" + base.split("/").slice(1).join("/") + ")");
  for (const e of b.listEntities()) {
    const p = (e.path || "").replace(/^\/ui\/[^/]+\//, "");
    if (p !== base && !p.startsWith(base + "/")) continue;
    const tr = (b.find(p).jsonString["@components"] || []).find(c => (c["@type"]||"").includes("UITransform"));
    const sp = (b.find(p).jsonString["@components"] || []).find(c => (c["@type"]||"").includes("SpriteGUIRenderer"));
    const ap = tr && tr.anchoredPosition || {}, rs = tr && tr.RectSize || {};
    const col = sp && sp.Color ? `col(${(sp.Color.r??1).toFixed(2)},${(sp.Color.g??1).toFixed(2)},${(sp.Color.b??1).toFixed(2)},${(sp.Color.a??1).toFixed(2)})` : "";
    const ruid = sp && sp.ImageRUID ? " ruid=" + (sp.ImageRUID.DataId||"") : "";
    const rel = p.slice(base.length) || "/(self)";
    console.log("  " + rel + "  pos(" + (ap.x??"?") + "," + (ap.y??"?") + ") size(" + (rs.x??"?") + "x" + (rs.y??"?") + ") " + col + ruid);
  }
}
