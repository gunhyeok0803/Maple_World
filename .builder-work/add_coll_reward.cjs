// 목업 하단 "컬렉션 보상: ..." 라인 추가(도감 그리드 아래 좌측).
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/PromoteGroup.ui");
b.text("PromoteRoot/Panel_Coll/Coll_Reward", "", {
  size: 16, color: "#9AA3B0", alignment: 3,
  anchor: "middle-center", pos: [-180, -205], rect_size: [460, 26],
});
b.write("ui/PromoteGroup.ui");
console.log("[BUILD] Coll_Reward =", b.getId("PromoteRoot/Panel_Coll/Coll_Reward"));
