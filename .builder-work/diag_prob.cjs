const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
const P = "UIR_SimpleFantasy_Sample_StarForce/Panel/Layout_Prob";
const slg = b.getComponent(P, "MOD.Core.ScrollLayoutGroupComponent") || b.getComponent(P, "MOD.Core.GridLayoutGroupComponent");
console.log("Layout_Prob layout comp:", JSON.stringify(slg));
// 자식 열 구조
for (const e of b.listEntities()) {
  const rest = e.path.replace("/ui/EnhanceGroup/"+P+"/","");
  if (!e.path.startsWith("/ui/EnhanceGroup/"+P+"/") || rest.split("/").length>1) continue;
  console.log("  col: " + rest + " sz=" + (e.size?e.size.map(Math.round).join("x"):"-") + (e.enable===false?" (off)":""));
}
