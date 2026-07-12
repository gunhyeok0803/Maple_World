const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const S = "UIR_SimpleFantasy_Sample_StarForce/Panel";
const TC = { anchor: "top-center", pivot: [0.5, 0.5] };
const BC = { anchor: "bottom-center", pivot: [0.5, 0.5] };
const TEXTS = ["MOD.Core.TextComponent","MOD.Core.TextGUIRendererComponent"];
function size(rel,s){ for(const ct of TEXTS) if(b.hasComponent(rel,ct)){ b.patchComponent(rel,ct,{FontSize:s}); return; } }

// 별 게이지: 한 줄에 들어가게 폰트 축소 + 아래로(탭 안 붙게)
b.patch(S+"/Text_StarGauge", Object.assign({ pos:[0,-135], rect_size:[730,46] }, TC));
size(S+"/Text_StarGauge", 26);
// 3▶4 아래로
b.patch(S+"/StarForceLevel", Object.assign({ pos:[0,-220], rect_size:[700,60] }, TC));
// 3박스 아래로
b.patch(S+"/Layout_Prob", Object.assign({ pos:[0,-345], rect_size:[720,140] }, TC));
// 안내문 아래로
b.patch(S+"/Text_NoDown", Object.assign({ pos:[0,-440], rect_size:[700,28] }, TC));
// 하단 그룹(비용/체크박스/버튼/푸터) — bottom-center로 묶음
b.patch(S+"/Layout_Cost", Object.assign({ pos:[0,240], rect_size:[700,60] }, BC));
b.patch(S+"/Chk_Protect", Object.assign({ pos:[-95,185], rect_size:[28,28] }, BC));
b.patch(S+"/Text_Protect", Object.assign({ pos:[45,185], rect_size:[260,30] }, BC));
b.patch(S+"/Btn_Enchant", Object.assign({ pos:[140,80], rect_size:[250,84] }, BC));
if (b.find(S+"/Btn_Restore")) b.patch(S+"/Btn_Restore", Object.assign({ pos:[-140,80], rect_size:[250,84] }, BC));
b.patch(S+"/Text_Footer", Object.assign({ pos:[0,28], rect_size:[730,26] }, BC));
b.write(UI, { strict:false });
console.log("star ref fix done");
