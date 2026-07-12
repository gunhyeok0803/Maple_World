const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
for (const rel of ["Panel_Summary/Text_ColCur","Panel_Summary/Text_ColNext","Panel_Summary/Text_Stats","Panel_Summary/Text_StatsNext","Panel_Summary/Text_Name"]){
  const tc = b.getComponent(rel,"MOD.Core.TextComponent");
  console.log(rel.split("/").pop(), "FontSize=", tc?tc.FontSize:"?", "LineSpacing=", tc?tc.LineSpacing:"?");
}
