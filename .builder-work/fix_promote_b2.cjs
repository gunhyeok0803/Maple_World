const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui";
const b = UIBuilder.read(UI);
const MC = { anchor: "middle-center", pivot: [0.5, 0.5] };
const BRIGHT = { r: 0.93, g: 0.95, b: 0.98, a: 1 };
const WHITE = { r: 1, g: 1, b: 1, a: 1 };
const CARD = { r: 0.09, g: 0.11, b: 0.15, a: 0.94 };

// 타이틀/탭 겹침 해소
b.patch("Window/Text_WinTitle", { pos: [-620, -16], rect_size: [300, 40] });
b.patch("Btn_TabPromote", Object.assign({ pos: [-380, 445], rect_size: [190, 74] }, MC));
b.patch("Btn_TabColl", Object.assign({ pos: [-180, 445], rect_size: [190, 74] }, MC));

// 카드 톤 살짝 업(창 bg와 구분)
for (const p of ["Panel_Promote/Card_List", "Panel_Promote/Card_Info"]) {
  b.patchComponent(p, "MOD.Core.SpriteGUIRendererComponent", { Color: CARD });
}

// 버튼 스프라이트 틴트 리셋(어두운 기존 틴트 제거)
for (const nm of ["Btn_Minus", "Btn_Plus", "Btn_Max", "Btn_Action"]) {
  b.patchComponent("Panel_Promote/" + nm, "MOD.Core.SpriteGUIRendererComponent", { Color: WHITE });
}

// Panel_Promote 하위 텍스트 일괄 밝게(색 지정된 Text_Rate/Text_Arrow 제외)
const SKIP = new Set(["Text_Rate", "Text_Arrow"]);
let n = 0;
for (const e of b.listEntities()) {
  if (!e.path.startsWith("/ui/PromoteGroup/Panel_Promote")) continue;
  const leaf = e.path.split("/").pop();
  if (SKIP.has(leaf)) continue;
  const rel = e.path.replace("/ui/PromoteGroup/", "");
  for (const ct of ["MOD.Core.TextComponent", "MOD.Core.TextGUIRendererComponent"]) {
    if (b.hasComponent(rel, ct)) { b.patchComponent(rel, ct, { FontColor: BRIGHT }); n++; }
  }
}
// 창 타이틀도 밝게
for (const ct of ["MOD.Core.TextComponent", "MOD.Core.TextGUIRendererComponent"]) {
  if (b.hasComponent("Window/Text_WinTitle", ct)) b.patchComponent("Window/Text_WinTitle", ct, { FontColor: BRIGHT });
}
console.log("brightened:", n);

b.write(UI, { strict: false });
console.log("promote B2 done");
