const { ModelBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/model/msw_model_builder.cjs");
for (const nm of ["PotentialSelect","PotentialReset"]) {
  const M = "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UIResourceSimpleFantasy/Sample/UIR_SimpleFantasy_Sample_"+nm+".model";
  const b = ModelBuilder.read(M);
  const kids = b.listChildren();
  console.log("=== "+nm+" ("+kids.length+" children) ===");
  const hit = kids.filter(c => /확률|등장|prob|rate|slot|info|table|opt|option|grade|등급/i.test((c.Name||(c.Model&&c.Model.Name)||"")));
  for (const c of hit) console.log("  "+(c.Name||c.Model&&c.Model.Name));
}
