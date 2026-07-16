// 컬렉션 우측 등록 후보 리스트(RegGrid+RegCellTpl) 구축 — 목업 구조.
// 행 = [IconCell(공통위젯: Icon/QBadge/Count)] [Name] [Sub] [BtnReg "등록"].
// IconCell 계열 컴포넌트는 동작 검증된 EnhanceGroup EquipCell_1에서 복사.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const SP = "MOD.Core.SpriteGUIRendererComponent";
const TG = "MOD.Core.TextGUIRendererComponent";
const TL = "MOD.Core.TextComponent";
const WGT = "script.UIEquipmentSlotWidget";
const FLAT = "9eee37f21d974889947d021f08bcda62"; // Tint_Square_R10 (리스킨과 동일 스킴 선반영)

const src = UIBuilder.read("ui/EnhanceGroup.ui");
const S = "Panel_EquipList/EquipCell_1";
const cSlotBg = src.getComponent(S, SP);
const cWidget = src.getComponent(S, WGT);
const cIcon   = src.getComponent(S + "/Icon", SP);
const cQb     = src.getComponent(S + "/QBadge", SP);
const cQbT    = src.getComponent(S + "/QBadge", TG);
const cCnt    = src.getComponent(S + "/Count", SP);
const cCntT   = src.getComponent(S + "/Count", TL);

const b = UIBuilder.read("ui/PromoteGroup.ui");
const P = "PromoteRoot/Panel_Coll/";

// ① RegGrid (가상화 리스트, 1열 세로)
b.gridView(P + "RegGrid", {
  total_count: 0, cell_size: [540, 66], fixed_count: 1, fixed_type: 0,
  spacing: [0, 10], use_scroll: true, scroll_bar_visible: 1, scroll_bar_thickness: 8,
  anchor: "middle-center", pos: [250, -65], rect_size: [560, 500],
});

// ② RegCellTpl (행 템플릿, enable=false — GridView가 복제)
b.sprite(P + "RegCellTpl", {
  anchor: "middle-center", pos: [250, -400], rect_size: [540, 66],
  image_ruid: FLAT, sprite_type: 1, color: { r: 0.97, g: 0.98, b: 0.99, a: 1 },
  enable: false,
});
// IconCell(공통 위젯 슬롯)
b.sprite(P + "RegCellTpl/IconCell", { anchor: "middle-center", pos: [-242, 0], rect_size: [56, 56] });
b.upsertComponent(P + "RegCellTpl/IconCell", SP, cSlotBg);
b.upsertComponent(P + "RegCellTpl/IconCell", WGT, cWidget);
b.sprite(P + "RegCellTpl/IconCell/Icon", { anchor: "middle-center", pos: [0, 0], rect_size: [36, 36] });
b.upsertComponent(P + "RegCellTpl/IconCell/Icon", SP, cIcon);
b.sprite(P + "RegCellTpl/IconCell/QBadge", { anchor: "middle-center", pos: [-14, 24], rect_size: [44, 20] });
b.upsertComponent(P + "RegCellTpl/IconCell/QBadge", SP, cQb);
b.upsertComponent(P + "RegCellTpl/IconCell/QBadge", TG, cQbT);
b.sprite(P + "RegCellTpl/IconCell/Count", { anchor: "middle-center", pos: [14, -22], rect_size: [40, 18] });
b.upsertComponent(P + "RegCellTpl/IconCell/Count", SP, cCnt);
b.upsertComponent(P + "RegCellTpl/IconCell/Count", TL, cCntT);
// 이름/설명(밝은 칩 위 어두운 글자 — 리스킨 스킴)
b.text(P + "RegCellTpl/Name", "", {
  size: 20, bold: true, color: "#3A4150", alignment: 3,
  anchor: "middle-center", pos: [-40, 14], rect_size: [340, 26],
});
b.text(P + "RegCellTpl/Sub", "", {
  size: 15, color: "#4B5563", alignment: 3,
  anchor: "middle-center", pos: [-10, -15], rect_size: [400, 22],
});
// [등록] 버튼(색은 코드가 파랑/회색으로 설정)
b.button(P + "RegCellTpl/BtnReg", "등록", {
  anchor: "middle-center", pos: [232, 0], rect_size: [72, 40], font_size: 20,
});

b.write("ui/PromoteGroup.ui");
console.log("[BUILD] RegGrid + RegCellTpl built.  grid=", b.getId(P + "RegGrid"), " tpl=", b.getId(P + "RegCellTpl"));
