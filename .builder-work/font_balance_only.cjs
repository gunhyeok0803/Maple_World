const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
// 요청받은 텍스트만: 현재/강화후 크게(20), 세부스탯 작게(14). 그 외 일절 안 건드림.
b.patchComponent("Panel_Summary/Text_ColCur","MOD.Core.TextComponent",{FontSize:20});
b.patchComponent("Panel_Summary/Text_ColNext","MOD.Core.TextComponent",{FontSize:20});
b.patchComponent("Panel_Summary/Text_Stats","MOD.Core.TextComponent",{FontSize:14});
b.patchComponent("Panel_Summary/Text_StatsNext","MOD.Core.TextComponent",{FontSize:14});
b.write(UI,{strict:false});
console.log("font balance: 현재/강화후 20, 세부스탯 14 (그 외 미변경)");
