const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
for (const p of ["Window", "Window/Img_Bg", "Panel_EquipList/Img_Bg", "Panel_Summary/Img_Bg"]) {
  const c = b.getComponent(p, "MOD.Core.SpriteGUIRendererComponent");
  if (c) console.log(p, "RUID=", JSON.stringify(c.ImageRUID), "Color=", JSON.stringify(c.Color), "Type=", c.Type);
  else console.log(p, "no sprite");
}
