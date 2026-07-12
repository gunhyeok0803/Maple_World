const { ModelBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/model/msw_model_builder.cjs");
for (const nm of ["Panel","Card","Base"]) {
  const M = "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UIResourceSimpleFantasy/Core/UIR_SimpleFantasy_Core_"+nm+".model";
  const b = ModelBuilder.read(M);
  const seen = {};
  function ruidOf(model){ for(const v of (model.Values||[])){ const n=v.Name||v.name; if(n==="ImageRUID"){ const val=v.Value!==undefined?v.Value:v.value; return (val&&(val.DataId||val))||null; } } return null; }
  console.log("=== Core_"+nm+" ===");
  for (const c of b.listChildren()) {
    const cn = c.Name||(c.Model&&c.Model.Name)||"";
    const r = c.Model ? ruidOf(c.Model) : null;
    if (r && !seen[cn]) { console.log("  "+cn+" -> "+r); seen[cn]=1; }
  }
}
