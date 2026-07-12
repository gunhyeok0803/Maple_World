const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const S = "UIR_SimpleFantasy_Sample_StarForce/Panel";
const TC = { anchor: "top-center", pivot: [0.5, 0.5] };
// 콘텐츠 전체 아래로(별이 탭에 안 붙게 + 세로 분배 균일)
let x = -300;
for (let i = 1; i <= 20; i++) {
  b.patch(S + "/Star_" + i, Object.assign({ pos: [x, -150] }, TC));
  x += 29; if (i % 5 === 0) x += 16;
}
b.patch(S + "/StarForceLevel", Object.assign({ pos: [0, -225], rect_size: [700, 54] }, TC));
b.patch(S + "/Layout_Prob", Object.assign({ pos: [0, -350], rect_size: [740, 120] }, TC));
b.patch(S + "/Layout_Item", Object.assign({ pos: [0, -500], rect_size: [700, 120] }, TC));
b.write(UI, { strict: false });
console.log("star mockup pass8 (shift content down) done");
