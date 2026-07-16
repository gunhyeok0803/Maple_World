// 도감 슬롯 9개에 PartLabel(부위명 텍스트) 자식 추가 — 미등록 상태 표시용.
// 중앙 배치, 흐릿한 회색, raycast 통과(text 기본).
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/PromoteGroup.ui");
const R = "PromoteRoot/Panel_Coll/";
for (let i = 1; i <= 9; i++) {
  b.text(R + "CollSlot_" + i + "/PartLabel", "", {
    size: 20, color: "#8B93A1",
    anchor: "middle-center", pos: [0, 0], rect_size: [100, 28],
  });
}
b.write("ui/PromoteGroup.ui");
console.log("[LABEL] 9 PartLabels added");
