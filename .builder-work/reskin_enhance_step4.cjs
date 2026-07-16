// 강화창 리스킨 5차: 창 타이틀(크림 프레임 위 흰 글자) → 진회색.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/EnhanceGroup.ui");
b.patchComponent("Window/Text_WinTitle", "MOD.Core.TextComponent",
  { FontColor: { r: 0.23, g: 0.26, b: 0.31, a: 1 } });
b.write("ui/EnhanceGroup.ui");
console.log("[RESKIN] step4 — window title darkened");
