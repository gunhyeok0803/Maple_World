const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui";
const b = UIBuilder.read(UI);
b.patchComponent("UIR_SimpleFantasy_Sample_Inventory", "MOD.Core.UITransformComponent", {
  OffsetMin: { x: 0, y: 0 },
  OffsetMax: { x: 0, y: 0 },
});
b.write(UI, { strict: false });
console.log("root offsets zeroed");
