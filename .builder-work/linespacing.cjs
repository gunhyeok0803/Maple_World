const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
function setLine(bb, rel, mult){
  if (bb.hasComponent(rel,"MOD.Core.TextComponent")) { bb.patchComponent(rel,"MOD.Core.TextComponent",{LineSpacing:mult}); return true; }
  if (bb.hasComponent(rel,"MOD.Core.TextGUIRendererComponent")) { bb.patchComponent(rel,"MOD.Core.TextGUIRendererComponent",{SpacingOption:{Line:20,Character:0,Paragraph:0,Word:0}}); return true; }
  return false;
}

const E = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const e = UIBuilder.read(E);
console.log("Stats:", setLine(e,"Panel_Summary/Text_Stats",1.6));
console.log("StatsNext:", setLine(e,"Panel_Summary/Text_StatsNext",1.6));
setLine(e,"Tab_Potential/Layout/Layout_Before/Text_Opts",1.5);
setLine(e,"Tab_Flame/Layout/Layout_PotenInfo/Text_Opts",1.5);
e.write(E,{strict:false});
console.log("enhance line spacing done");

const P = "C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui";
const p = UIBuilder.read(P);
setLine(p,"Panel_Promote/Text_Need",1.5);
setLine(p,"Panel_Promote/Text_Result",1.5);
setLine(p,"Panel_Coll/Text_Need",1.5);
setLine(p,"Panel_Coll/Text_Result",1.5);
setLine(p,"Panel_Coll/Text_BookBonus",1.5);
p.write(P,{strict:false});
console.log("promote line spacing done");
