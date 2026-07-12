const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
const list = b.listEntities();
console.log("total entities:", list.length);
for (const e of list) {
  if (e.depth <= 2) console.log(`${"  ".repeat(e.depth)}${e.name}  (${e.kind || ""})  size=${JSON.stringify(e.size || "")} enable=${e.enable}`);
}
