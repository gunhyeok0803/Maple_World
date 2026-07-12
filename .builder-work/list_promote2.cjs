const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui");
console.log("total:", b.listEntities().length);
for (const e of b.listEntities()) {
  if (e.depth > 2) continue;
  console.log("  ".repeat(e.depth) + e.path.replace("/ui/PromoteGroup/","") + (e.enable===false?" (off)":""));
}
