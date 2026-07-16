// 승급창(PromoteGroup) 안에 컬렉션 등록 팝업(등록 가능한 보유 장비, 인벤 형식 후보) 오버레이 추가.
// 컬렉션 슬롯 클릭 시 열림. 우측 옛 등록 컨트롤은 .mlua RefreshBook에서 숨김.
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const R_DARK = "6e8e561a4582462eaad762cb11d1f835";
const R_SLOT = "aa931a755e5949699233b817029a3e36";
const R_X = "07096261a9944312b01dee501fed7599";
const GOLD = "#f0d98a";
const BASE = "PromoteRoot/RegPopup";

const b = UIBuilder.read("ui/PromoteGroup.ui");

// 오버레이 컨테이너(숨김, 컨트롤러가 토글)
b.empty(BASE, { anchor: "stretch", pos: [0, 0], enable: false });
b.sprite(`${BASE}/RegDim`, { anchor: "stretch", pos: [0, 0], color: { r: 0.02, g: 0.03, b: 0.05, a: 0.62 }, raycast: true, image_ruid: R_DARK });
b.sprite(`${BASE}/RegPanel`, { anchor: "middle-center", pos: [0, 0], rect_size: [720, 470], color: { r: 0.055, g: 0.07, b: 0.115, a: 0.99 }, image_ruid: R_DARK });
b.text(`${BASE}/RegTitle`, "컬렉션 등록", { anchor: "middle-center", pos: [-250, 190], rect_size: [220, 40], size: 20, bold: true, color: GOLD, alignment: 3 });
b.text(`${BASE}/RegSub`, "", { anchor: "middle-center", pos: [30, 190], rect_size: [440, 34], size: 14, color: "#8f9bb3", alignment: 3 });
b.button(`${BASE}/Btn_RegClose`, "", { anchor: "middle-center", pos: [330, 192], rect_size: [40, 40], image_ruid: R_X, bg_color: { r: 0.11, g: 0.13, b: 0.2, a: 1 } });
b.text(`${BASE}/RegLabel`, "보유 ★0 순정 · 등급별", { anchor: "middle-center", pos: [-230, 138], rect_size: [420, 26], size: 13, color: "#7f8aa3", alignment: 3 });
b.scrollLayout(`${BASE}/RegList`, { layout_type: 1, spacing: 10, use_scroll: true, v_scroll_dir: 2, padding: [8, 8, 8, 8], cell_size: [640, 66], anchor: "middle-center", pos: [0, -30], rect_size: [660, 300] });
for (let g = 1; g <= 8; g++) {
  const row = `${BASE}/RegList/Row_${g}`;
  b.sprite(row, { rect_size: [640, 66], color: { r: 0.09, g: 0.12, b: 0.18, a: 0.95 }, image_ruid: R_DARK, enable: false });
  // 아이콘 셀 = 인벤 동일 위젯(클릭 없음: ownerWindow nil)
  const ic = `${row}/IconCell`;
  b.sprite(ic, { anchor: "middle-left", pos: [34, 0], rect_size: [52, 52], image_ruid: R_SLOT, color: { r: 1, g: 1, b: 1, a: 1 } });
  b.addComponent(ic, "script.UIEquipmentSlotWidget");
  b.sprite(`${ic}/Icon`, { anchor: "middle-center", pos: [0, 0], rect_size: [40, 40], image_ruid: R_SLOT, enable: false });
  b.text(`${ic}/QBadge`, "", { anchor: "middle-center", pos: [-10, 14], rect_size: [40, 18], size: 9, bold: true, color: "#eef2f8", alignment: 4, enable: false });
  b.text(`${ic}/Count`, "", { anchor: "middle-center", pos: [12, -14], rect_size: [40, 16], size: 9, color: "#f0e6c6", alignment: 5, enable: false });
  b.text(`${row}/Name`, "", { anchor: "middle-left", pos: [76, 13], rect_size: [340, 24], size: 15, bold: true, color: "#f0e6c6", alignment: 3 });
  b.text(`${row}/Sub`, "", { anchor: "middle-left", pos: [76, -14], rect_size: [400, 20], size: 12, color: "#8f9bb3", alignment: 3 });
  b.button(`${row}/BtnReg`, "등록", { anchor: "middle-right", pos: [-14, 0], rect_size: [96, 40], font_size: 14, bold: true, bg_color: { r: 0.23, g: 0.39, b: 0.7, a: 1 } });
}
b.text(`${BASE}/RegEmpty`, "등록 가능한 보유 장비가 없습니다.", { anchor: "middle-center", pos: [0, -30], rect_size: [500, 30], size: 15, color: "#6b7690", alignment: 4, enable: false });

b.write("ui/PromoteGroup.ui", { strict: false });
console.log("PromoteGroup RegPopup added. entities:", b.listEntities().length);
