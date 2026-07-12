const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const S = "UIR_SimpleFantasy_Sample_StarForce/Panel";
const TC = { anchor: "top-center", pivot: [0.5, 0.5] };
const P = S + "/Layout_Prob";
// 가로 레이아웃 그룹 재부착(성공|유지|하락|파괴 4열)
b.upsertComponent(P, "MOD.Core.ScrollLayoutGroupComponent", {
  "@type": "MOD.Core.ScrollLayoutGroupComponent",
  Type: 0,                       // Horizontal
  CellSize: { x: 172, y: 104 },
  Spacing: 12,
  ChildAlignment: 4,             // MiddleCenter
  UseScroll: false,
  Enable: true,
});
b.patch(P, Object.assign({ pos: [0, -300], rect_size: [740, 120] }, TC));
// 복구/흔적 확률 아래로
b.patch(S + "/Layout_Item", Object.assign({ pos: [0, -470], rect_size: [700, 150] }, TC));
b.write(UI, { strict: false });
console.log("star mockup pass5 (horizontal layout group) done");
