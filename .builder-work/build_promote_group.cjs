const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui";

const PANEL = "6e8e561a4582462eaad762cb11d1f835";
const CLOSE = "07096261a9944312b01dee501fed7599";
const TAB_ON = "c2660e96661c4a6e8dc8eaa17eb0655c";
const TAB_OFF = "50426b5b1ee44bc5a1c10355b0e9ad03";
const SLOT_BG = "aa931a755e5949699233b817029a3e36";
const DARK = { r: 0.09019608, g: 0.121568628, b: 0.1764706, a: 0.95 };

const b = new UIBuilder("PromoteGroup", 4);

// 창 프레임
b.panel("Window", { anchor: "middle-center", pos: [0, 0], rect_size: [1760, 1060], enable: false });
b.sprite("Window/Img_Bg", { anchor: "middle-center", pos: [0, 0], rect_size: [1760, 1060], image_ruid: PANEL, sprite_type: 1, raycast: true });
b.patchComponent("Window/Img_Bg", "MOD.Core.SpriteGUIRendererComponent", { Color: DARK });
b.text("Window/Text_WinTitle", "승급 / 컬렉션", { anchor: "top-center", pos: [0, -16], rect_size: [400, 40], size: 26, color: "#FFFFFF", alignment: 4 });
b.button("Window/Btn_CloseMain", "", { anchor: "top-right", pos: [-18, -10], rect_size: [64, 64], image_ruid: CLOSE });

// 탭 2
b.button("Btn_TabPromote", "승급", { anchor: "middle-center", pos: [-720, 470], rect_size: [190, 74], font_size: 22, color: "#FFFFFF", image_ruid: TAB_ON, enable: false });
b.button("Btn_TabColl", "컬렉션", { anchor: "middle-center", pos: [-520, 470], rect_size: [190, 74], font_size: 22, color: "#FFFFFF", image_ruid: TAB_OFF, enable: false });

// 탭 콘텐츠(승급/컬렉션 동일 구조: 좌 그리드 + 우 정보)
function content(name, actionLabel) {
  b.panel(name, { anchor: "middle-center", pos: [0, -40], rect_size: [1700, 920], enable: false });
  b.text(name + "/Text_ListTitle", "인벤토리 장비 (★0 순정)", { anchor: "middle-center", pos: [-560, 420], rect_size: [420, 30], size: 18, color: "#FFFFFF", alignment: 4 });
  b.gridView(name + "/Grid", { anchor: "middle-center", pos: [-560, -40], rect_size: [420, 820], cell_size: [118, 118], fixed_count: 3, fixed_type: 0, spacing: [15, 15], padding: [15, 15, 10, 10], total_count: 0 });
  // 셀 템플릿
  const tpl = name + "/CellTemplate";
  b.sprite(tpl, { anchor: "middle-center", pos: [0, 0], rect_size: [118, 118], image_ruid: SLOT_BG, raycast: true, enable: false });
  b.addComponent(tpl, "MOD.Core.ButtonComponent");
  b.addComponent(tpl, "script.UIEquipmentSlotWidget");
  b.sprite(tpl + "/Icon", { anchor: "middle-center", pos: [0, 0], rect_size: [60, 60] });
  b.text(tpl + "/Count", "", { anchor: "bottom-right", pos: [-8, 6], rect_size: [60, 24], size: 16, color: "#FFFFFF", alignment: 8, enable: false });
  // 우측 정보
  b.text(name + "/Text_Target", "대상을 선택하세요", { anchor: "middle-center", pos: [280, 300], rect_size: [800, 44], size: 26, color: "#FFFFFF", alignment: 4 });
  b.text(name + "/Text_Need", "", { anchor: "middle-center", pos: [280, 240], rect_size: [800, 32], size: 18, color: "#C9D2DE", alignment: 4 });
  b.button(name + "/Btn_Minus", "−", { anchor: "middle-center", pos: [80, 120], rect_size: [70, 70], font_size: 30, color: "#FFFFFF", image_ruid: TAB_OFF });
  b.text(name + "/Text_Times", "1", { anchor: "middle-center", pos: [230, 120], rect_size: [200, 50], size: 30, color: "#FFFFFF", alignment: 4 });
  b.button(name + "/Btn_Plus", "+", { anchor: "middle-center", pos: [380, 120], rect_size: [70, 70], font_size: 30, color: "#FFFFFF", image_ruid: TAB_OFF });
  b.button(name + "/Btn_Max", "MAX", { anchor: "middle-center", pos: [500, 120], rect_size: [110, 70], font_size: 22, color: "#FFFFFF", image_ruid: TAB_OFF });
  b.text(name + "/Text_Result", "", { anchor: "middle-center", pos: [280, 10], rect_size: [800, 60], size: 20, color: "#9BE28C", alignment: 4 });
  b.button(name + "/Btn_Action", actionLabel, { anchor: "middle-center", pos: [280, -140], rect_size: [280, 90], font_size: 26, color: "#FFFFFF", image_ruid: TAB_ON });
}
content("Panel_Promote", "승급하기");
content("Panel_Coll", "등록하기");

b.script("Controller", "script.UIPromotePanel", { anchor: "stretch", pos: [0, 0], rect_size: [1920, 1080] });

b.write(UI, {
  strict: false,
  bind: {
    mlua: "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UI/UIPromotePanel.mlua",
    props: {
      panelWindow: "Window",
      btnCloseMain: "Window/Btn_CloseMain",
      btnTabPromote: "Btn_TabPromote",
      btnTabColl: "Btn_TabColl",
      panelPromote: "Panel_Promote",
      panelColl: "Panel_Coll",
    },
  },
});
console.log("PromoteGroup.ui written + bindings injected");
