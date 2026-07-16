// Z-Order 표준화(.ui에 굽기): Window(뒤)→Panel→Tab버튼→Tab콘텐츠→Popup(앞).
// 런타임 SetSiblingIndex 보정에 의존하던 순서를 파일 레벨에서 확정.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));

// EnhanceGroup: Tab_StarForce(0)가 Window(1) 뒤 → 표준 순서로 재배치
const e = UIBuilder.read("ui/EnhanceGroup.ui");
const eOrder = {
  "Window": 0,
  "Panel_EquipList": 1,
  "Panel_Summary": 2,
  "Btn_TabStar": 3,
  "Btn_TabPot": 4,
  "Btn_TabFlame": 5,
  "Tab_StarForce": 6,
  "Tab_Potential": 7,
  "Tab_Flame": 8,
  "EnhanceRoot": 9,     // 비렌더 래퍼
  "Controller": 10,     // 비렌더 스크립트
  "Popup_Prob": 11,     // 팝업 최상
};
for (const [name, order] of Object.entries(eOrder)) {
  if (e.getId(name)) e.patch(name, { display_order: order });
  else console.log("(skip E) " + name);
}
e.write("ui/EnhanceGroup.ui");

// PromoteGroup: Window(5)가 맨 앞 → 맨 뒤로, 패널/탭 순서 표준화
const p = UIBuilder.read("ui/PromoteGroup.ui");
const pOrder = {
  "PromoteRoot/Window": 0,
  "PromoteRoot/Panel_Promote": 1,
  "PromoteRoot/Panel_Coll": 2,
  "PromoteRoot/Btn_TabPromote": 3,
  "PromoteRoot/Btn_TabColl": 4,
  "PromoteRoot/Controller": 5,
};
for (const [name, order] of Object.entries(pOrder)) {
  if (p.getId(name)) p.patch(name, { display_order: order });
  else console.log("(skip P) " + name);
}
p.write("ui/PromoteGroup.ui");
console.log("[Z] enhance+promote z-order standardized");
