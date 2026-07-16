// 강화창 리스킨 6차: 옵션 박스 몸통(Layout_Before/After/PotenInfo) 밝게 + 헤더바 텍스트 어둡게.
// 헤더바(Img_Grade)=밝은 회색 칩 유지, 몸통=거의 흰색 → 칩/몸통 구분.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const SP = "MOD.Core.SpriteGUIRendererComponent";
const TG = "MOD.Core.TextGUIRendererComponent";
const FLAT = "9eee37f21d974889947d021f08bcda62"; // Tint_Square_R10
const BODYBG = { r: 0.97, g: 0.98, b: 0.99, a: 1 };
const TITLE = { r: 0.23, g: 0.26, b: 0.31, a: 1 };

const b = UIBuilder.read("ui/EnhanceGroup.ui");
// 옵션 박스 몸통 → 밝게
for (const p of [
  "Tab_Potential/Layout/Layout_Before",
  "Tab_Potential/Layout/Layout_After",
  "Tab_Flame/Layout/Layout_PotenInfo",
]) {
  b.patchComponent(p, SP, { ImageRUID: { DataId: FLAT }, Type: 1, Color: BODYBG });
}
// 잠재 탭 헤더바 정적 텍스트 → 어둡게(런타임 등급색이 선택 시 덮어씀 — 등급색은 밝은 배경에서도 가독 OK)
b.patchComponent("Tab_Potential/Layout/Layout_Before/Img_Grade/Text_Grade", TG, { FontColor: TITLE });
b.patchComponent("Tab_Potential/Layout/Layout_After/Img_Grade/Text_Grade", TG, { FontColor: TITLE });
b.write("ui/EnhanceGroup.ui");
console.log("[RESKIN] step5 — option box bodies lightened");
