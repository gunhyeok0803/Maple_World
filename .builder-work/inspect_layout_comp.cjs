const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
for (const root of [
  "UIR_SimpleFantasy_Sample_StarForce/Panel",
  "UIR_SimpleFantasy_Sample_PotentialSelect/Layout",
  "UIR_SimpleFantasy_Sample_PotentialReset/Layout",
]) {
  const f = b.find(root);
  const comps = f.jsonString["@components"].map(c=>c["@type"].replace("MOD.Core.",""));
  console.log(root.split("/")[0].replace("UIR_SimpleFantasy_Sample_","") + ": " + comps.join(", "));
}
// star tab Img_Deco 컴포넌트
const d = b.find("UIR_SimpleFantasy_Sample_StarForce/Panel/Img_Deco");
console.log("Img_Deco comps: " + d.jsonString["@components"].map(c=>c["@type"].replace("MOD.Core.","")).join(", "));
