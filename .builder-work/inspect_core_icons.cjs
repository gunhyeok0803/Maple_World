const { ModelBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/model/msw_model_builder.cjs");
const M = "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UIResourceSimpleFantasy/Core/UIR_SimpleFantasy_Core_Icon.model";
const b = ModelBuilder.read(M);
const PAT = /star|force|rank|grade|book|collect|medal|anvil|hammer|forge|upgrade|arrow|weapon|smith|flame|fire|cube|gem|menu/i;
for (const c of b.listChildren()) {
  if (!PAT.test(c.Name)) continue;
  for (const v of c.Model.Values || []) {
    const n = v.Name || v.name;
    if (n === "ImageRUID" || n === "SpriteRUID") {
      const val = v.Value !== undefined ? v.Value : v.value;
      const id = (val && (val.DataId || val.ruid)) || val;
      console.log(`${c.Name}: ${id}`);
    }
  }
}
