// Find leftover old labels in Panel_Coll (LV.10/20/30, 하급 등) not part of the new matrix.
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("ui/PromoteGroup.ui");
const keep = /Cell_|ColHdr_|RowHdr_|CollHint/;
for (const e of b.listEntities()) {
  const p = e.path || "";
  if (p.indexOf("/Panel_Coll/") !== -1 && !keep.test(p)) {
    console.log(`${p}  [${e.kind}]`);
  }
}
