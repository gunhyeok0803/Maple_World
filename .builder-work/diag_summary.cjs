const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
const P = "Panel_Summary";
const f = b.find(P);
const tf = f.jsonString["@components"].find(c=>c["@type"]==="MOD.Core.UITransformComponent");
console.log("Panel_Summary size="+JSON.stringify(tf.RectSize)+" anc="+JSON.stringify(tf.AnchorsMin)+" pos="+JSON.stringify(tf.AnchoredPosition));
for (const e of b.listEntities()) {
  const rest = e.path.replace("/ui/EnhanceGroup/"+P+"/","");
  if (!e.path.startsWith("/ui/EnhanceGroup/"+P+"/") || rest.split("/").length>1) continue;
  const fe = b.find(e.path.replace("/ui/EnhanceGroup/",""));
  const t = fe.jsonString["@components"].find(c=>c["@type"]==="MOD.Core.UITransformComponent");
  const comps = fe.jsonString["@components"].map(c=>c["@type"].replace("MOD.Core.","").replace("Component","")).filter(x=>x!=="UITransform").join(",");
  let extra="";
  for(const ct of ["MOD.Core.TextComponent","MOD.Core.TextGUIRendererComponent"]) if(b.hasComponent(rest?P+"/"+rest:P,ct)){const c=b.getComponent(P+"/"+rest,ct); extra=" size="+c.FontSize+" align="+c.Alignment;}
  console.log((e.enable===false?"[off] ":"[ON ] ")+rest.padEnd(16)+" anc="+JSON.stringify(t.AnchorsMin)+" pos="+JSON.stringify(t.AnchoredPosition)+" sz="+JSON.stringify(t.RectSize)+" {"+comps+"}"+extra);
}
