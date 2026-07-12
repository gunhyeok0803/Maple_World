const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
const roots = {
  star: "UIR_SimpleFantasy_Sample_StarForce/Panel",
  pot: "UIR_SimpleFantasy_Sample_PotentialSelect/Layout",
  flame: "UIR_SimpleFantasy_Sample_PotentialReset/Layout",
};
for (const [k, root] of Object.entries(roots)) {
  const f = b.find(root);
  const tf = f.jsonString["@components"].find(c=>c["@type"]==="MOD.Core.UITransformComponent");
  console.log("=== " + k + " size=" + JSON.stringify(tf.RectSize) + " anchorMin=" + JSON.stringify(tf.AnchorsMin) + " pivot=" + JSON.stringify(tf.Pivot) + " pos=" + JSON.stringify(tf.AnchoredPosition));
  for (const e of b.listEntities()) {
    if (!e.path.startsWith("/ui/EnhanceGroup/"+root+"/")) continue;
    const rest = e.path.replace("/ui/EnhanceGroup/"+root+"/","");
    if (rest.split("/").length > 1) continue;
    console.log("   " + rest + " [" + (e.size?e.size.map(Math.round).join("x"):"-") + "] pos=" + (e.pos?e.pos.map(Math.round).join(","):"-") + (e.enable===false?" (off)":""));
  }
}
