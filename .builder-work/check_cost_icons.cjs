const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
const BASES = [
  "UIR_SimpleFantasy_Sample_StarForce/Panel/Layout_Cost",
  "UIR_SimpleFantasy_Sample_PotentialReset/Layout/Layout_Cost",
  "UIR_SimpleFantasy_Sample_PotentialSelect/Layout/Layout_Cost",
];
for (const base of BASES) {
  for (const e of b.listEntities()) {
    if (!e.path.startsWith("/ui/EnhanceGroup/" + base)) continue;
    const rel = e.path.replace("/ui/EnhanceGroup/", "");
    const sp = b.hasComponent(rel, "MOD.Core.SpriteGUIRendererComponent") ? b.getComponent(rel, "MOD.Core.SpriteGUIRendererComponent") : null;
    if (sp && sp.ImageRUID) console.log(rel, "ruid=", JSON.stringify(sp.ImageRUID));
  }
  console.log("---");
}
// 승급/등록 버튼 상태 확인
const b2 = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui");
for (const p of ["Panel_Promote/Btn_Action", "Panel_Coll/Btn_Action", "Btn_TabPromote"]) {
  const sp = b2.getComponent(p, "MOD.Core.SpriteGUIRendererComponent");
  const bc = b2.getComponent(p, "MOD.Core.ButtonComponent");
  console.log(p, "ruid=", JSON.stringify(sp && sp.ImageRUID), "color=", JSON.stringify(sp && sp.Color));
  if (bc) console.log("  btn keys:", Object.keys(bc).join(","));
}
