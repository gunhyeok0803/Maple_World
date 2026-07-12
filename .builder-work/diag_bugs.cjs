const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
function info(rel){
  const t = b.getComponent(rel, "MOD.Core.UITransformComponent");
  const e = b.find(rel);
  if(!e) return rel+"  <MISSING>";
  const js = typeof e.jsonString==="string"?JSON.parse(e.jsonString):e.jsonString;
  const en = js.enable!==false;
  let pos="", size="";
  if(t){ const a=t.anchoredPosition||{x:0,y:0}, s=t.RectSize||{x:0,y:0}; pos=`(${Math.round(a.x)},${Math.round(a.y)})`; size=`${Math.round(s.x)}x${Math.round(s.y)}`; }
  return `${en?" ON":"OFF"}  ${rel.padEnd(34)} ${pos} ${size}`;
}
console.log("=== X 버튼 ===");
console.log(info("Window/Btn_CloseMain"));
console.log("=== 탭 버튼 ===");
console.log(info("Btn_TabFlame"));
console.log(info("Btn_TabStar"));
console.log(info("Btn_TabPot"));
console.log("=== 탭 콘텐츠 루트(엔터 시 위치) ===");
console.log(info("Tab_StarForce"));
console.log(info("Tab_StarForce/Panel"));
console.log(info("Tab_Potential"));
console.log(info("Tab_Potential/Layout"));
console.log(info("Tab_Flame"));
console.log(info("Tab_Flame/Layout"));
console.log("=== 공용 패널(탭 무관 고정이어야) ===");
console.log(info("Window"));
console.log(info("Panel_EquipList"));
console.log(info("Panel_Summary"));
