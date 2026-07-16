// RegGrid 위치 조정: 도감 그리드(우변 x=-10)와 안 겹치게 우측 영역으로.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/PromoteGroup.ui");
b.patch("PromoteRoot/Panel_Coll/RegGrid", { pos: [265, -70], rect_size: [550, 490] });
b.write("ui/PromoteGroup.ui");
console.log("[FIX] RegGrid repositioned");
