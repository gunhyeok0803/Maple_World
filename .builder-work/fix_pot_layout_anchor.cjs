const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
b.patch("UIR_SimpleFantasy_Sample_PotentialSelect/Layout", { anchor: "middle-center", pos: [430, -35], rect_size: [820, 950], pivot: [0.5, 0.5] });
b.write(UI, { strict: false });
console.log("pot layout anchored");
