const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/EnhanceGroup.ui");
const T = "MOD.Core.UITransformComponent";
for (const e of b.listEntities()) {
  const p = e.path || "";
  if (p.includes("Tab_Potential")) {
    // normalize to after first two segments
    const rel = p.replace(/^\/ui\/[^/]+\//, "");
    const t = b.getComponent(rel, T);
    const ap = t && t.anchoredPosition || {}; const rs = t && t.RectSize || {};
    const types = (e.components || []).map(c => c.replace("MOD.Core.","").replace("Component","")).join(",");
    console.log(rel + "  pos=(" + (ap.x??"?") + "," + (ap.y??"?") + ") size=(" + (rs.x??"?") + "x" + (rs.y??"?") + ") [" + types + "]");
  }
}
