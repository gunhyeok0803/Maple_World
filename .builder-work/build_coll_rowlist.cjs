// 컬렉션 우측: 3열 아이콘 그리드 → "고정 등록 패널 + 정렬 행목록(스크롤)"로 재구성.
// 행 = 아이콘(공통 위젯) + 이름 + 보유/필요/등록가능 + [등록]. 아이템등급→잠재등급 순 정렬은 .mlua에서.
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const R_SLOT = "aa931a755e5949699233b817029a3e36";
const R_ROW = "6e8e561a4582462eaad762cb11d1f835";
const GOLD = "#f0d98a";
const P = "PromoteRoot/Panel_Coll";
const ABSP = "/ui/PromoteGroup/PromoteRoot/Panel_Coll";
const RX = 250;          // 우측 영역 중심 x
const PW = 560;          // 우측 패널 폭

const b = UIBuilder.read("ui/PromoteGroup.ui");

// 기존 3열 그리드/템플릿 제거(재구성)
if (b.find(`${ABSP}/RegGrid`)) b.remove(`${P}/RegGrid`);
if (b.find(`${ABSP}/RegCellTpl`)) b.remove(`${P}/RegCellTpl`);

// 제목 + 부제
b.patch(`${P}/RegHdr`, { pos: [RX, 236], rect_size: [PW, 30], size: 18, bold: true, color: GOLD, alignment: 4 });
b.text(`${P}/RegSub`, "슬롯을 선택하세요", { anchor: "middle-center", pos: [RX, 206], rect_size: [PW, 24], size: 13, color: "#8f9bb3", alignment: 4 });
b.patch(`${P}/RegPrompt`, { pos: [RX, 0], rect_size: [PW, 28] });
b.patch(`${P}/RegEmpty`, { pos: [RX, 0], rect_size: [PW, 28] });

// 행 템플릿(RegCellTpl) — GridView 1열 셀. 아이콘(공통 위젯)+이름+보유/필요/등록가능+[등록]. 숨김.
const tpl = `${P}/RegCellTpl`;
b.sprite(tpl, { anchor: "middle-center", pos: [-600, -320], rect_size: [PW - 20, 66], image_ruid: R_ROW, color: { r: 0.09, g: 0.12, b: 0.18, a: 0.95 }, raycast: true, enable: false });
// 아이콘 셀(공통 UIEquipmentSlotWidget) — 슬롯색=잠재 / QBadge=아이템등급 텍스트
const ic = `${tpl}/IconCell`;
b.sprite(ic, { anchor: "middle-left", pos: [40, 0], rect_size: [52, 52], image_ruid: R_SLOT, color: { r: 1, g: 1, b: 1, a: 1 } });
b.addComponent(ic, "script.UIEquipmentSlotWidget");
b.sprite(`${ic}/Icon`, { anchor: "middle-center", pos: [0, 0], rect_size: [40, 40], image_ruid: R_SLOT, enable: false });
b.text(`${ic}/QBadge`, "", { anchor: "middle-center", pos: [-10, 14], rect_size: [40, 16], size: 9, bold: true, color: "#eef2f8", alignment: 4, enable: false });
b.text(`${ic}/Count`, "", { anchor: "middle-center", pos: [12, -14], rect_size: [40, 14], size: 9, color: "#f0e6c6", alignment: 5, enable: false });
// 이름 / 보유·필요·등록가능
b.text(`${tpl}/Name`, "", { anchor: "middle-left", pos: [82, 12], rect_size: [300, 24], size: 15, bold: true, color: "#f0e6c6", alignment: 3 });
b.text(`${tpl}/Sub`, "", { anchor: "middle-left", pos: [82, -13], rect_size: [340, 20], size: 12, color: "#8f9bb3", alignment: 3 });
// 등록 버튼(우측)
b.button(`${tpl}/BtnReg`, "등록", { anchor: "middle-right", pos: [-14, 0], rect_size: [92, 40], font_size: 14, bold: true, bg_color: { r: 0.23, g: 0.39, b: 0.7, a: 1 } });

// 행목록 GridView(1열, 세로 스크롤, 얇은 스크롤바)
b.gridView(`${P}/RegGrid`, {
  total_count: 0, cell_size: [PW - 20, 66], fixed_count: 1, fixed_type: 0,
  spacing: [0, 10], padding: [6, 6, 6, 6], use_scroll: true,
  scroll_bar_visible: 1, scroll_bar_thickness: 5.0,
  anchor: "middle-center", pos: [RX, -18], rect_size: [PW, 384],
});

b.write("ui/PromoteGroup.ui", { strict: false });
console.log("row-list panel built. entities:", b.listEntities().length);
