const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
const SEL = "UIR_SimpleFantasy_Sample_PotentialSelect/Layout";
const RST = "UIR_SimpleFantasy_Sample_PotentialReset/Layout";
for (const p of [SEL, SEL + "/Layout_Before", SEL + "/Layout_After", SEL + "/Btn_Cancel", RST, RST + "/Layout_PotenInfo"]) {
  const f = b.find(p);
  if (!f) { console.log(p, "MISSING"); continue; }
  const comps = f.jsonString["@components"].map(c => c["@type"].replace("MOD.Core.", ""));
  const tf = f.jsonString["@components"].find(c => c["@type"] === "MOD.Core.UITransformComponent");
  console.log(p.replace("UIR_SimpleFantasy_Sample_", ""), "\n  comps:", comps.join(","), "\n  pos:", JSON.stringify(tf.AnchoredPosition), "anchors:", JSON.stringify(tf.AnchorsMin), JSON.stringify(tf.AnchorsMax), "pivot:", JSON.stringify(tf.Pivot), "size:", JSON.stringify(tf.RectSize));
}
// Before 내부 밝은 패널 후보 컬러 확인
for (const suffix of ["/Layout_Before/Img_Grade", "/Layout_Before/Deco_Panel_DiaPattern", "/Layout_Before"]) {
  const p = SEL + suffix;
  if (b.hasComponent(p, "MOD.Core.SpriteGUIRendererComponent")) {
    const c = b.getComponent(p, "MOD.Core.SpriteGUIRendererComponent");
    console.log(p.replace(SEL, "SEL"), "sprite Color=", JSON.stringify(c.Color), "ruid=", JSON.stringify(c.ImageRUID));
  } else console.log(p.replace(SEL, "SEL"), "no sprite comp");
}
