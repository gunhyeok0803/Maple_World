const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
const L = "UIR_SimpleFantasy_Sample_PotentialSelect/Layout";
const f = b.find(L);
const tf = f.jsonString["@components"].find(c=>c["@type"]==="MOD.Core.UITransformComponent");
console.log("Layout size="+JSON.stringify(tf.RectSize));
for (const e of b.listEntities()) {
  const rest = e.path.replace("/ui/EnhanceGroup/"+L+"/","");
  if (!e.path.startsWith("/ui/EnhanceGroup/"+L+"/")) continue;
  if (rest.split("/").length > 2) continue;
  console.log((e.enable===false?"[off] ":"[ON ] ")+"  ".repeat(rest.split("/").length-1)+rest.split("/").pop()+" sz="+(e.size?e.size.map(Math.round).join("x"):"-"));
}
