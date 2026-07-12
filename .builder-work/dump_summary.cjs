const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
function info(rel){
  const t = b.getComponent("Panel_Summary/"+rel, "MOD.Core.UITransformComponent");
  if(!t) return null;
  const ap=t.anchoredPosition||{x:0,y:0}, sd=t.RectSize||{x:0,y:0};
  let align="";
  const tc=b.getComponent("Panel_Summary/"+rel,"MOD.Core.TextComponent");
  if(tc){ align="TC align="+tc.Alignment+" line="+tc.LineSpacing; }
  return {x:Math.round(ap.x),y:Math.round(ap.y),w:Math.round(sd.x),h:Math.round(sd.y),align};
}
for(const nm of ["Img_Bg","Img_ItemSlot","Text_Name","Line_1","Text_ColCur","Text_ColNext","Line_2","Text_Stats","Text_StatsNext"]){
  const r=info(nm); if(r) console.log(`${nm.padEnd(14)} (${r.x},${r.y}) ${r.w}x${r.h}  x[${r.x-r.w/2}..${r.x+r.w/2}]  ${r.align}`);
}
