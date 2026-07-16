const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/EnhanceGroup.ui");
const base = "EnhanceRoot/Tab_Potential/Layout/";
for (const nm of ["Layout_Before", "Layout_After", "Layout_Cost", "Btn_Convert", "Btn_ApplyPot", "Btn_KeepPot"]) {
  const e = b.find(base + nm);
  if (!e) { console.log(nm + " MISSING"); continue; }
  const tr = (e.jsonString["@components"] || []).find(c => (c["@type"]||"").includes("UITransform"));
  console.log(nm + ": " + JSON.stringify(tr));
}
