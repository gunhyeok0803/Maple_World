// 스타포스 탭 다크 잔재 → 밝은 스킴 통일(잠재/환생과 동일).
// 확률 칩 3개 + 비용 필 + 게이지 바 밝게, 그 위 텍스트 어두운 계열로.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const SP = "MOD.Core.SpriteGUIRendererComponent";
const TG = "MOD.Core.TextGUIRendererComponent";
const TL = "MOD.Core.TextComponent";
const FLAT = "9eee37f21d974889947d021f08bcda62"; // Tint_Square_R10
const CHIP  = { r: 0.90, g: 0.92, b: 0.95, a: 1 };
const TITLE = { r: 0.23, g: 0.26, b: 0.31, a: 1 };
const GREEN = { r: 0.16, g: 0.55, b: 0.22, a: 1 };
const RED   = { r: 0.75, g: 0.20, b: 0.18, a: 1 };
const AMBER = { r: 0.72, g: 0.52, b: 0.10, a: 1 };

const P = "Tab_StarForce/Panel/";
const b = UIBuilder.read("ui/EnhanceGroup.ui");
// 칩/필/바 → 밝은 칩
for (const p of [
  P + "Layout_Prob/Success/PercentBG",
  P + "Layout_Prob/Keep/PercentBG",
  P + "Layout_Prob/Destroy/PercentBG",
  P + "Layout_Cost/Img_BG",
  P + "StarForceLevel",
]) {
  b.patchComponent(p, SP, { ImageRUID: { DataId: FLAT }, Type: 1, Color: CHIP });
}
// 칩 위 텍스트 → 어두운 계열(성공=진초록/유지=진회색/파괴=진빨강, 게이지=앰버/레벨=진회색·진초록)
b.patchComponent(P + "Layout_Prob/Success/PercentBG/Text_Percent", TG, { FontColor: GREEN });
b.patchComponent(P + "Layout_Prob/Keep/PercentBG/Text_Percent", TG, { FontColor: TITLE });
b.patchComponent(P + "Layout_Prob/Destroy/PercentBG/Text_Percent", TG, { FontColor: RED });
b.patchComponent(P + "Text_StarGauge", TL, { FontColor: AMBER });
b.patchComponent(P + "StarForceLevel/Text_PrevLevel", TG, { FontColor: TITLE });
b.patchComponent(P + "StarForceLevel/Text_NextLevel", TG, { FontColor: GREEN });
b.write("ui/EnhanceGroup.ui");
console.log("[RESKIN] starforce chips lightened");
