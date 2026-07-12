const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
for (const g of ["DefaultGroup","SideMenuGroup"]){
  console.log("=== "+g+" ===");
  try{
    const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/"+g+".ui");
    for (const e of b.listEntities()){
      const p = e.path||e; const rel = p.replace("/ui/"+g,"");
      const depth = (rel.match(/\//g)||[]).length;
      if (depth<=2) console.log("  ".repeat(depth)+ (rel.split("/").pop()||"(root)"));
    }
  }catch(err){ console.log("  ERR", err.message); }
}
