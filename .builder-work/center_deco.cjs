const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
b.patch("UIR_SimpleFantasy_Sample_StarForce/Panel/Img_Deco", { anchor: "middle-center", pivot: [0.5, 0.5], pos: [0, 335], rect_size: [130, 130] });
b.write(UI, { strict: false });
console.log("deco centered");
