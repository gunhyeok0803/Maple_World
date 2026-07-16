// panelColl(승급창 컬렉션 탭) 안에 목업 컬렉션(지역 레일 + 3x3 슬롯) 구성.
// 셀 = 인벤 CellTemplate와 동일 치수(100x100, Icon 64, QBadge 50x26, Count 54x22) + Button + UIEquipmentSlotWidget.
// 옛 표시 잔재 제거(등록 컨트롤 Btn_Action/Card_Info 등은 보존).
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const R_SLOT = "aa931a755e5949699233b817029a3e36"; // Core/Slot 회색(첫 칸)
const BASE = "PromoteRoot/Panel_Coll";
const ABS = "/ui/PromoteGroup/PromoteRoot/Panel_Coll";
const GOLD = "#f0d98a";
const REGIONS = ["암허스트","헤네시스","엘리니아","페리온","커닝시티"];

const b = UIBuilder.read("ui/PromoteGroup.ui");

// 옛 컬렉션 표시 잔재 제거(등급열 헤더/북슬롯/북보너스 등). 등록 컨트롤/카드는 보존.
const cruft = ["Text_ColG1","Text_ColG2","Text_ColG3","Text_ColG4","Card_Book","Img_BookSlot","Icon","Text_BookBonus","Text_BookHint","Text_RateColl"];
for (const n of cruft) { if (b.find(`${ABS}/${n}`)) b.remove(`${BASE}/${n}`); }

// 지역 레일(좌측 세로 5)
for (let i = 0; i < REGIONS.length; i++) {
  const y = 180 - i * 60, active = i === 0;
  b.button(`${BASE}/Btn_Region_${i + 1}`, REGIONS[i], { anchor: "middle-center", pos: [-540, y], rect_size: [156, 48], font_size: 16, bold: active, color: active ? GOLD : "#9aa5bd", bg_color: active ? { r: 0.24, g: 0.2, b: 0.09, a: 1 } : { r: 0.11, g: 0.13, b: 0.19, a: 0.9 }, image_ruid: R_SLOT });
}
// 헤더
b.text(`${BASE}/Coll_RegionName`, "암허스트", { anchor: "middle-center", pos: [-250, 240], rect_size: [280, 32], size: 20, bold: true, color: GOLD, alignment: 3 });
b.text(`${BASE}/Coll_Progress`, "등록 0 / 9", { anchor: "middle-center", pos: [-60, 240], rect_size: [180, 26], size: 14, color: "#c8d2e6", alignment: 5 });

// 3x3 슬롯 — 인벤 CellTemplate 동일 치수
const COLX = [-340, -215, -90], ROWY = [150, 20, -110];
for (let i = 0; i < 9; i++) {
  const cell = `${BASE}/CollSlot_${i + 1}`;
  b.sprite(cell, { anchor: "middle-center", pos: [COLX[i % 3], ROWY[Math.floor(i / 3)]], rect_size: [100, 100], image_ruid: R_SLOT, color: { r: 1, g: 1, b: 1, a: 1 }, raycast: true });
  b.addComponent(cell, "MOD.Core.ButtonComponent");
  b.addComponent(cell, "script.UIEquipmentSlotWidget");
  b.sprite(`${cell}/Icon`, { anchor: "middle-center", pos: [0, 0], rect_size: [64, 64], image_ruid: R_SLOT, enable: false });
  b.text(`${cell}/QBadge`, "", { anchor: "middle-center", pos: [-24, 30], rect_size: [50, 26], size: 12, bold: true, color: "#eef2f8", alignment: 4, enable: false });
  b.text(`${cell}/Count`, "", { anchor: "middle-center", pos: [24, -30], rect_size: [54, 22], size: 12, bold: true, color: "#f0e6c6", alignment: 5, enable: false });
}
b.text(`${BASE}/Coll_TodoHint`, "컬렉션 효과: 기획 확정 후 적용 (TODO)", { anchor: "middle-center", pos: [-250, -190], rect_size: [520, 24], size: 12, color: "#6b7690", alignment: 3 });

b.write("ui/PromoteGroup.ui", { strict: false });
console.log("panelColl mockup built. entities:", b.listEntities().length);
