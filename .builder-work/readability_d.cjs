const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const TEXTS = ["MOD.Core.TextComponent","MOD.Core.TextGUIRendererComponent"];
const DIM2 = { r:0.72, g:0.76, b:0.82, a:1 };  // #B8C2D0
function t(bb, rel, opt){ for(const ct of TEXTS) if(bb.hasComponent(rel,ct)){ const u={}; if(opt.size)u.FontSize=opt.size; if(opt.color)u.FontColor=opt.color; bb.patchComponent(rel,ct,u); return true; } return false; }

const E = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(E);
// 중앙 요약: 본문 18, 헤더 대비 상향
t(b, "Panel_Summary/Text_Stats", { size:18 });
t(b, "Panel_Summary/Text_StatsNext", { size:18 });
t(b, "Panel_Summary/Text_ColCur", { size:14, color:DIM2 });
t(b, "Panel_Summary/Text_ColNext", { size:14 });
// 잠재/환생 옵션 본문 18
t(b, "Tab_Potential/Layout/Layout_Before/Text_Opts", { size:18 });
t(b, "Tab_Potential/Layout/Layout_After/Text_Opts", { size:18 });
t(b, "Tab_Flame/Layout/Layout_PotenInfo/Text_Opts", { size:18 });
b.write(E,{strict:false});
console.log("EnhanceGroup D done");

const P = "C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui";
const p = UIBuilder.read(P);
for (const nm of ["Panel_Promote/Text_Need","Panel_Promote/Text_Result","Panel_Coll/Text_Need","Panel_Coll/Text_Result","Panel_Coll/Text_BookBonus"]) t(p, nm, { size:18 });
t(p, "Panel_Coll/Text_BookHint", { size:16, color:DIM2 });
p.write(P,{strict:false});
console.log("PromoteGroup D done");
