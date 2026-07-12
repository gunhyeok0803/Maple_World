const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
for (const base of ["UIR_SimpleFantasy_Sample_StarForce/Panel/Layout_Cost", "UIR_SimpleFantasy_Sample_PotentialReset/Layout/Layout_Cost"]) {
  for (const e of b.listEntities()) {
    if (!e.path.startsWith("/ui/EnhanceGroup/" + base)) continue;
    const rel = e.path.replace("/ui/EnhanceGroup/", "");
    const sp = b.hasComponent(rel, "MOD.Core.SpriteGUIRendererComponent") ? b.getComponent(rel, "MOD.Core.SpriteGUIRendererComponent") : null;
    console.log(rel.split("Sample_")[1], sp ? ("ruid=" + JSON.stringify(sp.ImageRUID)) : "(no sprite)");
  }
  console.log("---");
}
// Img_Dia RUID
const dia = b.getComponent("UIR_SimpleFantasy_Sample_PotentialSelect/Layout/Layout_Cost/Img_BG/Img_Dia", "MOD.Core.SpriteGUIRendererComponent");
console.log("Img_Dia:", JSON.stringify(dia && dia.ImageRUID));
// Btn_Action sprite Type
const b2 = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui");
const sa = b2.getComponent("Panel_Promote/Btn_Action", "MOD.Core.SpriteGUIRendererComponent");
const st = b2.getComponent("Btn_TabPromote", "MOD.Core.SpriteGUIRendererComponent");
console.log("Action Type=", sa.Type, "Tab Type=", st.Type);
