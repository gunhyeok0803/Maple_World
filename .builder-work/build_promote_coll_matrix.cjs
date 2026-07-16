// Rework PromoteGroup 컬렉션 탭(Panel_Coll) → 부위(행) × 지역(열) 매트릭스.
// 각 셀 = 인벤/강화 동일 아이콘 셀(UIEquipmentSlotWidget). Core/Slot 재사용. 2탭(승급/컬렉션) 그대로.
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const R_SLOT = "aa931a755e5949699233b817029a3e36";
const PARTS = ["모자","상의","하의","장갑","신발","귀고리","망토","눈장식","무기"];
const REGIONS = ["암허스트","헤네시스","엘리니아","페리온","커닝시티"];
const BASE = "PromoteRoot/Panel_Coll";           // create/remove identifiers (group-root relative)
const ABS  = "/ui/PromoteGroup/PromoteRoot/Panel_Coll"; // find (absolute)

const b = UIBuilder.read("ui/PromoteGroup.ui");

// 기존 레벨×등급 그리드/부위탭 제거(Core/Slot은 새 셀에서 재사용)
for (let r = 1; r <= 3; r++) for (let g = 1; g <= 4; g++) { if (b.find(`${ABS}/BookCell_${r}_${g}`)) b.remove(`${BASE}/BookCell_${r}_${g}`); }
for (let i = 1; i <= 6; i++) { if (b.find(`${ABS}/PartTab_${i}`)) b.remove(`${BASE}/PartTab_${i}`); }

const X0 = -470, COLW = 150, Y0 = 250, ROWH = 56, CELL = 46;
for (let c = 0; c < REGIONS.length; c++) {
  b.text(`${BASE}/ColHdr_${c + 1}`, REGIONS[c], { anchor: "middle-center", pos: [X0 + 130 + c * COLW, Y0 + 30], rect_size: [COLW - 8, 26], size: 14, bold: c === 0, color: c === 0 ? "#f0d98a" : "#8f9bb3", alignment: 4 });
}
for (let r = 0; r < PARTS.length; r++) {
  const y = Y0 - r * ROWH;
  b.text(`${BASE}/RowHdr_${r + 1}`, PARTS[r], { anchor: "middle-center", pos: [X0, y], rect_size: [120, 30], size: 14, color: "#c2cbe0", alignment: 5 });
  for (let c = 0; c < REGIONS.length; c++) {
    const cell = `${BASE}/Cell_${r + 1}_${c + 1}`;
    const x = X0 + 130 + c * COLW;
    b.sprite(cell, { anchor: "middle-center", pos: [x, y], rect_size: [CELL + 6, CELL + 6], image_ruid: R_SLOT, color: { r: 1, g: 1, b: 1, a: 1 }, raycast: true });
    b.addComponent(cell, "MOD.Core.ButtonComponent");
    b.addComponent(cell, "script.UIEquipmentSlotWidget");
    b.sprite(`${cell}/Icon`, { anchor: "middle-center", pos: [0, 2], rect_size: [CELL - 6, CELL - 6], image_ruid: R_SLOT, enable: false });
    b.text(`${cell}/QBadge`, "", { anchor: "middle-center", pos: [-14, 16], rect_size: [34, 16], size: 9, bold: true, color: "#eef2f8", alignment: 4, enable: false });
    b.text(`${cell}/Count`, "", { anchor: "middle-center", pos: [14, -16], rect_size: [34, 14], size: 9, bold: true, color: "#f0e6c6", alignment: 5, enable: false });
  }
}
b.text(`${BASE}/CollHint`, "※ 셀을 눌러 보유 장비를 등록(반복). 등급은 인벤/강화와 동일하게 아이콘으로 구별. 효과 TODO(기획 수치 대기).", { anchor: "middle-center", pos: [-40, Y0 - 9 * ROWH - 6], rect_size: [900, 24], size: 12, color: "#6b7690", alignment: 4 });

b.write("ui/PromoteGroup.ui");
console.log("Panel_Coll matrix rebuilt. entities:", b.listEntities().length);
