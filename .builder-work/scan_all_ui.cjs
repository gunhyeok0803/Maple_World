const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const fs = require("fs");
const dir = "C:/Users/rnsgu/MSW_ProjectAI00/ui";
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".ui")) continue;
  try {
    const b = UIBuilder.read(dir + "/" + f);
    const ents = b.listEntities();
    const hits = ents.filter(e => (e.name && e.name.includes("SimpleFantasy")) || (e.path && e.path.includes("SimpleFantasy")));
    console.log(`${f}: total=${ents.length} sampleHits=${hits.length}`);
    for (const h of hits.slice(0, 3)) console.log("   ->", h.path);
  } catch (err) {
    console.log(`${f}: ERROR ${err.message}`);
  }
}
