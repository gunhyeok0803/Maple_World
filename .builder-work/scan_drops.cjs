const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const fs = require("fs");
const dir = "C:/Users/rnsgu/MSW_ProjectAI00/ui";
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".ui")) continue;
  try {
    const b = UIBuilder.read(dir + "/" + f);
    const ents = b.listEntities();
    const roots = ents.filter(e => e.name && e.name.startsWith("UIR_SimpleFantasy_Sample"));
    console.log(`${f}: total=${ents.length}` + (roots.length ? "  ROOTS: " + roots.map(r => r.name).join(", ") : ""));
  } catch (err) { console.log(`${f}: ERR ${err.message}`); }
}
