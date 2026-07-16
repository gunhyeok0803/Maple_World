// 컬렉션 컴팩트 v3: 상단 여백 축소 — 콘텐츠 블록 전체 위로 + 리스트 세로 확장.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const R = "PromoteRoot/Panel_Coll/";
const b = UIBuilder.read("ui/PromoteGroup.ui");

const cols = [-390, -265, -140];
const rows = [220, 95, -30];      // 40 위로
for (let i = 1; i <= 9; i++) {
  const c = (i - 1) % 3, r = Math.floor((i - 1) / 3);
  b.patch(R + "CollSlot_" + i, { pos: [cols[c], rows[r]] });
}
b.patch(R + "Coll_RegionName", { pos: [-390, 300] });
b.patch(R + "Coll_Progress", { pos: [-150, 300] });
b.patch(R + "Coll_Reward", { pos: [-265, -120] });
for (let i = 1; i <= 5; i++) {
  b.patch(R + "Btn_Region_" + i, { pos: [-560, 220 - (i - 1) * 62] });
}
b.patch(R + "RegHdr", { pos: [285, 300] });
b.patch(R + "RegSub", { pos: [285, 272] });
b.patch(R + "RegPrompt", { pos: [285, 60] });
b.patch(R + "RegEmpty", { pos: [285, 60] });
b.patch(R + "RegGrid", { pos: [285, -20], rect_size: [540, 580] });   // top 270, bottom -310

b.write("ui/PromoteGroup.ui");
console.log("[V3] content shifted up, list expanded");
