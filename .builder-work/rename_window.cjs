const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui";
const u = UIBuilder.read(UI);
u.rename("UIR_SimpleFantasy_Sample_Inventory", "UI_Inventory"); // 자식 경로 자동 갱신
u.write(UI, { strict: false });
console.log("renamed -> UI_Inventory");
