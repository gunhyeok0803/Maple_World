const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/EnhanceGroup.ui");
function tree(base) {
  console.log("==== " + base);
  const ent = b.find(base);
  if (!ent) { console.log("  (없음)"); return; }
  // listEntities 상대경로로 하위 수집
  for (const e of b.listEntities()) {
    const p = e.path || "";
    const norm = p.replace(/^\/ui\/[^/]+\//, "");
    if (norm === base || norm.startsWith(base + "/")) {
      const comps = (e.components || []).join?.(",") || "";
      const found = b.find(norm);
      const js = found && found.jsonString || {};
      const types = (js["@components"] || []).map(c => (c["@type"]||"").replace("MOD.Core.","")).join(",");
      console.log("  " + norm.slice(base.length) + "  [" + types + "]");
    }
  }
}
tree("Tab_StarForce/Panel/Layout_Cost");
