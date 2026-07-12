const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const MC = { anchor: "middle-center", pivot: [0.5, 0.5] };
const TC = { anchor: "top-center", pivot: [0.5, 0.5] };
const BC = { anchor: "bottom-center", pivot: [0.5, 0.5] };
const LINE = "66b6a9dde07b4c3abb90c16c0feeed3f";
const TEXTS = ["MOD.Core.TextComponent","MOD.Core.TextGUIRendererComponent"];
function txt(rel,opt){ for(const ct of TEXTS) if(b.hasComponent(rel,ct)){ const u={}; if(opt.color!==undefined)u.FontColor=opt.color; if(opt.size!==undefined)u.FontSize=opt.size; if(opt.text!==undefined)u.Text=opt.text; b.patchComponent(rel,ct,u); return; } }
const col=(r,g,bl)=>({r,g,b:bl,a:1});

// ── 중앙 패널 정돈
const P="Panel_Summary";
b.patch(P+"/Text_ColCur", Object.assign({ pos:[-88,150], rect_size:[150,22] }, MC));
txt(P+"/Text_ColCur", { color: col(0.60,0.66,0.74), size:14 });
b.patch(P+"/Text_ColNext", Object.assign({ pos:[110,150], rect_size:[110,22] }, MC));
txt(P+"/Text_ColNext", { color: col(0.60,0.85,0.55), size:14 });
// 헤더 밑 얇은 구분선
b.sprite(P+"/Line_2", Object.assign({ pos:[0,128], rect_size:[300,3], image_ruid:LINE }, MC));
b.patchComponent(P+"/Line_2","MOD.Core.SpriteGUIRendererComponent",{ Color: col(0.30,0.34,0.40) });
// 스탯 본문 밝게 + 위치
b.patch(P+"/Text_Stats", Object.assign({ pos:[-30,-120], rect_size:[230,500] }, MC));
txt(P+"/Text_Stats", { color: col(0.86,0.89,0.94), size:16 });
b.patch(P+"/Text_StatsNext", Object.assign({ pos:[118,-120], rect_size:[95,500] }, MC));
txt(P+"/Text_StatsNext", { color: col(0.55,0.86,0.50), size:16 });

// ── 스타포스: 다음 성급 "7" 초록
const S="UIR_SimpleFantasy_Sample_StarForce/Panel";
txt(S+"/StarForceLevel/Text_NextLevel", { color: col(0.55,0.86,0.45) });
// 체크박스 위치(비용 아래, 중앙 정렬)
b.patch(S+"/Chk_Protect", Object.assign({ pos:[-92,178], rect_size:[28,28] }, BC));
b.patch(S+"/Text_Protect", Object.assign({ pos:[52,178], rect_size:[250,30] }, BC));

b.write(UI, { strict:false });
console.log("summary polish + star tweaks done");
