// Add register popup (slot-click) to CollectionGroup.ui. Scroll list of candidate owned items.
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");

const R_DARKPANEL = "6e8e561a4582462eaad762cb11d1f835";
const R_SLOT      = "aa931a755e5949699233b817029a3e36";
const R_XBTN      = "07096261a9944312b01dee501fed7599";
const NAVY  = { r: 0.055, g: 0.07, b: 0.11, a: 0.99 };
const GOLD  = "#f0d98a";

const b = UIBuilder.read("ui/CollectionGroup.ui");

// hidden container (controller toggles Enable) — stretch so children use screen-center coords
b.empty("RegPopup", { anchor: "stretch", pos: [0, 0], enable: false });
b.sprite("RegPopup/RegDim", { anchor: "stretch", pos: [0, 0], color: { r: 0.02, g: 0.03, b: 0.05, a: 0.62 }, raycast: true, image_ruid: R_DARKPANEL });
b.sprite("RegPopup/RegPanel", { anchor: "middle-center", pos: [0, 0], rect_size: [720, 470], color: NAVY, image_ruid: R_DARKPANEL });
b.text("RegPopup/RegTitle", "컬렉션 등록", { anchor: "middle-center", pos: [-250, 190], rect_size: [220, 40], size: 20, bold: true, color: GOLD, alignment: 3 });
b.text("RegPopup/RegSub", "암허스트 · 부위", { anchor: "middle-center", pos: [-20, 190], rect_size: [340, 34], size: 14, color: "#8f9bb3", alignment: 3 });
b.button("RegPopup/Btn_RegClose", "", { anchor: "middle-center", pos: [330, 192], rect_size: [40, 40], image_ruid: R_XBTN, bg_color: { r: 0.11, g: 0.13, b: 0.2, a: 1 } });
b.text("RegPopup/RegLabel", "등록 가능한 보유 장비", { anchor: "middle-center", pos: [-230, 138], rect_size: [400, 26], size: 13, color: "#7f8aa3", alignment: 3 });

// scrollable candidate list (fixed row pool; controller fills/toggles rows)
b.scrollLayout("RegPopup/RegList", {
  layout_type: 1, spacing: 10, use_scroll: true, v_scroll_dir: 2,
  padding: [8, 8, 8, 8], cell_size: [640, 62],
  anchor: "middle-center", pos: [0, -30], rect_size: [660, 300],
});
const POOL = 8;
for (let i = 1; i <= POOL; i++) {
  const row = `RegPopup/RegList/Row_${i}`;
  b.sprite(row, { rect_size: [640, 62], color: { r: 0.09, g: 0.12, b: 0.18, a: 0.95 }, image_ruid: R_DARKPANEL, enable: false });
  b.sprite(`${row}/Icon`, { anchor: "middle-left", pos: [16, 0], rect_size: [46, 46], color: { r: 1, g: 1, b: 1, a: 1 }, image_ruid: R_SLOT });
  b.text(`${row}/Name`, "", { anchor: "middle-left", pos: [74, 12], rect_size: [340, 24], size: 15, bold: true, color: "#f0e6c6", alignment: 3 });
  b.text(`${row}/Chip`, "", { anchor: "middle-left", pos: [300, 12], rect_size: [80, 20], size: 10, bold: true, color: "#ffffff", alignment: 4 });
  b.text(`${row}/Sub`, "", { anchor: "middle-left", pos: [74, -13], rect_size: [340, 20], size: 12, color: "#8f9bb3", alignment: 3 });
  b.button(`${row}/BtnReg`, "등록", { anchor: "middle-right", pos: [-14, 0], rect_size: [96, 40], font_size: 14, bold: true, bg_color: { r: 0.23, g: 0.39, b: 0.7, a: 1 } });
}
// empty state text (no owned candidates)
b.text("RegPopup/RegEmpty", "등록 가능한 보유 장비가 없습니다.", { anchor: "middle-center", pos: [0, -30], rect_size: [500, 30], size: 15, color: "#6b7690", alignment: 4, enable: false });

b.write("ui/CollectionGroup.ui");
console.log("RegPopup added. total entities:", b.listEntities().length);
