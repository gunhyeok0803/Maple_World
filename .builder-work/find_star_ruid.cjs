const { ModelBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/model/msw_model_builder.cjs");
const M = "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UIResourceSimpleFantasy/Sample/UIR_SimpleFantasy_Sample_GearItemInfo.model";
const b = ModelBuilder.read(M);
const kids = b.listChildren();
function ruidOf(model) {
  for (const v of (model.Values || [])) {
    const n = v.Name || v.name;
    if (n === "ImageRUID") {
      const val = v.Value !== undefined ? v.Value : v.value;
      return (val && (val.DataId || val)) || JSON.stringify(val);
    }
  }
  return null;
}
const seen = {};
for (const c of kids) {
  const nm = c.Name || (c.Model && c.Model.Name) || "";
  if (/star/i.test(nm)) {
    const r = c.Model ? ruidOf(c.Model) : null;
    if (r) { console.log(nm + " -> " + r); seen[r] = (seen[r]||0)+1; }
  }
}
console.log("--- unique star RUIDs ---");
for (const k in seen) console.log(k, "x"+seen[k]);
