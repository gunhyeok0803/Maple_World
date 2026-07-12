// 강화 HUD 전용 UIGroup 생성(스타포스/잠재/환생 탭 창의 드롭 대상)
const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const u = new UIBuilder("EnhanceGroup", 3, true); // defaultShow=true(컨트롤러 스크립트 수용), 자식은 숨김 운용
u.write("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
console.log("EnhanceGroup.ui created");
