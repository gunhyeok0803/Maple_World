const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);

const R = {
  panel: "6e8e561a4582462eaad762cb11d1f835",   // 다크 패널(흰 스프라이트+틴트)
  tabOn: "c2660e96661c4a6e8dc8eaa17eb0655c",   // W190 선택(파랑)
  tabOff: "50426b5b1ee44bc5a1c10355b0e9ad03",  // W190 비선택
};
const DARK = { r: 0.09019608, g: 0.121568628, b: 0.1764706, a: 0.9 };

// 좌측: 장비 선택 패널(사이드메뉴와 동일 다크 틴트 방식)
b.panel("Panel_EquipList", { anchor: "middle-left", pos: [0, 0], rect_size: [460, 1080], enable: false });
b.sprite("Panel_EquipList/Img_Bg", { anchor: "middle-center", pos: [0, 0], rect_size: [460, 1080], image_ruid: R.panel, sprite_type: 1, raycast: true });
b.patchComponent("Panel_EquipList/Img_Bg", "MOD.Core.SpriteGUIRendererComponent", { Color: DARK });
b.text("Panel_EquipList/Text_Title", "강화 장비 선택", { anchor: "top-center", pos: [0, -36], rect_size: [400, 40], size: 24, color: "#FFFFFF", alignment: 4 });
b.text("Panel_EquipList/Text_Hint", "착용 중 장비와 인벤토리 장비 모두 선택 가능", { anchor: "top-center", pos: [0, -76], rect_size: [420, 30], size: 14, color: "#9AA4B2", alignment: 4 });
b.gridView("Panel_EquipList/Grid", { anchor: "middle-center", pos: [0, -60], rect_size: [420, 860], cell_size: [118, 118], fixed_count: 3, fixed_type: 0, spacing: [15, 15], padding: [15, 15, 10, 10], total_count: 0 });

// 상단 탭 3 (우측 콘텐츠 영역 상단, y 452~540)
b.button("Btn_TabStar", "스타포스", { anchor: "middle-center", pos: [30, 496], rect_size: [190, 88], font_size: 22, color: "#FFFFFF", image_ruid: R.tabOn });
b.button("Btn_TabPot", "잠재능력", { anchor: "middle-center", pos: [230, 496], rect_size: [190, 88], font_size: 22, color: "#FFFFFF", image_ruid: R.tabOff });
b.button("Btn_TabFlame", "환생의 불꽃", { anchor: "middle-center", pos: [430, 496], rect_size: [190, 88], font_size: 22, color: "#FFFFFF", image_ruid: R.tabOff });
b.patch("Btn_TabStar", { enable: false });
b.patch("Btn_TabPot", { enable: false });
b.patch("Btn_TabFlame", { enable: false });

// 콘텐츠 3종을 우측 영역(x+230, y-30)으로 이동
b.patch("UIR_SimpleFantasy_Sample_StarForce/Panel", { pos: [230, -30] });
b.patch("UIR_SimpleFantasy_Sample_PotentialReset/Layout", { pos: [230, -30] });
b.patch("UIR_SimpleFantasy_Sample_PotentialSelect/Layout", { pos: [230, -30] });

// GearItemInfo는 상세창 교체 단계까지 꺼둠
b.patch("UIR_SimpleFantasy_Sample_GearItemInfo", { enable: false });

// 컨트롤러 + 바인딩
b.script("Controller", "script.UIEnhancePanel", { anchor: "stretch", pos: [0, 0], rect_size: [1920, 1080] });

b.write(UI, {
  strict: false,
  bind: {
    mlua: "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UI/UIEnhancePanel.mlua",
    props: {
      panelEquip: "Panel_EquipList",
      contentStar: "UIR_SimpleFantasy_Sample_StarForce",
      contentPot: "UIR_SimpleFantasy_Sample_PotentialSelect",
      contentFlame: "UIR_SimpleFantasy_Sample_PotentialReset",
      btnTabStar: "Btn_TabStar",
      btnTabPot: "Btn_TabPot",
      btnTabFlame: "Btn_TabFlame",
      btnCloseStar: "UIR_SimpleFantasy_Sample_StarForce/Panel/Btn_Close",
      btnCloseFlame: "UIR_SimpleFantasy_Sample_PotentialReset/Layout/Btn_Close",
      btnCancelPot: "UIR_SimpleFantasy_Sample_PotentialSelect/Layout/Btn_Cancel",
    },
  },
});
console.log("EnhanceGroup layout assembled + bindings injected");
