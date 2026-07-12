const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");

const R = {
  panel: "6e8e561a4582462eaad762cb11d1f835",      // Panel_04 다크 패널
  hamburger: "9b5537505c4e4ceebbbef50e8cc19248",  // Btn_Menu
  close: "07096261a9944312b01dee501fed7599",      // 공용 X
  tile: "60b3dacf1291422a91897d49422ae16f",       // 88x88 타일 프레임
  icoEnhance: "a80c808cc5a443c482ab8beab205c068", // Icon_StarForce
  icoUpgrade: "d49670fd942b4f61b64d2ae54f4d98f9", // Icon_Upgrade
};

const b = new UIBuilder("SideMenuGroup", 5);

// HUD 햄버거(항상 표시)
b.button("Btn_Menu", "", { anchor: "top-right", pos: [-24, -24], rect_size: [80, 80], image_ruid: R.hamburger });

// 우측 도킹 풀하이트 다크 패널(초기 닫힘)
b.panel("Panel_Side", { anchor: "middle-right", pos: [0, 0], rect_size: [460, 1080], enable: false });
b.sprite("Panel_Side/Img_Bg", { anchor: "stretch", image_ruid: R.panel, sprite_type: 1, raycast: true });
b.button("Panel_Side/Btn_Close", "", { anchor: "top-right", pos: [-16, -16], rect_size: [72, 72], image_ruid: R.close });

// 메뉴 타일(아이콘 + 라벨) — 4열 그리드 자리, 현재 2개
function tile(name, ico, label, x) {
  b.button("Panel_Side/" + name, "", { anchor: "top-left", pos: [x, -120], rect_size: [100, 100], image_ruid: R.tile });
  b.sprite("Panel_Side/" + name + "/Icon", { anchor: "middle-center", pos: [0, 14], rect_size: [44, 44], image_ruid: ico });
  b.text("Panel_Side/" + name + "/Label", label, { anchor: "middle-center", pos: [0, -30], rect_size: [96, 30], size: 13, color: "#FFFFFF", alignment: 4, overflow: 1 });
}
tile("Tile_Enhance", R.icoEnhance, "장비 슬롯 강화", 36);
tile("Tile_Upgrade", R.icoUpgrade, "승급/컬렉션", 148);

// 컨트롤러
b.script("Controller", "script.UISideMenu", { anchor: "stretch", pos: [0, 0], rect_size: [1920, 1080] });

b.write("C:/Users/rnsgu/MSW_ProjectAI00/ui/SideMenuGroup.ui", {
  bind: {
    mlua: "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UI/UISideMenu.mlua",
    props: {
      panelSide: "Panel_Side",
      btnMenu: "Btn_Menu",
      btnClose: "Panel_Side/Btn_Close",
      tileEnhance: "Panel_Side/Tile_Enhance",
      tileUpgrade: "Panel_Side/Tile_Upgrade",
    },
  },
});
console.log("SideMenuGroup.ui written + bindings injected");
