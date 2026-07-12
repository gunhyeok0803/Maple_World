const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");

// 1) DefaultGroup의 Btn_Menu id + 버튼/레이캐스트
const d = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/DefaultGroup.ui");
const bm = d.find("Btn_Menu");
console.log("DefaultGroup/Btn_Menu id =", bm ? bm.id : "<없음>");
if (bm){
  console.log("  hasButton =", d.hasComponent("Btn_Menu","MOD.Core.ButtonComponent"));
  const sg = d.getComponent("Btn_Menu","MOD.Core.SpriteGUIRendererComponent");
  console.log("  sprite RaycastTarget =", sg?sg.RaycastTarget:"(스프라이트 없음)");
  const js = typeof bm.jsonString==="string"?JSON.parse(bm.jsonString):bm.jsonString;
  console.log("  enable =", js.enable!==false);
}
console.log("UISideMenu.btnMenu 프로퍼티 기대 UUID = a3c4995d-bc76-4e3c-a1ca-ac3dc09c1bcb");

// 2) SideMenuGroup Controller id (UISideMenu 부착 확인) + panelSide id
const s = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/SideMenuGroup.ui");
const ctrl = s.find("Controller");
console.log("SideMenuGroup/Controller id =", ctrl?ctrl.id:"<없음>", "hasUISideMenu =", ctrl?s.hasComponent("Controller","script.UISideMenu"):"-");
const ps = s.find("Panel_Side");
console.log("SideMenuGroup/Panel_Side id =", ps?ps.id:"<없음>");
console.log("UISideMenu.panelSide 기대 = 3e1ed48c-973c-4980-91ea-af7ec0a159b9");
