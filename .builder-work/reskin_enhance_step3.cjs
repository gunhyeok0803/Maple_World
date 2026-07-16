// 강화창 리스킨 4차: 중앙 탭 어색함 해소.
// ① 이중 프레임 제거: 탭 루트 3개 스킨 → 투명(내부 패널만 보이게)
// ② 탭 내부 패널 → Tint_Square_R10(민무늬 라운드, 헤더띠 없음 → 메인 타이틀바와 안 겹침)
// ③ 다크 잔재 칩("현재·레어"/"등급상승확률"/"추가 옵션" Img_Grade) → 밝은 회색 칩
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));

const SP = "MOD.Core.SpriteGUIRendererComponent";
const TG = "MOD.Core.TextGUIRendererComponent";
const FLAT = "9eee37f21d974889947d021f08bcda62"; // Tint_Square_R10
const WHITE = { r: 1, g: 1, b: 1, a: 1 };
const CHIP  = { r: 0.90, g: 0.92, b: 0.95, a: 1 };   // 밝은 회색 칩
const CLEAR = { r: 1, g: 1, b: 1, a: 0 };            // 투명
const TITLE = { r: 0.23, g: 0.26, b: 0.31, a: 1 };

const b = UIBuilder.read("ui/EnhanceGroup.ui");

// ① 탭 루트 투명화(이중 프레임 제거)
for (const p of ["Tab_StarForce", "Tab_Potential", "Tab_Flame"]) {
  b.patchComponent(p, SP, { Color: CLEAR });
}
// ② 내부 패널 → 민무늬 라운드
for (const p of ["Tab_StarForce/Panel", "Tab_Potential/Layout", "Tab_Flame/Layout"]) {
  b.patchComponent(p, SP, { ImageRUID: { DataId: FLAT }, Type: 1, Color: WHITE });
}
// ③ 다크 칩 → 밝은 칩
for (const p of [
  "Tab_Potential/Layout/Layout_Before/Img_Grade",
  "Tab_Potential/Layout/Layout_After/Img_Grade",
  "Tab_Flame/Layout/Layout_PotenInfo/Img_Grade",
]) {
  b.patchComponent(p, SP, { ImageRUID: { DataId: FLAT }, Type: 1, Color: CHIP });
}
// 환생 칩 제목("추가 옵션")은 정적 흰색 → 어둡게(잠재 칩 제목은 런타임 등급색이라 불변)
b.patchComponent("Tab_Flame/Layout/Layout_PotenInfo/Img_Grade/Text_Grade", TG, { FontColor: TITLE });

b.write("ui/EnhanceGroup.ui");
console.log("[RESKIN] step3 — double frame removed, flat tab bg, light chips");
