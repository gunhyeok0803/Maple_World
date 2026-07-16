// 승급창 프레임 스프라이트 상태 점검(회귀 원인).
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/PromoteGroup.ui");
for (const p of ["PromoteRoot/Panel_Coll/Card_Info", "PromoteRoot/Panel_Coll/Card_Book"]) {
  const ent = b.find(p);
  if (!ent) { console.log(p + " 없음!"); continue; }
  const js = ent.jsonString || {};
  console.log("== " + p + "  enable=" + js.enable + " visible=" + js.visible);
  for (const c of (js["@components"] || [])) {
    if ((c["@type"] || "").includes("Sprite")) console.log(JSON.stringify(c).slice(0, 400));
  }
}
