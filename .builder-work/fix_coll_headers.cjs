const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui";
const b = UIBuilder.read(UI);
const GRADES = ["레어", "에픽", "유니크", "레전드리"];
for (let g = 0; g < 4; g++) {
  b.patchComponent("Panel_Coll/Text_ColG" + (g + 1), "MOD.Core.TextComponent", { Text: GRADES[g] });
}
b.write(UI, { strict: false });
console.log("headers fixed");
