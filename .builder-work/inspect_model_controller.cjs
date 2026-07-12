const { ModelBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/model/msw_model_builder.cjs");
const M = "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/Model_Controller.model";
const b = ModelBuilder.read(M);
console.log("components:", JSON.stringify(b.listComponents()));
for (const v of b.listValues()) {
  const t = v.TargetType || v.target_type || "";
  const n = v.Name || v.name;
  if (String(t).includes("script.")) console.log("value:", t, n, "=", JSON.stringify(v.Value !== undefined ? v.Value : v.value).slice(0, 80));
}
console.log("children:", b.listChildren().length);
