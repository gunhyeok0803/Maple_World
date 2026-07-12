const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
if (b.find("Tab_StarForce/Panel/Layout_Prob/Decrease")) { b.remove("Tab_StarForce/Panel/Layout_Prob/Decrease"); console.log("Decrease removed"); }
b.write(UI,{strict:false});
console.log("done");
