const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui");
for (const e of b.listEntities()) {
  console.log("  ".repeat(e.depth) + e.path.replace("/ui/PromoteGroup/", "") + "  [" + (e.size ? e.size.map(Math.round).join("x") : "-") + "] pos=" + (e.pos ? e.pos.map(Math.round).join(",") : "-") + (e.enable === false ? " (off)" : ""));
}
