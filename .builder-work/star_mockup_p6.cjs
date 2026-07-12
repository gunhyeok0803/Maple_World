const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const S = "UIR_SimpleFantasy_Sample_StarForce/Panel";
const TC = { anchor: "top-center", pivot: [0.5, 0.5] };
const MC = { anchor: "middle-center", pivot: [0.5, 0.5] };

// #2 이름은 중앙 패널에 있으니 상단에선 숨김(레퍼런스 동일)
b.patch(S + "/Text_ItemName", { enable: false });
// 상단 스택 재배치
b.patch(S + "/Text_StarGauge", Object.assign({ pos: [0, -75], rect_size: [700, 50] }, TC));
b.patch(S + "/StarForceLevel", Object.assign({ pos: [0, -160], rect_size: [700, 54] }, TC));
b.patch(S + "/Layout_Prob", Object.assign({ pos: [0, -285], rect_size: [740, 120] }, TC));
b.patch(S + "/Layout_Item", Object.assign({ pos: [0, -440], rect_size: [700, 150] }, TC));

// #1 각 열: 라벨(위) + 값(아래) 세로 배치
for (const col of ["Success", "Keep", "Decrease", "Destroy"]) {
  b.patch(S + "/Layout_Prob/" + col + "/PrecentTitle", Object.assign({ pos: [0, 30], rect_size: [160, 30] }, MC));
  b.patch(S + "/Layout_Prob/" + col + "/PercentBG", Object.assign({ pos: [0, -20], rect_size: [150, 44] }, MC));
}
b.write(UI, { strict: false });
console.log("star mockup pass6 (labels top/value bottom + hide name + spacing) done");
