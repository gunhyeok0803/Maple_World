const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const P = "UIR_SimpleFantasy_Sample_StarForce/Panel/Img_Deco";
const f = b.find(P);
const tf = f.jsonString["@components"].find(c => c["@type"] === "MOD.Core.UITransformComponent");
console.log("before:", JSON.stringify({ a: tf.AnchorsMin, b: tf.AnchorsMax, p: tf.Pivot, pos: tf.AnchoredPosition }));
// 관측 보정: 렌더 중심이 의도보다 (+74,+89) 밀림 → 역보정
b.patch(P, { pos: [-74, 246] });
b.write(UI, { strict: false });
console.log("deco recentered");
