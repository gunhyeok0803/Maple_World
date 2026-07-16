// Rebuild CollectionGroup.ui — slots & row-icons reuse the inventory cell (UIEquipmentSlotWidget):
// each cell = sprite(slot bg=잠재색) + Icon + QBadge(품질 plain) + Count, driven by the shared widget.
// No duplicate custom text. Controller drives via widget:SetData.
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");

const R_DARK = "6e8e561a4582462eaad762cb11d1f835";
const R_SLOT = "aa931a755e5949699233b817029a3e36";
const R_X    = "07096261a9944312b01dee501fed7599";
const R_DIV  = "66b6a9dde07b4c3abb90c16c0feeed3f";
const NAVY = { r: 0.055, g: 0.07, b: 0.11, a: 0.97 };
const GOLD = "#f0d98a";
const REGIONS = ["암허스트","헤네시스","엘리니아","페리온","커닝시티"];

const b = new UIBuilder("CollectionGroup", 20, true);

// inventory-format icon cell (same children as CellTemplate: Icon/QBadge/Count + widget)
function cell(path, cs, ic, withBtn) {
  b.sprite(path, { rect_size: cs, image_ruid: R_SLOT, color: { r: 1, g: 1, b: 1, a: 1 }, raycast: !!withBtn });
  if (withBtn) b.addComponent(path, "MOD.Core.ButtonComponent");
  b.addComponent(path, "script.UIEquipmentSlotWidget");
  b.sprite(path + "/Icon", { anchor: "middle-center", pos: [0, 0], rect_size: ic, image_ruid: R_SLOT });
  b.text(path + "/QBadge", "", { anchor: "middle-center", pos: [-cs[0] / 2 + 24, cs[1] / 2 - 15], rect_size: [56, 24], size: 12, bold: true, color: "#eef2f8", alignment: 4 });
  b.text(path + "/Count", "", { anchor: "middle-center", pos: [cs[0] / 2 - 26, -cs[1] / 2 + 14], rect_size: [56, 22], size: 12, bold: true, color: "#f0e6c6", alignment: 5 });
}

b.script("Controller", "script.UICollectionPanel", { anchor: "stretch", pos: [0, 0], rect_size: [1920, 1080] });

// ===== Window =====
b.empty("Window", { anchor: "stretch", pos: [0, 0], enable: false });
b.sprite("Window/Dimmer", { anchor: "stretch", pos: [0, 0], color: { r: 0.02, g: 0.03, b: 0.05, a: 0.6 }, raycast: true, image_ruid: R_DARK });
b.sprite("Window/Panel_Bg", { anchor: "middle-center", pos: [0, 0], rect_size: [1180, 720], color: NAVY, image_ruid: R_DARK });
b.text("Window/Title", "컬렉션", { anchor: "middle-center", pos: [-470, 322], rect_size: [240, 46], size: 30, bold: true, color: GOLD, alignment: 3 });
b.text("Window/Subtitle", "지역 도감 · 장비를 반복 등록해 영구 능력치를 누적하세요", { anchor: "middle-center", pos: [-40, 322], rect_size: [620, 30], size: 16, color: "#8f9bb3", alignment: 3 });
b.button("Window/Btn_Close", "", { anchor: "middle-center", pos: [548, 322], rect_size: [44, 44], image_ruid: R_X, bg_color: { r: 0.11, g: 0.13, b: 0.2, a: 1 } });
b.sprite("Window/Divider_Top", { anchor: "middle-center", pos: [0, 292], rect_size: [1160, 3], color: { r: 0.78, g: 0.63, b: 0.29, a: 0.35 }, image_ruid: R_DIV });
b.sprite("Window/Rail_Bg", { anchor: "middle-center", pos: [-478, -28], rect_size: [214, 560], color: { r: 0.03, g: 0.045, b: 0.07, a: 0.6 }, image_ruid: R_DARK });
b.text("Window/Rail_Title", "지역", { anchor: "middle-center", pos: [-478, 232], rect_size: [180, 22], size: 13, color: "#7f8aa3", alignment: 3 });
for (let i = 0; i < 5; i++) {
  const y = 190 - i * 58, active = i === 0;
  b.button(`Window/Btn_Region_${i + 1}`, "", { anchor: "middle-center", pos: [-478, y], rect_size: [196, 50], image_ruid: R_SLOT, bg_color: active ? { r: 0.24, g: 0.2, b: 0.09, a: 1 } : { r: 0.11, g: 0.13, b: 0.19, a: 0.9 } });
  b.text(`Window/Btn_Region_${i + 1}/Name`, REGIONS[i], { anchor: "middle-center", pos: [0, 0], rect_size: [170, 40], size: 15, bold: active, color: active ? GOLD : "#9aa5bd", alignment: 4 });
}
b.text("Window/RegionName", "암허스트", { anchor: "middle-center", pos: [-150, 250], rect_size: [340, 34], size: 22, bold: true, color: GOLD, alignment: 3 });
b.text("Window/Progress", "등록 부위 0 / 9", { anchor: "middle-center", pos: [470, 250], rect_size: [240, 30], size: 15, color: "#c8d2e6", alignment: 5 });

