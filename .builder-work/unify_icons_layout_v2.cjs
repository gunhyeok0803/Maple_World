// ① 아이콘 통일: 컬렉션 도감/후보행 배지·수량을 인벤 스타일(코너 고정)로 교정.
//    인벤 기준 — QBadge: top-left(4,-4) 50×26 / Count: bottom-right(-8,6).
// ② 레이아웃 v2: 콘텐츠 확장(도감 슬롯 110)·세로 중앙 정렬로 여백 축소.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const R = "PromoteRoot/Panel_Coll/";
const b = UIBuilder.read("ui/PromoteGroup.ui");

// ── ① 도감 슬롯 9개: 배지/수량 코너 고정(인벤 동일값) ──
for (let i = 1; i <= 9; i++) {
  const c = R + "CollSlot_" + i;
  b.patch(c + "/QBadge", { anchor: "top-left", pos: [4, -4], rect_size: [50, 26] });
  b.patch(c + "/Count", { anchor: "bottom-right", pos: [-8, 6], rect_size: [54, 22] });
}
// 후보행 IconCell(56 셀 → 인벤 비율 축소판)
b.patch(R + "RegCellTpl/IconCell/QBadge", { anchor: "top-left", pos: [2, -2], rect_size: [40, 20] });
b.patch(R + "RegCellTpl/IconCell/Count", { anchor: "bottom-right", pos: [-4, 4], rect_size: [36, 16] });

// ── ② 레이아웃 v2: 도감 110px 슬롯 + 세로 중앙 정렬 ──
const cols = [-390, -265, -140];   // 간격 125
const rows = [180, 55, -70];
for (let i = 1; i <= 9; i++) {
  const c = (i - 1) % 3, r = Math.floor((i - 1) / 3);
  b.patch(R + "CollSlot_" + i, { pos: [cols[c], rows[r]], rect_size: [110, 110] });
}
b.patch(R + "Coll_RegionName", { pos: [-390, 260] });
b.patch(R + "Coll_Progress", { pos: [-150, 260] });
b.patch(R + "Coll_Reward", { pos: [-265, -165] });
// 지역 버튼 세로 중앙 정렬(간격 62)
for (let i = 1; i <= 5; i++) {
  b.patch(R + "Btn_Region_" + i, { pos: [-560, 180 - (i - 1) * 62] });
}
// 우측 리스트 풀하이트
b.patch(R + "RegHdr", { pos: [285, 260] });
b.patch(R + "RegSub", { pos: [285, 232] });
b.patch(R + "RegPrompt", { pos: [285, 30] });
b.patch(R + "RegEmpty", { pos: [285, 30] });
b.patch(R + "RegGrid", { pos: [285, -50], rect_size: [540, 550] });

b.write("ui/PromoteGroup.ui");
console.log("[V2] icons unified + layout expanded");
