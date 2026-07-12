const { ModelBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/model/msw_model_builder.cjs");
const BASE = "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UIResourceSimpleFantasy/Core/";
const MODELS = ["UIR_SimpleFantasy_Core_Panel", "UIR_SimpleFantasy_Core_Button"];
const WANT = new Set(["Panel_01", "Panel_02", "Panel_03", "Panel_04", "Panel_05", "Btn_Menu", "Btn_W190_01", "Btn_W190_02", "Btn_Exit", "Button_Close", "Btn_Close", "Btn_Return", "Btn_Filter", "Btn_W86", "Btn_OK", "Img_Bg"]);

function ruidStr(v) {
  if (v == null) return "";
  if (typeof v === "string") return v;
  return v.ruid || v.Ruid || v.RUID || v.value || JSON.stringify(v);
}

for (const m of MODELS) {
  const b = ModelBuilder.read(BASE + m + ".model");
  console.log("=== " + m);
  for (const c of b.listChildren()) {
    if (!WANT.has(c.Name)) continue;
    for (const v of c.Model.Values || []) {
      const n = v.Name || v.name;
      if (n === "ImageRUID" || n === "SpriteRUID") {
        console.log(`  ${c.Name}: ${ruidStr(v.Value !== undefined ? v.Value : v.value)}`);
      }
    }
  }
}
