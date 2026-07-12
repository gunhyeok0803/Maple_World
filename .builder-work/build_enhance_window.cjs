const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);

const PANEL = "6e8e561a4582462eaad762cb11d1f835";
const CLOSE = "07096261a9944312b01dee501fed7599";
const DARK = { r: 0.09019608, g: 0.121568628, b: 0.1764706, a: 0.95 };
const CARD = { r: 0.13, g: 0.17, b: 0.23, a: 0.9 };

// ── 단일 창 프레임(레퍼런스: 타이틀 바 + X + 3열)
b.panel("Window", { anchor: "middle-center", pos: [0, -10], rect_size: [1760, 1010], enable: false });
b.sprite("Window/Img_Bg", { anchor: "middle-center", pos: [0, 0], rect_size: [1760, 1010], image_ruid: PANEL, sprite_type: 1, raycast: true });
b.patchComponent("Window/Img_Bg", "MOD.Core.SpriteGUIRendererComponent", { Color: DARK });
b.text("Window/Text_WinTitle", "장비 슬롯 강화", { anchor: "top-center", pos: [0, -30], rect_size: [400, 40], size: 26, color: "#FFFFFF", alignment: 4 });
b.button("Window/Btn_CloseMain", "", { anchor: "top-right", pos: [-20, -16], rect_size: [64, 64], image_ruid: CLOSE });

// ── 좌열: 장착중인 장비(창 내부 카드 톤)
b.patch("Panel_EquipList", { anchor: "middle-center", pos: [-640, -40], rect_size: [420, 880] });
b.patch("Panel_EquipList/Img_Bg", { rect_size: [420, 880] });
b.patchComponent("Panel_EquipList/Img_Bg", "MOD.Core.SpriteGUIRendererComponent", { Color: CARD });
b.patch("Panel_EquipList/EquipCell_1", { pos: [-65, 300] });
b.patch("Panel_EquipList/EquipCell_2", { pos: [65, 300] });
b.patch("Panel_EquipList/EquipCell_3", { pos: [-65, 170] });
b.patch("Panel_EquipList/EquipCell_4", { pos: [65, 170] });
b.patch("Panel_EquipList/Text_Section", { pos: [0, 60] });
b.patch("Panel_EquipList/Grid", { pos: [0, -210], rect_size: [380, 460] });

// ── 중열: 선택 요약
b.patch("Panel_Summary", { anchor: "middle-center", pos: [-180, -40], rect_size: [420, 880] });
b.patch("Panel_Summary/Img_Bg", { rect_size: [420, 880] });
b.patchComponent("Panel_Summary/Img_Bg", "MOD.Core.SpriteGUIRendererComponent", { Color: CARD });
b.patch("Panel_Summary/Img_ItemSlot", { pos: [0, 300] });
b.patch("Panel_Summary/Text_Name", { pos: [0, 220] });
b.patch("Panel_Summary/Text_Stats", { pos: [0, -80], rect_size: [300, 460] });

// ── 우열: 탭 3(창 내부 상단) + 콘텐츠(스케일 축소로 창 안에)
b.patch("Btn_TabFlame", { pos: [230, 420], rect_size: [190, 74] });
b.patch("Btn_TabStar", { pos: [430, 420], rect_size: [190, 74] });
b.patch("Btn_TabPot", { pos: [630, 420], rect_size: [190, 74] });
const SCALE82 = { UIScale: { x: 0.82, y: 0.82, z: 1 } };
b.patch("UIR_SimpleFantasy_Sample_StarForce/Panel", { pos: [430, -90] });
b.patchComponent("UIR_SimpleFantasy_Sample_StarForce/Panel", "MOD.Core.UITransformComponent", SCALE82);
b.patch("UIR_SimpleFantasy_Sample_PotentialReset/Layout", { pos: [430, -90] });
b.patchComponent("UIR_SimpleFantasy_Sample_PotentialReset/Layout", "MOD.Core.UITransformComponent", SCALE82);
b.patch("UIR_SimpleFantasy_Sample_PotentialSelect/Layout", { pos: [430, -90] });
b.patchComponent("UIR_SimpleFantasy_Sample_PotentialSelect/Layout", "MOD.Core.UITransformComponent", { UIScale: { x: 0.58, y: 0.58, z: 1 } });

// ── z-순서: 창이 맨 뒤, 콘텐츠·탭이 위
b.patch("Window", { display_order: 1 });
b.patch("Panel_EquipList", { display_order: 10 });
b.patch("Panel_Summary", { display_order: 10 });
b.patch("UIR_SimpleFantasy_Sample_StarForce", { display_order: 20 });
b.patch("UIR_SimpleFantasy_Sample_PotentialReset", { display_order: 20 });
b.patch("UIR_SimpleFantasy_Sample_PotentialSelect", { display_order: 20 });
b.patch("Btn_TabFlame", { display_order: 30 });
b.patch("Btn_TabStar", { display_order: 30 });
b.patch("Btn_TabPot", { display_order: 30 });
b.patch("UIR_SimpleFantasy_Sample_GearItemInfo", { display_order: 40 });

b.write(UI, {
  strict: false,
  bind: {
    mlua: "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UI/UIEnhancePanel.mlua",
    props: { panelWindow: "Window", btnCloseMain: "Window/Btn_CloseMain" },
  },
});
console.log("window frame assembled");
