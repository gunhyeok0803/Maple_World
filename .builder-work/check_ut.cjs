const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui");
const ut = b.getComponent("Controller/BagPanel", "MOD.Core.UITransformComponent");
console.log("BagPanel UT keys:", Object.keys(ut).join(","));
console.log("UIMode:", ut.UIMode, "UIVersion:", ut.UIVersion, "ActivePlatform:", ut.ActivePlatform);
