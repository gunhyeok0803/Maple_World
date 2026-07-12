const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const S = "UIR_SimpleFantasy_Sample_StarForce/Panel";
const TC = { anchor: "top-center", pivot: [0.5, 0.5] };
const MC = { anchor: "middle-center", pivot: [0.5, 0.5] };

// 상단 스택(증폭 블록 제거로 여유 확보)
b.patch(S + "/Text_ItemName", Object.assign({ pos: [0, -50], rect_size: [700, 40] }, TC));
b.patch(S + "/Text_StarGauge", Object.assign({ pos: [0, -110], rect_size: [700, 48] }, TC));
b.patch(S + "/StarForceLevel", Object.assign({ pos: [0, -180], rect_size: [700, 54] }, TC));
// 증폭 스탯 블록 제거(중앙 패널 초록 + 로 대체)
b.patch(S + "/Text_Preview", { enable: false });

// 확률 4열(가로) — ScrollLayoutGroup 제거 후 수동 배치
if (b.hasComponent(S + "/Layout_Prob", "MOD.Core.ScrollLayoutGroupComponent")) {
  b.removeComponent(S + "/Layout_Prob", "MOD.Core.ScrollLayoutGroupComponent");
}
b.patch(S + "/Layout_Prob", Object.assign({ pos: [0, -300], rect_size: [740, 120] }, TC));
const cols = [["Success", -278], ["Keep", -93], ["Decrease", 93], ["Destroy", 278]];
for (const [nm, x] of cols) {
  b.patch(S + "/Layout_Prob/" + nm, Object.assign({ pos: [x, 0], rect_size: [175, 110] }, MC));
}

// 복구하기/파괴흔적 → 확률 아래로
b.patch(S + "/Layout_Item", Object.assign({ pos: [0, -450], rect_size: [700, 170] }, TC));

b.write(UI, { strict: false });
console.log("star mockup pass4 (4-col prob + remove preview) done");
