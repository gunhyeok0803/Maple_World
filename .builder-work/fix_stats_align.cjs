const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
b.patchComponent("Panel_Summary/Text_Stats", "MOD.Core.TextComponent", { Alignment: 0 });
b.write(UI, { strict: false });
console.log("align fixed");
