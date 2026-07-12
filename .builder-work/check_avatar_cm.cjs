const { ModelBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/model/msw_model_builder.cjs");
const M = "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UIResourceSimpleFantasy/Sample/UIR_SimpleFantasy_Sample_Inventory.model";
const b = ModelBuilder.read(M);
for (const c of b.listChildren()) {
  if (c.Name === "Avatar_Char") {
    console.log("=== Avatar_Char Values (CostumeManager/AvatarGUI 관련):");
    for (const v of (c.Model.Values || [])) {
      const n = v.Name || v.name;
      const t = v.TargetType || v.target_type || "";
      if (String(t).includes("Costume") || String(t).includes("Avatar") || String(n).includes("Equip") || String(n).includes("Custom")) {
        console.log(`  [${t}] ${n} = ${JSON.stringify(v.Value !== undefined ? v.Value : v.value)}`);
      }
    }
    const comps = (c.Model.Components || []).map(x => (typeof x === "string" ? x : x["@type"]));
    console.log("  comps:", comps.join(", "));
  }
}
