const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/AttendanceBoard.ui");
const g = b.getComponent("/", "MOD.Core.UIGroupComponent");
console.log("AttendanceBoard DefaultShow=", g ? g.DefaultShow : "no group comp");
for (const e of b.listEntities()) {
  if (e.depth <= 1) console.log("  " + e.path + " enable=" + e.enable);
}
// DefaultGroup의 Btn_Attendance 확인
const fs = require("fs");
const dg = "C:/Users/rnsgu/MSW_ProjectAI00/ui/DefaultGroup.ui";
console.log("DefaultGroup exists:", fs.existsSync(dg));
if (fs.existsSync(dg)) {
  const d = UIBuilder.read(dg);
  for (const e of d.listEntities()) {
    if (/Attend/i.test(e.path)) console.log("  DG: " + e.path + " enable=" + e.enable);
  }
}
