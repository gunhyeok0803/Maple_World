// Inspect DefaultGroup menu buttons + PromoteGroup root, to plan the Collection entry point.
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");

console.log("===== DefaultGroup.ui =====");
try {
  const d = UIBuilder.read("ui/DefaultGroup.ui");
  for (const e of d.listEntities()) {
    console.log(`${"  ".repeat(e.depth || 0)}${e.name}  [${e.kind}]  pos=${JSON.stringify(e.pos)} size=${JSON.stringify(e.size)}`);
  }
} catch (err) { console.log("DefaultGroup read error:", err.message); }

console.log("\n===== PromoteGroup.ui (root + top level) =====");
try {
  const p = UIBuilder.read("ui/PromoteGroup.ui");
  for (const e of p.listEntities()) {
    if ((e.depth || 0) <= 1) console.log(`${"  ".repeat(e.depth || 0)}${e.name}  [${e.kind}]`);
  }
} catch (err) { console.log("PromoteGroup read error:", err.message); }
