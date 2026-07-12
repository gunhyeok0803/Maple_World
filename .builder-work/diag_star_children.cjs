const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
const S = "UIR_SimpleFantasy_Sample_StarForce/Panel";
const f = b.find(S);
const tf = f.jsonString["@components"].find(c=>c["@type"]==="MOD.Core.UITransformComponent");
console.log("PANEL size=" + JSON.stringify(tf.RectSize) + " anchorMin=" + JSON.stringify(tf.AnchorsMin) + " pivot=" + JSON.stringify(tf.Pivot));
for (const e of b.listEntities()) {
  const rest = e.path.replace("/ui/EnhanceGroup/"+S+"/","");
  if (!e.path.startsWith("/ui/EnhanceGroup/"+S+"/") || rest.split("/").length>1) continue;
  const fe = b.find(e.path.replace("/ui/EnhanceGroup/",""));
  const t = fe.jsonString["@components"].find(c=>c["@type"]==="MOD.Core.UITransformComponent");
  const comps = fe.jsonString["@components"].map(c=>c["@type"].replace("MOD.Core.","").replace("Component","")).filter(x=>x!=="UITransform").join(",");
  console.log((e.enable===false?"[off] ":"[ON ] ") + rest.padEnd(16) +
    " anc=" + JSON.stringify(t.AnchorsMin) + " piv=" + JSON.stringify(t.Pivot) +
    " pos=" + JSON.stringify(t.AnchoredPosition) + " sz=" + JSON.stringify(t.RectSize) + " {" + comps + "}");
}
