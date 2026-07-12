const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
const rt = b.getComponent("Panel_EquipList/EquipCell_1", "MOD.Core.RectTransformComponent");
console.log("KEYS:", rt ? Object.keys(rt).join(",") : "null");
console.log(JSON.stringify(rt).slice(0,600));
