const { ModelBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/model/msw_model_builder.cjs");
const M = "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UIResourceSimpleFantasy/Core/UIR_SimpleFantasy_Core_Panel.model";
const b = ModelBuilder.read(M);
for (const c of b.listChildren()) {
  if (c.Name !== "Panel_04" && c.Name !== "Panel_01") continue;
  console.log("=== " + c.Name);
  for (const v of c.Model.Values || []) {
    const n = v.Name || v.name;
    const t = v.TargetType || v.target_type || "";
    const val = v.Value !== undefined ? v.Value : v.value;
    console.log(`  [${t}] ${n} = ${typeof val === "object" ? JSON.stringify(val) : val}`);
  }
}
