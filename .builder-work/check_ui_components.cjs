const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
// 각 UI 그룹에서 script.* 컴포넌트를 가진 엔티티 찾기
const groups = [
  ["SideMenuGroup","ui/SideMenuGroup.ui"],
  ["InventoryGroup","ui/InventoryGroup.ui"],
  ["EnhanceGroup","ui/EnhanceGroup.ui"],
  ["PromoteGroup","ui/PromoteGroup.ui"],
  ["DefaultGroup","ui/DefaultGroup.ui"],
];
for (const [g,path] of groups){
  const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/"+path);
  console.log("=== "+g+" : script 컴포넌트 보유 엔티티 ===");
  let any=false;
  for (const e of b.listEntities()){
    const p=e.path||e;
    const names = (e.componentNames||"");
    const scripts = String(names).split(",").filter(x=>x.trim().startsWith("script."));
    if (scripts.length>0){ console.log("  "+p.replace("/ui/"+g,"")+"  →  "+scripts.join(", ")); any=true; }
  }
  if(!any) console.log("  (script 컴포넌트 없음!)");
}
