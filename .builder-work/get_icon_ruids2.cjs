const { ModelBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/model/msw_model_builder.cjs");
const BASE = "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UIResourceSimpleFantasy/";

function get(vals, n) { const e = (vals || []).find(v => (v.Name || v.name) === n); return e ? (e.Value !== undefined ? e.Value : e.value) : undefined; }
function ruid(v) { if (!v) return null; if (typeof v === "string") return v; return v.DataId || v.dataId || null; }
function inspect(model, targets) {
  const b = ModelBuilder.read(model);
  for (const c of b.listChildren()) {
    if (targets.includes(c.Name)) {
      const r = ruid(get(c.Model.Values, "ImageRUID"));
      if (r) console.log(c.Name + " = " + r);
    }
  }
}
inspect(BASE + "Core/UIR_SimpleFantasy_Core_Icon.model", ["Icon_Chest", "LongCoat_On", "Cap_On", "Weapon_On"]);
inspect(BASE + "Sample/UIR_SimpleFantasy_Sample_Inventory.model", ["Img_Bag"]);
