const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
// patch로 폭이 안 잡혀 크리에이터 재호출(트랜스폼 전체 재지정)로 재생성
b.text("Panel_Summary/Text_Stats", "", { anchor: "middle-center", pos: [0, -80], rect_size: [340, 460], size: 16, color: "#E6EAF0", alignment: 1, pivot: [0.5, 0.5] });
b.write(UI, { strict: false });
console.log("stats text rebuilt");
