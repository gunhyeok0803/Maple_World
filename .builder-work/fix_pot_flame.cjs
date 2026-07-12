const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const SEL = "UIR_SimpleFantasy_Sample_PotentialSelect/Layout";
const RST = "UIR_SimpleFantasy_Sample_PotentialReset/Layout";
const CARD = { r: 0.10, g: 0.13, b: 0.18, a: 0.95 };
const BAND = { r: 0.16, g: 0.20, b: 0.28, a: 0.95 };

// ── 잠재 탭 세로 정돈(원래 앵커 유지: 카드=top-center, 리롤 버튼=bottom-center)
b.patch(SEL + "/Layout_Before", { anchor: "top-center", pivot: [0.5, 0.5], pos: [0, -200] });
b.patch(SEL + "/Layout_After", { anchor: "top-center", pivot: [0.5, 0.5], pos: [0, -580] });
b.patch(SEL + "/Img_Arrow", { anchor: "top-center", pivot: [0.5, 0.5], pos: [0, -390] });
b.patch(SEL + "/Btn_Cancel", { anchor: "bottom-center", pivot: [0.5, 0.5], pos: [0, 55] });
b.patch(SEL + "/Layout_Cost", { anchor: "bottom-center", pivot: [0.5, 0.5], pos: [0, 130] });

// ── 밝은 카드/밴드 다크 틴트 + 다이아 장식 숨김 (잠재 Before/After + 환생 PotenInfo)
for (const base of [SEL + "/Layout_Before", SEL + "/Layout_After", RST + "/Layout_PotenInfo"]) {
  if (b.hasComponent(base, "MOD.Core.SpriteGUIRendererComponent")) {
    b.patchComponent(base, "MOD.Core.SpriteGUIRendererComponent", { Color: CARD });
  }
  for (const d of ["/Deco_Panel_DiaPattern", "/Deco_Panel_DiaPattern_1"]) {
    if (b.find(base + d)) b.patch(base + d, { enable: false });
  }
  const grade = base + "/Img_Grade";
  if (b.hasComponent(grade, "MOD.Core.SpriteGUIRendererComponent")) {
    b.patchComponent(grade, "MOD.Core.SpriteGUIRendererComponent", { Color: BAND });
  }
}

// ── 라벨 한글화: Cost→비용, 환생 OK→부여하기
const TEXT_COMPS = ["MOD.Core.TextComponent", "MOD.Core.TextGUIRendererComponent"];
function patchText(rel, s) {
  for (const ct of TEXT_COMPS) {
    if (b.hasComponent(rel, ct)) { b.patchComponent(rel, ct, { Text: s }); return true; }
  }
  return false;
}
const hits = [];
for (const p of [
  ["UIR_SimpleFantasy_Sample_StarForce/Panel/Layout_Cost/Label_Cost", "비용"],
  [RST + "/Layout_Cost/Label_Cost", "비용"],
  [SEL + "/Layout_Cost/Label_Cost", "비용"],
  [RST + "/Btn_Ok", "부여하기"],
]) hits.push(p[0].split("/").pop() + "=" + patchText(p[0], p[1]));
console.log(hits.join(" "));

b.write(UI, { strict: false });
console.log("pot/flame fix done");
