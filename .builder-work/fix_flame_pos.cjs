const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
// 환생 탭 레이아웃: pivot 미지정으로 우측 밀림 → 중앙 pivot 명시
b.patch("UIR_SimpleFantasy_Sample_PotentialReset/Layout", { anchor: "middle-center", pos: [430, -35], rect_size: [794, 950], pivot: [0.5, 0.5] });
b.write(UI, { strict: false });
console.log("flame layout fixed");
