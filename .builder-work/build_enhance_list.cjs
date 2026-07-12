const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);

const SLOT_BG = "aa931a755e5949699233b817029a3e36"; // 기본(무등급) 슬롯 — 런타임에 등급 RUID로 교체
const PANEL = "6e8e561a4582462eaad762cb11d1f835";
const DARK = { r: 0.09019608, g: 0.121568628, b: 0.1764706, a: 0.9 };
const P = "Panel_EquipList";

// 좌측 패널 텍스트 정리
b.patchComponent(P + "/Text_Title", "MOD.Core.TextComponent", { Text: "장착중인 장비" });
b.remove(P + "/Text_Hint");

// 셀 공통 구조 생성기(슬롯 스프라이트+버튼+위젯+Icon+Count)
function cell(path, opts) {
  b.sprite(path, Object.assign({ rect_size: [118, 118], image_ruid: SLOT_BG, raycast: true }, opts));
  b.addComponent(path, "MOD.Core.ButtonComponent");
  b.addComponent(path, "script.UIEquipmentSlotWidget");
  b.sprite(path + "/Icon", { anchor: "middle-center", pos: [0, 0], rect_size: [60, 60] });
  b.text(path + "/Count", "", { anchor: "bottom-right", pos: [-8, 6], rect_size: [60, 24], size: 16, color: "#FFFFFF", alignment: 8, enable: false });
}

// 착용 셀 4 (2열×2행) + 부위 라벨
const PARTS = ["무기", "모자", "신발", "반지1"];
const POS = [[-65, 330], [65, 330], [-65, 180], [65, 180]];
for (let i = 0; i < 4; i++) {
  const path = P + "/EquipCell_" + (i + 1);
  cell(path, { anchor: "middle-center", pos: POS[i] });
  b.text(path + "/PartLabel", PARTS[i], { anchor: "middle-center", pos: [0, -72], rect_size: [110, 22], size: 14, color: "#9AA4B2", alignment: 4 });
}

// 섹션 라벨 + 인벤 레전드리 그리드(재배치) + 셀 템플릿
b.text(P + "/Text_Section", "인벤토리 장비 (레전드리)", { anchor: "middle-center", pos: [0, 80], rect_size: [420, 30], size: 18, color: "#FFFFFF", alignment: 4 });
b.patch(P + "/Grid", { anchor: "middle-center", pos: [0, -250], rect_size: [420, 600] });
cell(P + "/CellTemplate", { anchor: "middle-center", pos: [0, 0], enable: false });

// 중앙 요약 패널
b.panel("Panel_Summary", { anchor: "middle-center", pos: [-333, -30], rect_size: [320, 962], enable: false });
b.sprite("Panel_Summary/Img_Bg", { anchor: "middle-center", pos: [0, 0], rect_size: [320, 962], image_ruid: PANEL, sprite_type: 1, raycast: true });
b.patchComponent("Panel_Summary/Img_Bg", "MOD.Core.SpriteGUIRendererComponent", { Color: DARK });
b.sprite("Panel_Summary/Img_ItemSlot", { anchor: "middle-center", pos: [0, 330], rect_size: [118, 118], image_ruid: SLOT_BG });
b.sprite("Panel_Summary/Img_ItemSlot/Icon", { anchor: "middle-center", pos: [0, 0], rect_size: [60, 60], enable: false });
b.text("Panel_Summary/Text_Name", "장비를 선택하세요", { anchor: "middle-center", pos: [0, 240], rect_size: [290, 40], size: 20, color: "#FFFFFF", alignment: 4 });
b.text("Panel_Summary/Text_Stats", "", { anchor: "middle-center", pos: [0, -60], rect_size: [260, 520], size: 16, color: "#E6EAF0", alignment: 0 });

b.write(UI, {
  strict: false,
  bind: {
    mlua: "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UI/UIEnhancePanel.mlua",
    props: { panelSummary: "Panel_Summary" },
  },
});
console.log("enhance list + summary assembled");
