const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
const t = b.getComponent("Panel_Summary/Text_ColCur", "MOD.Core.TextComponent");
console.log("ColCur TextComponent:", JSON.stringify(t));
const b2 = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui");
const t2 = b2.getComponent("Panel_Promote/Text_Need", "MOD.Core.TextComponent");
console.log("Need TextComponent:", JSON.stringify(t2));
