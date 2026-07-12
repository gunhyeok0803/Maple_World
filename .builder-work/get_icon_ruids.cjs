const { ModelBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/model/msw_model_builder.cjs");
const BASE = "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UIResourceSimpleFantasy/";

function dumpVals(model, targets) {
  const b = ModelBuilder.read(model);
  for (const c of b.listChildren()) {
    if (targets.includes(c.Name)) {
      console.log("=== " + c.Name);
      for (const v of (c.Model.Values || [])) {
        if (String(v.name).includes("RUID") || String(v.name) === "Color") {
          console.log("  " + v.name + " = " + JSON.stringify(v.value));
        }
      }
    }
  }
}
dumpVals(BASE + "Core/UIR_SimpleFantasy_Core_Icon.model", ["LongCoat_On", "Cap_On", "Icon_Chest", "Weapon_On"]);
dumpVals(BASE + "Sample/UIR_SimpleFantasy_Sample_Inventory.model", ["Img_Bag"]);