const COLX = [-150, 90, 330], ROWY = [140, 0, -140];
for (let i = 0; i < 9; i++) {
  cell(`Window/Slot_${i + 1}`, [124, 124], [76, 76], true);
  // position the cell
  b.patch(`Window/Slot_${i + 1}`, { pos: [COLX[i % 3], ROWY[Math.floor(i / 3)]] });
}
b.sprite("Window/BonusBar", { anchor: "middle-center", pos: [120, -272], rect_size: [830, 50], color: { r: 0.08, g: 0.1, b: 0.16, a: 0.85 }, image_ruid: R_DARK });
b.text("Window/Bonus_Lbl", "컬렉션 효과", { anchor: "middle-center", pos: [-215, -272], rect_size: [120, 40], size: 13, color: "#8f9bb3", alignment: 3 });
b.text("Window/Bonus_Atk", "공격력 +0", { anchor: "middle-center", pos: [-40, -272], rect_size: [150, 40], size: 15, color: "#dfe6f2", alignment: 3 });
b.text("Window/Bonus_Def", "방어력 +0", { anchor: "middle-center", pos: [130, -272], rect_size: [150, 40], size: 15, color: "#dfe6f2", alignment: 3 });
b.text("Window/Bonus_Hp", "HP +0", { anchor: "middle-center", pos: [300, -272], rect_size: [150, 40], size: 15, color: "#dfe6f2", alignment: 3 });
b.text("Window/Hint", "※ 슬롯을 눌러 보유 장비를 등급별 수량만큼 등록(반복 가능). 등록 시 수량 소모, 영구 능력치 누적.", { anchor: "middle-center", pos: [120, -322], rect_size: [830, 24], size: 12, color: "#6b7690", alignment: 4 });

// ===== RegPopup =====
b.empty("RegPopup", { anchor: "stretch", pos: [0, 0], enable: false });
b.sprite("RegPopup/RegDim", { anchor: "stretch", pos: [0, 0], color: { r: 0.02, g: 0.03, b: 0.05, a: 0.62 }, raycast: true, image_ruid: R_DARK });
b.sprite("RegPopup/RegPanel", { anchor: "middle-center", pos: [0, 0], rect_size: [720, 470], color: { r: 0.055, g: 0.07, b: 0.115, a: 0.99 }, image_ruid: R_DARK });
b.text("RegPopup/RegTitle", "컬렉션 등록", { anchor: "middle-center", pos: [-250, 190], rect_size: [220, 40], size: 20, bold: true, color: GOLD, alignment: 3 });
b.text("RegPopup/RegSub", "", { anchor: "middle-center", pos: [30, 190], rect_size: [440, 34], size: 14, color: "#8f9bb3", alignment: 3 });
b.button("RegPopup/Btn_RegClose", "", { anchor: "middle-center", pos: [330, 192], rect_size: [40, 40], image_ruid: R_X, bg_color: { r: 0.11, g: 0.13, b: 0.2, a: 1 } });
b.text("RegPopup/RegLabel", "보유 ★0 순정 · 등급별", { anchor: "middle-center", pos: [-230, 138], rect_size: [420, 26], size: 13, color: "#7f8aa3", alignment: 3 });
b.scrollLayout("RegPopup/RegList", { layout_type: 1, spacing: 10, use_scroll: true, v_scroll_dir: 2, padding: [8, 8, 8, 8], cell_size: [640, 66], anchor: "middle-center", pos: [0, -30], rect_size: [660, 300] });
for (let g = 1; g <= 8; g++) {
  const row = `RegPopup/RegList/Row_${g}`;
  b.sprite(row, { rect_size: [640, 66], color: { r: 0.09, g: 0.12, b: 0.18, a: 0.95 }, image_ruid: R_DARK, enable: false });
  cell(`${row}/IconCell`, [52, 52], [40, 40], false);
  b.patch(`${row}/IconCell`, { anchor: "middle-left", pos: [34, 0] });
  b.text(`${row}/Name`, "", { anchor: "middle-left", pos: [76, 13], rect_size: [340, 24], size: 15, bold: true, color: "#f0e6c6", alignment: 3 });
  b.text(`${row}/Sub`, "", { anchor: "middle-left", pos: [76, -14], rect_size: [400, 20], size: 12, color: "#8f9bb3", alignment: 3 });
  b.button(`${row}/BtnReg`, "등록", { anchor: "middle-right", pos: [-14, 0], rect_size: [96, 40], font_size: 14, bold: true, bg_color: { r: 0.23, g: 0.39, b: 0.7, a: 1 } });
}
b.text("RegPopup/RegEmpty", "등록 가능한 보유 장비가 없습니다.", { anchor: "middle-center", pos: [0, -30], rect_size: [500, 30], size: 15, color: "#6b7690", alignment: 4, enable: false });

b.write("ui/CollectionGroup.ui");
console.log("rebuilt with widget cells:", b.listEntities().length, "entities");
