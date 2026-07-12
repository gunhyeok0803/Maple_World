const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const roots = [
  "UIR_SimpleFantasy_Sample_StarForce",
  "UIR_SimpleFantasy_Sample_PotentialReset",
  "UIR_SimpleFantasy_Sample_PotentialSelect",
  "UIR_SimpleFantasy_Sample_GearItemInfo",
];
for (const r of roots) {
  if (b.hasComponent(r, "MOD.Core.SpriteGUIRendererComponent")) {
    b.patchComponent(r, "MOD.Core.SpriteGUIRendererComponent", { RaycastTarget: false });
    console.log("raycast off: " + r);
  }
}
b.write(UI, { strict: false });
console.log("done");
