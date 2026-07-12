const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
// 1) 출석 보드 그룹 DefaultShow=false (컨트롤러 OnBeginPlay 미실행 → 기능 비활성)
const AB = "C:/Users/rnsgu/MSW_ProjectAI00/ui/AttendanceBoard.ui";
const a = UIBuilder.read(AB);
a.patchComponent("/", "MOD.Core.UIGroupComponent", { DefaultShow: false });
a.write(AB, { strict: false });
console.log("AttendanceBoard DefaultShow=false");
// 2) HUD 열기 버튼 숨김
const DG = "C:/Users/rnsgu/MSW_ProjectAI00/ui/DefaultGroup.ui";
const d = UIBuilder.read(DG);
d.patch("Btn_Attendance", { enable: false });
d.write(DG, { strict: false });
console.log("Btn_Attendance disabled");
