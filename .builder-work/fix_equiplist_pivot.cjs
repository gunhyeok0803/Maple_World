const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
// 좌패널: 원래 middle-left 생성이라 pivot(0,0.5)이 남아 요약 패널과 겹침 → 중앙 pivot으로 명시
b.patch("Panel_EquipList", { anchor: "middle-center", pos: [-640, -40], rect_size: [420, 880], pivot: [0.5, 0.5] });
b.write(UI, { strict: false });
console.log("equiplist pivot fixed");
