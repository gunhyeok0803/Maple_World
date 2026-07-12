const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const RUIDS = {
  "01": "c2660e96661c4a6e8dc8eaa17eb0655c",
  "02": "50426b5b1ee44bc5a1c10355b0e9ad03",
  "03": "3a72c0cef5c94f7b9b6491a997f12fb9",
  "04": "501210f182594602b16e083351ea3ab3",
  "05": "ccf631c72e52448fa84a6d63198d748e",
  "06": "d3c485285afd4d8b9b2c0cbbfd8bd88c",
  "07": "afa28786b49c4d17850eff171e1b211a",
  "08": "d583d93f095148868a52da1cd4a932b9",
};
const b = new UIBuilder("SwatchGroup", 30);
b.sprite("Bg", { anchor: "middle-center", pos: [0, 0], rect_size: [1100, 300], image_ruid: "6e8e561a4582462eaad762cb11d1f835", sprite_type: 1 });
b.patchComponent("Bg", "MOD.Core.SpriteGUIRendererComponent", { Color: { r: 0.04, g: 0.05, b: 0.07, a: 0.9 } });
let i = 0;
for (const [name, ruid] of Object.entries(RUIDS)) {
  const x = -400 + (i % 4) * 250;
  const y = i < 4 ? 60 : -60;
  b.button("Btn_" + name, name, { anchor: "middle-center", pos: [x, y], rect_size: [190, 88], font_size: 26, color: "#FFFFFF", image_ruid: ruid });
  i++;
}
b.write("C:/Users/rnsgu/MSW_ProjectAI00/ui/SwatchGroup.ui", { strict: false });
console.log("swatch written");
