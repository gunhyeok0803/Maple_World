// panelColl 우측: 고정행 제거 → GridView(3열) + 공통 셀 템플릿(RegCellTpl). 얇은 스크롤바.
// 셀 = UIEquipmentSlotWidget(슬롯색=잠재등급 / QBadge=품질). 클릭=등록. OnRefresh/ItemEntity는 .mlua에서 배선.
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const R_DARK = "6e8e561a4582462eaad762cb11d1f835";
const R_SLOT = "aa931a755e5949699233b817029a3e36";
const GOLD = "#f0d98a";
const P = "PromoteRoot/Panel_Coll";
const ABSP = "/ui/PromoteGroup/PromoteRoot/Panel_Coll";
const RX = 250;

const b = UIBuilder.read("ui/PromoteGroup.ui");

// 기존 고정 인라인 행 제거(RegRow_1..12)
for (let g = 1; g <= 12; g++) { if (b.find(`${ABSP}/RegRow_${g}`)) b.remove(`${P}/RegRow_${g}`); }
if (b.find(`${ABSP}/RegScroll`)) b.remove(`${P}/RegScroll`);

// 헤더 / 프롬프트 / 빈 상태
b.patch(`${P}/RegHdr`, { pos: [RX, 218] });
b.patch(`${P}/RegPrompt`, { pos: [RX, 0] });
b.patch(`${P}/RegEmpty`, { pos: [RX, 0] });

// 공통 셀 템플릿(GridView ItemEntity) — 인벤 CellTemplate와 동일 구성. 숨김.
const tpl = `${P}/RegCellTpl`;
b.sprite(tpl, { anchor: "middle-center", pos: [-560, -300], rect_size: [100, 100], image_ruid: R_SLOT, color: { r: 1, g: 1, b: 1, a: 1 }, raycast: true, enable: false });
b.addComponent(tpl, "MOD.Core.ButtonComponent");
b.addComponent(tpl, "script.UIEquipmentSlotWidget");
b.sprite(`${tpl}/Icon`, { anchor: "middle-center", pos: [0, 0], rect_size: [64, 64], image_ruid: R_SLOT, enable: false });
b.text(`${tpl}/QBadge`, "", { anchor: "middle-center", pos: [-24, 30], rect_size: [50, 24], size: 12, bold: true, color: "#eef2f8", alignment: 4, enable: false });
b.text(`${tpl}/Count`, "", { anchor: "middle-center", pos: [24, -30], rect_size: [54, 22], size: 12, bold: true, color: "#f0e6c6", alignment: 5, enable: false });

// GridView(3열, 셀 100, 얇은 스크롤바)
b.gridView(`${P}/RegGrid`, {
  total_count: 0, cell_size: [100, 100], fixed_count: 3, fixed_type: 0,
  spacing: [14, 14], padding: [6, 6, 6, 6], use_scroll: true,
  scroll_bar_visible: 1, scroll_bar_thickness: 5.0,
  anchor: "middle-center", pos: [RX, -18], rect_size: [372, 384],
});

b.write("ui/PromoteGroup.ui", { strict: false });
console.log("RegGrid built. entities:", b.listEntities().length);
