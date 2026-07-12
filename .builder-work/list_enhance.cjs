const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
for (const e of b.listEntities()) {
  if (e.depth > 4) continue;
  console.log("  ".repeat(e.depth) + e.path.replace("/ui/EnhanceGroup/", "") + "  [" + (e.size ? e.size.join("x") : "-") + "] pos=" + (e.pos ? e.pos.join(",") : "-"));
}
