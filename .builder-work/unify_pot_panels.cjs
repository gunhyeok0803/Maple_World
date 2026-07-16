// 잠재탭 Before/After 패널 레이아웃 통일(Before 기준): 폰트17/줄간격1.5/헤더 640×44/동일 오프셋.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const TL = "MOD.Core.TextComponent";
const b = UIBuilder.read("ui/EnhanceGroup.ui");
const A = "Tab_Potential/Layout/Layout_After";

b.patch(A, { rect_size: [680, 175.279282] });
b.patch(A + "/Img_Grade", { pos: [0, 80], rect_size: [640, 44] });
b.patch(A + "/Text_Opts", { pos: [0, -20], rect_size: [620, 135] });
b.patchComponent(A + "/Text_Opts", TL, { FontSize: 17, LineSpacing: 1.5 });

b.write("ui/EnhanceGroup.ui");
console.log("[UNIFY] After panel matched to Before");
