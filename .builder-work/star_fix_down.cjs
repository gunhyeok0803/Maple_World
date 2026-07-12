const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const D = "UIR_SimpleFantasy_Sample_StarForce/Panel/Layout_Prob/Decrease";
function set(rel, s) {
  for (const ct of ["MOD.Core.TextComponent", "MOD.Core.TextGUIRendererComponent"]) {
    if (b.hasComponent(rel, ct)) { b.patchComponent(rel, ct, { Text: s }); return true; }
  }
  return "MISS:" + rel;
}
// 구조 덤프
for (const e of b.listEntities()) {
  if (e.path.startsWith("/ui/EnhanceGroup/" + D + "/")) console.log("  " + e.path.replace("/ui/EnhanceGroup/"+D+"/",""));
}
console.log("label:", set(D + "/PrecentTitle/Text_Label", "하락"));
console.log("value:", set(D + "/PercentBG/Text_Percent", "0%"));
b.write(UI, { strict: false });
console.log("down fixed");
