const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
// 코너 앵커(0,0) → 중앙 앵커로 교정(자식 좌표계 정상화)
b.patch("UIR_SimpleFantasy_Sample_PotentialReset", { anchor: "middle-center", pos: [0, 0], rect_size: [1920, 1080], pivot: [0.5, 0.5] });
b.patch("UIR_SimpleFantasy_Sample_PotentialSelect", { anchor: "middle-center", pos: [0, 0], rect_size: [1920, 1080], pivot: [0.5, 0.5] });
b.write(UI, { strict: false });
console.log("roots re-anchored");
