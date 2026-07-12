const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const MC = { anchor:"middle-center", pivot:[0.5,0.5] };
const TC = { anchor:"top-center", pivot:[0.5,0.5] };
const BC = { anchor:"bottom-center", pivot:[0.5,0.5] };

// ── 창: 1600×1000 → 1440×920
b.patch("Window", Object.assign({ pos:[0,0], rect_size:[1440,920] }, MC));
b.patch("Window/Img_Bg", Object.assign({ pos:[0,0], rect_size:[1440,920] }, MC));
b.patch("Window/Text_WinTitle", { pos:[-500,-14], rect_size:[300,40] });

// ── 좌열 280×800
b.patch("Panel_EquipList", Object.assign({ pos:[-560,-40], rect_size:[280,800] }, MC));
b.patch("Panel_EquipList/Img_Bg", Object.assign({ pos:[0,0], rect_size:[280,800] }, MC));
b.patch("Panel_EquipList/Text_Title", { pos:[0,-26] });
const CELLS=[["EquipCell_1",-47,300],["EquipCell_2",47,300],["EquipCell_3",-47,206],["EquipCell_4",47,206]];
for (const [nm,x,y] of CELLS) b.patch("Panel_EquipList/"+nm, Object.assign({ pos:[x,y], rect_size:[88,88] }, MC));
const LOCKS=[[-47,112],[47,112],[-47,18],[47,18],[-47,-76],[47,-76],[-47,-170],[47,-170]];
for (let i=0;i<8;i++) b.patch("Panel_EquipList/LockCell_"+(i+1), Object.assign({ pos:LOCKS[i], rect_size:[88,88] }, MC));
b.patch("Panel_EquipList/Text_Section", Object.assign({ pos:[0,-240], rect_size:[260,26] }, MC));
b.patch("Panel_EquipList/Grid", Object.assign({ pos:[0,-322], rect_size:[264,130] }, MC));

// ── 중열 320×800
b.patch("Panel_Summary", Object.assign({ pos:[-260,-40], rect_size:[320,800] }, MC));
b.patch("Panel_Summary/Img_Bg", Object.assign({ pos:[0,0], rect_size:[320,800] }, MC));
b.patch("Panel_Summary/Img_ItemSlot", Object.assign({ pos:[0,300], rect_size:[100,100] }, MC));
b.patch("Panel_Summary/Text_Name", Object.assign({ pos:[0,220], rect_size:[290,36] }, MC));
b.patch("Panel_Summary/Line_1", Object.assign({ pos:[0,185], rect_size:[280,5] }, MC));
b.patch("Panel_Summary/Text_ColCur", Object.assign({ pos:[-80,155], rect_size:[150,22] }, MC));
b.patch("Panel_Summary/Text_ColNext", Object.assign({ pos:[100,155], rect_size:[110,22] }, MC));
b.patch("Panel_Summary/Line_2", Object.assign({ pos:[0,133], rect_size:[280,3] }, MC));
b.patch("Panel_Summary/Text_Stats", Object.assign({ pos:[-25,-115], rect_size:[220,440] }, MC));
b.patch("Panel_Summary/Text_StatsNext", Object.assign({ pos:[105,-115], rect_size:[90,440] }, MC));

// ── 탭 3(우열 중심 310)
b.patch("Btn_TabFlame", Object.assign({ pos:[110,415], rect_size:[190,74] }, MC));
b.patch("Btn_TabStar", Object.assign({ pos:[310,415], rect_size:[190,74] }, MC));
b.patch("Btn_TabPot", Object.assign({ pos:[510,415], rect_size:[190,74] }, MC));

// ── 탭 콘텐츠 루트 780×810 @ [310,-25]
b.patch("Tab_StarForce/Panel", Object.assign({ pos:[310,-25], rect_size:[780,810] }, MC));
b.patch("Tab_Potential/Layout", Object.assign({ pos:[310,-25], rect_size:[780,810] }, MC));
b.patch("Tab_Flame/Layout", Object.assign({ pos:[310,-25], rect_size:[780,810] }, MC));

