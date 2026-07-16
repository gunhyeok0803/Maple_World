const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/PromoteGroup.ui");
for (const e of b.listEntities()) {
  const p = e.path || e.name || "?";
  if (/Reg|Panel_Coll$|Card_Info/.test(p)) console.log(p + "  enable=" + (e.enable !== false));
}
