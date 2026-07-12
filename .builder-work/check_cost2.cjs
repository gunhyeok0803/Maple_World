const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
for (const base of ["UIR_SimpleFantasy_Sample_StarForce/Panel/Layout_Cost", "UIR_SimpleFantasy_Sample_PotentialSelect/Layout/Layout_Cost"]) {
  for (const e of b.listEntities()) {
    if (!e.path.startsWith("/ui/EnhanceGroup/" + base)) continue;
    console.log(e.path.replace("/ui/EnhanceGroup/UIR_SimpleFantasy_Sample_", ""), "[" + (e.size ? e.size.map(Math.round).join("x") : "-") + "]");
  }
  console.log("---");
}
const b2 = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui");
const bc = b2.getComponent("Panel_Promote/Btn_Action", "MOD.Core.ButtonComponent");
console.log("Colors=", JSON.stringify(bc.Colors));
console.log("ImageRUIDs=", JSON.stringify(bc.ImageRUIDs));
console.log("Transition=", JSON.stringify(bc.Transition));
const bt = b2.getComponent("Btn_TabPromote", "MOD.Core.ButtonComponent");
console.log("Tab Colors=", JSON.stringify(bt.Colors), "Tab ImageRUIDs=", JSON.stringify(bt.ImageRUIDs), "Tab Transition=", JSON.stringify(bt.Transition));
