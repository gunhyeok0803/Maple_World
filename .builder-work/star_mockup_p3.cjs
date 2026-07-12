const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const S = "UIR_SimpleFantasy_Sample_StarForce/Panel";
const TC = { anchor: "top-center", pivot: [0.5, 0.5] };
// 상단 스택 정돈(이름 보이게 + 간격 균일)
b.patch(S + "/Text_ItemName", Object.assign({ pos: [0, -48], rect_size: [700, 40] }, TC));
b.patch(S + "/Text_StarGauge", Object.assign({ pos: [0, -102], rect_size: [700, 46] }, TC));
b.patch(S + "/StarForceLevel", Object.assign({ pos: [0, -165], rect_size: [700, 52] }, TC));
b.patch(S + "/Text_Preview", Object.assign({ pos: [0, -285], rect_size: [700, 150] }, TC));
// 하락 라벨 한글화(샘플 영문 "Down" → "하락")
function label(rel, s) {
  for (const ct of ["MOD.Core.TextComponent", "MOD.Core.TextGUIRendererComponent"]) {
    if (b.hasComponent(rel, ct)) { b.patchComponent(rel, ct, { Text: s }); return true; }
  }
  for (const e of b.listEntities()) {
    if (!e.path.startsWith("/ui/EnhanceGroup/" + rel + "/")) continue;
    const r = e.path.replace("/ui/EnhanceGroup/", "");
    for (const ct of ["MOD.Core.TextComponent", "MOD.Core.TextGUIRendererComponent"]) {
      if (b.hasComponent(r, ct)) { b.patchComponent(r, ct, { Text: s }); return "child:" + r.split("/").pop(); }
    }
  }
  return false;
}
console.log("하락 라벨:", label(S + "/Layout_Prob/Decrease", "하락"));
b.write(UI, { strict: false });
console.log("star mockup pass3 done");
