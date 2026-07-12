const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
for (const [g,path] of [["SideMenuGroup","ui/SideMenuGroup.ui"],["EnhanceGroup","ui/EnhanceGroup.ui"],["InventoryGroup","ui/InventoryGroup.ui"]]){
  const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/"+path);
  for(const x of b.listEntities()){
    const p = x.path||x;
    if(!p.endsWith("/Controller")) continue;
    const e = b.find(p);
    if(!e){ console.log(g+"/Controller: find("+p+") 실패"); continue; }
    const js = typeof e.jsonString==="string"?JSON.parse(e.jsonString):e.jsonString;
    console.log("=== "+p+" ===");
    console.log("  modelId =", js.modelId||"(없음)");
    console.log("  componentNames =", e.componentNames||"(없음)");
    console.log("  @components =", (js["@components"]||[]).map(c=>c["@type"]).join(", ")||"(없음)");
  }
}
