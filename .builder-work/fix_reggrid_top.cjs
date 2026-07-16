// RegSub와 첫 행 겹침 해소: 그리드 top 270→240.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/PromoteGroup.ui");
b.patch("PromoteRoot/Panel_Coll/RegGrid", { pos: [285, -35], rect_size: [540, 550] });
b.write("ui/PromoteGroup.ui");
console.log("[FIX] RegGrid top lowered");
