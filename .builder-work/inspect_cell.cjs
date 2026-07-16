// Inspect inventory CellTemplate structure (to replicate the exact icon cell for collection).
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("ui/InventoryGroup.ui");
for (const e of b.listEntities()) {
  if (e.path && e.path.indexOf("CellTemplate") !== -1) {
    const comps = (e.componentNames || "");
    console.log(`${e.path}  size=${JSON.stringify(e.size)}  comps=[${comps}]`);
  }
}
