// 승급/컬렉션 어두운 버튼(-/+/MAX/승급하기 등) 라벨 → 흰색 롤백(어두운 버튼 위 저대비 해소).
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const TL = "MOD.Core.TextComponent";
const WHITE = { r: 0.95, g: 0.96, b: 0.98, a: 1 };
const b = UIBuilder.read("ui/PromoteGroup.ui");
for (const p of ["Panel_Promote/Btn_Minus", "Panel_Promote/Btn_Plus", "Panel_Promote/Btn_Max", "Panel_Promote/Btn_Action",
                 "Panel_Coll/Btn_Minus", "Panel_Coll/Btn_Plus", "Panel_Coll/Btn_Max", "Panel_Coll/Btn_Action"]) {
  b.patchComponent("PromoteRoot/" + p, TL, { FontColor: WHITE });
}
b.write("ui/PromoteGroup.ui");
console.log("[FIX] dark-button labels back to white");
