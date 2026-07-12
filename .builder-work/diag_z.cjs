const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
// 1) EnhanceGroup 최상위 자식 순서 + 스프라이트 color/alpha/OrderInLayer/size
const eg = b.find("EnhanceGroup");
console.log("=== EnhanceGroup top-level children (렌더 순서) ===");
let i = 0;
for (const e of b.listEntities()) {
  if (e.depth !== 1) continue;
  i++;
  const rel = e.path.replace("/ui/EnhanceGroup/", "");
  let info = "";
  if (b.hasComponent(rel, "MOD.Core.SpriteGUIRendererComponent")) {
    const sp = b.getComponent(rel, "MOD.Core.SpriteGUIRendererComponent");
    const c = sp.Color || {};
    info = " sprite a=" + (c.a) + " OrderInLayer=" + sp.OrderInLayer + " ray=" + sp.RaycastTarget;
  }
  console.log(i + ". " + rel + " sz=" + (e.size?e.size.map(Math.round).join("x"):"-") + info);
}
// 2) 스타포스 Panel 직속 자식 OrderInLayer
console.log("\n=== StarForce/Panel children OrderInLayer ===");
const S = "UIR_SimpleFantasy_Sample_StarForce/Panel";
for (const e of b.listEntities()) {
  if (!e.path.startsWith("/ui/EnhanceGroup/"+S+"/")) continue;
  if (e.path.replace("/ui/EnhanceGroup/"+S+"/","").split("/").length>1) continue;
  const rel = e.path.replace("/ui/EnhanceGroup/","");
  let oil = "-";
  if (b.hasComponent(rel, "MOD.Core.SpriteGUIRendererComponent")) oil = "spr:"+b.getComponent(rel,"MOD.Core.SpriteGUIRendererComponent").OrderInLayer;
  else if (b.hasComponent(rel, "MOD.Core.TextGUIRendererComponent")) oil = "txt:"+b.getComponent(rel,"MOD.Core.TextGUIRendererComponent").OrderInLayer;
  else if (b.hasComponent(rel, "MOD.Core.TextComponent")) oil = "txtC:"+b.getComponent(rel,"MOD.Core.TextComponent").OrderInLayer;
  console.log("  " + e.path.split("/").pop() + " OIL=" + oil + (e.enable===false?" (off)":""));
}
