const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const TEXTS = ["MOD.Core.TextComponent","MOD.Core.TextGUIRendererComponent"];

// ── EnhanceGroup: 환생 밴드/스타포스 푸터/레전드리 안내 텍스트
const E = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(E);
function label(bb, rel, s){ for(const ct of TEXTS) if(bb.hasComponent(rel,ct)){ bb.patchComponent(rel,ct,{Text:s}); return true; } return false; }
console.log("환생밴드:", label(b, "Tab_Flame/Layout/Layout_PotenInfo/Img_Grade/Text_Grade", "추가 옵션"));
console.log("푸터:", label(b, "Tab_StarForce/Panel/Text_Footer", "※ 파괴된 장비는 [복구하기]로 되살릴 수 있습니다 (동일 장비 순정 1개 소모)"));
b.text("Tab_StarForce/Panel/Text_LegendOnly", "레전드리 장비만 강화할 수 있습니다",
  { anchor:"top-center", pivot:[0.5,0.5], pos:[0,-460], rect_size:[700,32], size:20, color:"#E6B84D", alignment:4, enable:false });
b.write(E,{strict:false});
console.log("EnhanceGroup done");

// ── PromoteGroup: Text_Need 3줄 공간 확보
const P = "C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui";
const p = UIBuilder.read(P);
p.patch("Panel_Promote/Text_Need", { rect_size:[900,110] });
p.patch("Panel_Coll/Text_Need", { rect_size:[440,110] });
p.write(P,{strict:false});
console.log("PromoteGroup done");
