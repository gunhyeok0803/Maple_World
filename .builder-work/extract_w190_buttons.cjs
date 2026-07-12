const { ModelBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/model/msw_model_builder.cjs");
const M = "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UIResourceSimpleFantasy/Core/UIR_SimpleFantasy_Core_Button.model";
const b = ModelBuilder.read(M);
for (const c of b.listChildren()) {
  if (!/^Btn_W190_0[1-8]$/.test(c.Name) && c.Name !== "Btn_OK") continue;
  for (const v of c.Model.Values || []) {
    const n = v.Name || v.name;
    if (n === "ImageRUID") {
      const val = v.Value !== undefined ? v.Value : v.value;
      console.log(c.Name + ": " + (val.DataId || val));
    }
  }
}
