const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
function info(rel){
  const t = b.getComponent("Panel_EquipList/"+rel, "MOD.Core.UITransformComponent");
  const e = b.find("Panel_EquipList/"+rel);
  if(!t||!e) return null;
  const ap=t.anchoredPosition||{x:0,y:0}, sd=t.RectSize||{x:0,y:0};
  const js = typeof e.jsonString==="string"?JSON.parse(e.jsonString):e.jsonString;
  return {x:Math.round(ap.x),y:Math.round(ap.y),w:Math.round(sd.x),h:Math.round(sd.y),en:js.enable!==false};
}
const names=["Img_Bg","Text_Title","EquipCell_1","EquipCell_2","EquipCell_3","EquipCell_4",
  "LockCell_1","LockCell_2","LockCell_3","LockCell_4","LockCell_5","LockCell_6","LockCell_7","LockCell_8",
  "Text_Section","Grid"];
const rows=[];
for(const nm of names){ const r=info(nm); if(r) rows.push({nm,...r,
  yTop:r.y+r.h/2,yBot:r.y-r.h/2,xL:r.x-r.w/2,xR:r.x+r.w/2}); }
for(const r of rows) console.log(`${r.en?" ":"x"} ${r.nm.padEnd(12)} (${r.x},${r.y}) ${r.w}x${r.h}  y[${Math.round(r.yBot)}..${Math.round(r.yTop)}]`);
console.log("--- overlaps (enabled Cell/Grid pairs) ---");
const cells=rows.filter(r=>r.en && /Cell|Grid/.test(r.nm));
let any=false;
for(let i=0;i<cells.length;i++)for(let j=i+1;j<cells.length;j++){
  const a=cells[i],c=cells[j];
  const ox=Math.max(0,Math.min(a.xR,c.xR)-Math.max(a.xL,c.xL));
  const oy=Math.max(0,Math.min(a.yTop,c.yTop)-Math.max(a.yBot,c.yBot));
  if(ox>4&&oy>4){ console.log(`OVERLAP ${a.nm} x ${c.nm} (${Math.round(ox)}x${Math.round(oy)})`); any=true; }
}
if(!any) console.log("(none)");
