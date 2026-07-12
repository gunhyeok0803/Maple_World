const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/SideMenuGroup.ui";
const b = UIBuilder.read(UI);

// stretch 대신 명시 크기(패널과 동일 460x1080, 중앙 고정)
b.patch("Panel_Side/Img_Bg", { anchor: "middle-center", pos: [0, 0], rect_size: [460, 1080] });

b.write(UI);
console.log("Img_Bg explicit size applied");
