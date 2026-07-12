const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui";
const b = UIBuilder.read(UI);
b.remove("Controller/EnhancePopup");
b.removeComponent("Controller", "script.UIEquipmentEnhancePopup");
b.write(UI, { strict: false });
console.log("old EnhancePopup removed");
