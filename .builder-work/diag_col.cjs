const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
const C = "UIR_SimpleFantasy_Sample_StarForce/Panel/Layout_Prob/Success";
for (const e of b.listEntities()) {
  if (!e.path.startsWith("/ui/EnhanceGroup/"+C)) continue;
  const rel = e.path.replace("/ui/EnhanceGroup/","");
  const fe = b.find(rel);
  const t = fe.jsonString["@components"].find(c=>c["@type"]==="MOD.Core.UITransformComponent");
  const comps = fe.jsonString["@components"].map(c=>c["@type"].replace("MOD.Core.","").replace("Component","")).filter(x=>x!=="UITransform").join(",");
  console.log(e.path.replace("/ui/EnhanceGroup/"+C,"Success").padEnd(34) +
    " anc=" + JSON.stringify(t.AnchorsMin) + " piv=" + JSON.stringify(t.Pivot) +
    " pos=" + JSON.stringify(t.AnchoredPosition) + " sz=" + JSON.stringify(t.RectSize) + " {"+comps+"}");
}
// Success 컨테이너의 레이아웃 그룹 여부
const slg = b.getComponent(C, "MOD.Core.ScrollLayoutGroupComponent");
console.log("Success layout group:", slg ? JSON.stringify(slg) : "none");
