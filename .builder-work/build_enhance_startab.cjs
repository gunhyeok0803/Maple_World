const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const SP = "UIR_SimpleFantasy_Sample_StarForce/Panel";

// 스탯 변화 미리보기(기존 Item/Scroll_Stat 대체 — 런타임에 구노드 숨김)
b.text(SP + "/Text_Preview", "", { anchor: "middle-center", pos: [0, 80], rect_size: [640, 140], size: 20, color: "#3E4B5C", alignment: 4 });

// Layout_Safety → 복구 버튼화(샘플에 ButtonComponent 이미 있음 — 클릭 수신만 보장)
b.patchComponent(SP + "/Layout_Item/Layout_Safety", "MOD.Core.SpriteGUIRendererComponent", { RaycastTarget: true });

// 탭 순서 레퍼런스대로: [환생의 불꽃 | 스타포스 | 잠재능력]
b.patch("Btn_TabFlame", { pos: [30, 496] });
b.patch("Btn_TabStar", { pos: [230, 496] });
b.patch("Btn_TabPot", { pos: [430, 496] });

b.write(UI, { strict: false });
console.log("star tab ui adjusted");
