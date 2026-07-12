const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui");
const raw = b.find("Controller");
console.log("componentNames:", raw.componentNames);
for (const c of raw.jsonString["@components"]) {
  console.log(JSON.stringify(c).slice(0, 200));
}
console.log("enable:", raw.jsonString.enable, "visible:", raw.jsonString.visible);
