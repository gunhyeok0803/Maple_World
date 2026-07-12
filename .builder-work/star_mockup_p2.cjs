const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const S = "UIR_SimpleFantasy_Sample_StarForce/Panel";
const TC = { anchor: "top-center", pivot: [0.5, 0.5] };
// 상단 여백에 이름→별게이지→현재▶다음 정돈
b.patch(S + "/Text_ItemName", Object.assign({ pos: [0, -55], rect_size: [700, 44] }, TC));
b.patch(S + "/Text_StarGauge", Object.assign({ pos: [0, -120], rect_size: [700, 50] }, TC));
b.patch(S + "/StarForceLevel", Object.assign({ pos: [0, -185], rect_size: [700, 55] }, TC));
b.write(UI, { strict: false });
console.log("star mockup pass2 (top stack) done");
