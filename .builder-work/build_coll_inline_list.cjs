// 모달 RegPopup 제거 → panelColl 우측 빈 영역에 "등록 가능한 보유 장비" 인라인 목록 배치.
// 좌=지역레일+슬롯 / 우=후보 목록(슬롯 클릭 시 채움). 승급 탭과 동일 좌/우 구조.
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const R_DARK = "6e8e561a4582462eaad762cb11d1f835";
const R_SLOT = "aa931a755e5949699233b817029a3e36";
const GOLD = "#f0d98a";
const P = "PromoteRoot/Panel_Coll";
const ABSP = "/ui/PromoteGroup/PromoteRoot/Panel_Coll";

const b = UIBuilder.read("ui/PromoteGroup.ui");

// 1) 모달 RegPopup 제거
if (b.find("/ui/PromoteGroup/PromoteRoot/RegPopup")) b.remove("PromoteRoot/RegPopup");

// 2) 우측 인라인 목록 (x ~ +230)
const RX = 240;
b.text(`${P}/RegHdr`, "등록 가능한 보유 장비", { anchor: "middle-center", pos: [RX, 210], rect_size: [460, 28], size: 16, bold: true, color: GOLD, alignment: 4 });
b.text(`${P}/RegPrompt`, "슬롯을 선택하세요", { anchor: "middle-center", pos: [RX, 0], rect_size: [460, 30], size: 15, color: "#8f9bb3", alignment: 4 });
b.text(`${P}/RegEmpty`, "등록 가능한 보유 장비가 없습니다.", { anchor: "middle-center", pos: [RX, 0], rect_size: [460, 30], size: 15, color: "#6b7690", alignment: 4, enable: false });
for (let g = 1; g <= 6; g++) {
  const row = `${P}/RegRow_${g}`;
  b.sprite(row, { anchor: "middle-center", pos: [RX, 150 - (g - 1) * 58], rect_size: [470, 52], color: { r: 0.09, g: 0.12, b: 0.18, a: 0.95 }, image_ruid: R_DARK, enable: false });
  const ic = `${row}/IconCell`;
  b.sprite(ic, { anchor: "middle-left", pos: [30, 0], rect_size: [44, 44], image_ruid: R_SLOT, color: { r: 1, g: 1, b: 1, a: 1 } });
  b.addComponent(ic, "script.UIEquipmentSlotWidget");
  b.sprite(`${ic}/Icon`, { anchor: "middle-center", pos: [0, 0], rect_size: [34, 34], image_ruid: R_SLOT, enable: false });
  b.text(`${ic}/QBadge`, "", { anchor: "middle-center", pos: [-8, 12], rect_size: [36, 16], size: 8, bold: true, color: "#eef2f8", alignment: 4, enable: false });
  b.text(`${ic}/Count`, "", { anchor: "middle-center", pos: [10, -12], rect_size: [36, 14], size: 8, color: "#f0e6c6", alignment: 5, enable: false });
  b.text(`${row}/Name`, "", { anchor: "middle-left", pos: [66, 11], rect_size: [230, 22], size: 13, bold: true, color: "#f0e6c6", alignment: 3 });
  b.text(`${row}/Sub`, "", { anchor: "middle-left", pos: [66, -12], rect_size: [260, 18], size: 11, color: "#8f9bb3", alignment: 3 });
  b.button(`${row}/BtnReg`, "등록", { anchor: "middle-right", pos: [-12, 0], rect_size: [78, 36], font_size: 13, bold: true, bg_color: { r: 0.23, g: 0.39, b: 0.7, a: 1 } });
}

b.write("ui/PromoteGroup.ui", { strict: false });
console.log("inline reg list built. entities:", b.listEntities().length);
