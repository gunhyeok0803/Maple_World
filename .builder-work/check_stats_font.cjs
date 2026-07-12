const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
for (const p of ["Panel_Summary/Text_Stats", "Panel_Summary/Text_StatsNext"]) {
  const t = b.getComponent(p, "MOD.Core.TextComponent");
  console.log(p, "FontSize=", t.FontSize, "Alignment=", t.Alignment, "LineSpacing=", t.LineSpacing);
}
