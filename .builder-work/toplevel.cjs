const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
for (const [g,path] of [["EnhanceGroup","ui/EnhanceGroup.ui"],["PromoteGroup","ui/PromoteGroup.ui"]]){
  const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/"+path);
  const tops=[];
  for (const e of b.listEntities()){
    const p=e.path||e; const rel=p.replace("/ui/"+g,"");
    const seg=rel.split("/").filter(Boolean);
    if (seg.length===1) tops.push(seg[0]);
  }
  console.log(g+" 최상위: "+tops.join(", "));
}
