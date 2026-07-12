const { ModelBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/model/msw_model_builder.cjs");
const BASE = "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UIResourceSimpleFantasy/Core/";
const MODELS = ["UIR_SimpleFantasy_Core_Panel", "UIR_SimpleFantasy_Core_Button", "UIR_SimpleFantasy_Core_ETC", "UIR_SimpleFantasy_Core_Base"];

function val(values, name) {
  for (const v of values || []) {
    const n = v.Name || v.name;
    if (n === name) return v.Value !== undefined ? v.Value : v.value;
  }
  return undefined;
}

for (const m of MODELS) {
  const b = ModelBuilder.read(BASE + m + ".model");
  console.log("=== " + m);
  for (const c of b.listChildren()) {
    const values = c.Model && c.Model.Values;
    const ruid = val(values, "ImageRUID") ?? val(values, "SpriteRUID");
    const size = val(values, "RectSize") ?? val(values, "SizeDelta");
    const sizeStr = size && typeof size === "object" ? JSON.stringify(size) : String(size ?? "");
    if (ruid) {
      console.log(`  ${c.Name}  ruid=${ruid}  size=${sizeStr}`);
    } else {
      console.log(`  ${c.Name}  (no-ruid) size=${sizeStr}`);
    }
  }
}
