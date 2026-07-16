// 강화창 리스킨 3차: 탭 내부 패널 3개 → Pop_St01(흰색) + 밝은 배경 위 텍스트 대비 조정.
// 유지: 어두운 칩/게이지/버튼 위 흰 텍스트(PercentBG 수치·StarGauge·버튼 라벨·등급칩 Text_Grade·Panel_MatList).
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));

const SP = "MOD.Core.SpriteGUIRendererComponent";
const TL = "MOD.Core.TextComponent";              // legacy
const TG = "MOD.Core.TextGUIRendererComponent";   // gui
const WHITE = { r: 1, g: 1, b: 1, a: 1 };
const TITLE = { r: 0.23, g: 0.26, b: 0.31, a: 1 };  // #3A4150 제목
const BODY  = { r: 0.29, g: 0.33, b: 0.39, a: 1 };  // #4B5563 본문
const MUTED = { r: 0.42, g: 0.45, b: 0.50, a: 1 };  // 보조(부위라벨/각주)
const GREEN = { r: 0.16, g: 0.55, b: 0.22, a: 1 };  // 밝은 배경용 진초록(강조 유지)
const GOLD  = { r: 0.55, g: 0.42, b: 0.15, a: 1 };  // 밝은 배경용 진골드

const TABBG = "0f4b90db8a87477e9c7a962b045f90eb"; // Pop_St01

const b = UIBuilder.read("ui/EnhanceGroup.ui");

// ① 탭 내부 패널(실제 보이는 배경) → Pop_St01 흰색
for (const p of ["Tab_StarForce/Panel", "Tab_Potential/Layout", "Tab_Flame/Layout"]) {
  b.patchComponent(p, SP, { ImageRUID: { DataId: TABBG }, Type: 1, Color: WHITE });
}

// ② 텍스트 대비 — [경로, 컴포넌트, 색]
const texts = [
  // 좌측 목록
  ["Panel_EquipList/Text_Title", TL, TITLE],
  ["Panel_EquipList/Text_Section", TL, TITLE],
  ["Panel_EquipList/EquipCell_1/PartLabel", TL, MUTED],
  ["Panel_EquipList/EquipCell_2/PartLabel", TL, MUTED],
  ["Panel_EquipList/EquipCell_3/PartLabel", TL, MUTED],
  ["Panel_EquipList/EquipCell_4/PartLabel", TL, MUTED],
  ["Panel_EquipList/EquipCell_5/PartLabel", TL, MUTED],
  // 중앙 요약
  ["Panel_Summary/Text_Name", TL, TITLE],          // 선택 시 런타임 등급색이 덮어씀
  ["Panel_Summary/Text_ColCur", TL, BODY],
  ["Panel_Summary/Text_ColNext", TL, GREEN],
  ["Panel_Summary/Text_Stats", TL, BODY],
  ["Panel_Summary/Text_StatsNext", TL, GREEN],
  // 스타포스 탭
  ["Tab_StarForce/Panel/Text_ItemName", TG, TITLE],
  ["Tab_StarForce/Panel/Layout_Cost/Label_Cost", TG, BODY],
  ["Tab_StarForce/Panel/Layout_Cost/Text_Cost", TG, BODY],
  ["Tab_StarForce/Panel/Layout_Prob/Success/PrecentTitle/Text_Label", TG, BODY],
  ["Tab_StarForce/Panel/Layout_Prob/Keep/PrecentTitle/Text_Label", TG, BODY],
  ["Tab_StarForce/Panel/Layout_Prob/Destroy/PrecentTitle/Text_Label", TG, BODY],
  ["Tab_StarForce/Panel/Text_Footer", TL, MUTED],
  // 잠재 탭
  ["Tab_Potential/Layout/Layout_Cost/Label_Cost", TG, BODY],
  ["Tab_Potential/Layout/Layout_Cost/Text_Dia", TG, BODY],
  ["Tab_Potential/Layout/Layout_Before/Text_Opts", TL, BODY],
  ["Tab_Potential/Layout/Layout_After/Text_Opts", TL, BODY],
  // 환생 탭
  ["Tab_Flame/Layout/Text_ItemName", TG, TITLE],
  ["Tab_Flame/Layout/Layout_Cost/Label_Cost", TG, BODY],
  ["Tab_Flame/Layout/Layout_Cost/Text_Cost", TG, BODY],
  ["Tab_Flame/Layout/Layout_PotenInfo/Text_Opts", TL, BODY],
  // 확률 팝업
  ["Popup_Prob/Text_Title", TG, GOLD],
  ["Popup_Prob/Text_Body", TG, BODY],
];
for (const [p, comp, color] of texts) {
  b.patchComponent(p, comp, { FontColor: color });
}
b.write("ui/EnhanceGroup.ui");
console.log("[RESKIN] step2 — inner panels + " + texts.length + " texts done");