// ── 스타포스 내부 압축
const S="Tab_StarForce/Panel";
b.patch(S+"/Text_StarGauge", Object.assign({ pos:[0,-75], rect_size:[720,46] }, TC));
b.patch(S+"/StarForceLevel", Object.assign({ pos:[0,-150], rect_size:[700,54] }, TC));
b.patch(S+"/Layout_Prob", Object.assign({ pos:[0,-260], rect_size:[700,140] }, TC));
b.patch(S+"/Text_NoDown", Object.assign({ pos:[0,-352], rect_size:[700,28] }, TC));
b.patch(S+"/Text_LegendOnly", Object.assign({ pos:[0,-400], rect_size:[700,32] }, TC));
b.patch(S+"/Layout_Cost", Object.assign({ pos:[0,175], rect_size:[700,60] }, BC));
b.patch(S+"/Chk_Protect", Object.assign({ pos:[-92,132], rect_size:[28,28] }, BC));
b.patch(S+"/Text_Protect", Object.assign({ pos:[52,132], rect_size:[250,30] }, BC));
b.patch(S+"/Btn_Enchant", Object.assign({ pos:[135,62], rect_size:[240,80] }, BC));
b.patch(S+"/Btn_Restore", Object.assign({ pos:[-135,62], rect_size:[240,80] }, BC));
b.patch(S+"/Text_Footer", Object.assign({ pos:[0,18], rect_size:[720,26] }, BC));

// ── 잠재 내부 압축
const P="Tab_Potential/Layout";
b.patch(P+"/Layout_Before", Object.assign({ pos:[0,-145], rect_size:[700,225] }, TC));
b.patch(P+"/Layout_Before/Img_Grade", Object.assign({ pos:[0,82], rect_size:[660,46] }, MC));
b.patch(P+"/Layout_Before/Text_Opts", Object.assign({ pos:[0,-28], rect_size:[640,140] }, MC));
b.patch(P+"/Layout_After", Object.assign({ pos:[0,-390], rect_size:[700,130] }, TC));
b.patch(P+"/Layout_After/Img_Grade", Object.assign({ pos:[0,38], rect_size:[660,42] }, MC));
b.patch(P+"/Layout_After/Text_Opts", Object.assign({ pos:[0,-22], rect_size:[640,66] }, MC));
b.patch(P+"/Chk_X3", Object.assign({ pos:[-245,-500], rect_size:[28,28] }, TC));
b.patch(P+"/Text_X3", Object.assign({ pos:[-100,-500], rect_size:[230,30] }, TC));
b.patch(P+"/Chk_Keep", Object.assign({ pos:[105,-500], rect_size:[28,28] }, TC));
b.patch(P+"/Text_Keep", Object.assign({ pos:[262,-500], rect_size:[270,30] }, TC));
b.patch(P+"/Layout_Cost", Object.assign({ pos:[0,155], rect_size:[660,60] }, BC));
b.patch(P+"/Btn_OptInfo", Object.assign({ pos:[-240,62], rect_size:[210,76] }, BC));
b.patch(P+"/Btn_Prefer", Object.assign({ pos:[0,62], rect_size:[210,76] }, BC));
b.patch(P+"/Btn_Convert", Object.assign({ pos:[240,62], rect_size:[210,76] }, BC));

// ── 환생 내부 압축
const F="Tab_Flame/Layout";
b.patch(F+"/Img_ItemHdr", Object.assign({ pos:[0,-90], rect_size:[88,88] }, TC));
b.patch(F+"/Text_ItemName", Object.assign({ pos:[0,-165], rect_size:[700,40] }, TC));
b.patch(F+"/Layout_PotenInfo", Object.assign({ pos:[0,-300], rect_size:[700,230] }, TC));
b.patch(F+"/Layout_Cost", Object.assign({ pos:[0,150], rect_size:[700,60] }, BC));
b.patch(F+"/Btn_Ok", Object.assign({ pos:[0,60], rect_size:[260,80] }, BC));

b.write(UI,{strict:false});
console.log("enhance shrink done");
