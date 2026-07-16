const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("ui/PromoteGroup.ui");
for (const e of b.listEntities()) {
  const p = e.path || "";
  if (p.includes("RegCellTpl") || p.endsWith("/RegGrid") || p.endsWith("/RegSub") || p.endsWith("/RegHdr") || p.endsWith("/RegPrompt") || p.endsWith("/RegEmpty")) {
    console.log((e.kind || "?").padEnd(10), p);
  }
}
