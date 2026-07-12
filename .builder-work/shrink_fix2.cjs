const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui";
const b = UIBuilder.read(UI);
const MC = { anchor:"middle-center", pivot:[0.5,0.5] };
b.patch("Window/Text_WinTitle", { pos:[-585,-14], rect_size:[200,40] });
b.patch("Btn_TabPromote", Object.assign({ pos:[-380,415], rect_size:[190,74] }, MC));
b.patch("Btn_TabColl", Object.assign({ pos:[-180,415], rect_size:[190,74] }, MC));
b.write(UI,{strict:false});
console.log("title/tab overlap fixed");
