const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
// 미리보기를 성급(1▶2) 밴드 아래로
b.patch("UIR_SimpleFantasy_Sample_StarForce/Panel/Text_Preview", { pos: [0, 10] });
b.write(UI, { strict: false });
console.log("preview moved");
