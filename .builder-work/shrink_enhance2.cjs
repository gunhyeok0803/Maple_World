const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const MC = { anchor:"middle-center", pivot:[0.5,0.5] };
const TC = { anchor:"top-center", pivot:[0.5,0.5] };
const BC = { anchor:"bottom-center", pivot:[0.5,0.5] };

// 창 1360×860
b.patch("Window", Object.assign({ pos:[0,0], rect_size:[1360,860] }, MC));
b.patch("Window/Img_Bg", Object.assign({ pos:[0,0], rect_size:[1360,860] }, MC));
b.patch("Window/Text_WinTitle", { pos:[-500,-14], rect_size:[260,40] });

// 좌열 270×750
b.patch("Panel_EquipList", Object.assign({ pos:[-530,-35], rect_size:[270,750] }, MC));
b.patch("Panel_EquipList/Img_Bg", Object.assign({ pos:[0,0], rect_size:[270,750] }, MC));
b.patch("Panel_EquipList/Text_Title", { pos:[0,-24] });
const CELLS=[["EquipCell_1",-46,280],["EquipCell_2",46,280],["EquipCell_3",-46,188],["EquipCell_4",46,188]];
for (const [nm,x,y] of CELLS) b.patch("Panel_EquipList/"+nm, Object.assign({ pos:[x,y], rect_size:[88,88] }, MC));
const LOCKS=[[-46,96],[46,96],[-46,4],[46,4],[-46,-88],[46,-88],[-46,-180],[46,-180]];
for (let i=0;i<8;i++) b.patch("Panel_EquipList/LockCell_"+(i+1), Object.assign({ pos:LOCKS[i], rect_size:[88,88] }, MC));
b.patch("Panel_EquipList/Text_Section", Object.assign({ pos:[0,-250], rect_size:[250,24] }, MC));
b.patch("Panel_EquipList/Grid", Object.assign({ pos:[0,-315], rect_size:[250,105] }, MC));

// 중열 310×750
b.patch("Panel_Summary", Object.assign({ pos:[-245,-35], rect_size:[310,750] }, MC));
b.patch("Panel_Summary/Img_Bg", Object.assign({ pos:[0,0], rect_size:[310,750] }, MC));
b.patch("Panel_Summary/Img_ItemSlot", Object.assign({ pos:[0,280], rect_size:[96,96] }, MC));
b.patch("Panel_Summary/Text_Name", Object.assign({ pos:[0,205], rect_size:[280,34] }, MC));
b.patch("Panel_Summary/Line_1", Object.assign({ pos:[0,172], rect_size:[270,5] }, MC));
b.patch("Panel_Summary/Text_ColCur", Object.assign({ pos:[-78,144], rect_size:[145,22] }, MC));
b.patch("Panel_Summary/Text_ColNext", Object.assign({ pos:[96,144], rect_size:[105,22] }, MC));
b.patch("Panel_Summary/Line_2", Object.assign({ pos:[0,122], rect_size:[270,3] }, MC));
b.patch("Panel_Summary/Text_Stats", Object.assign({ pos:[-25,-115], rect_size:[215,420] }, MC));
b.patch("Panel_Summary/Text_StatsNext", Object.assign({ pos:[100,-115], rect_size:[85,420] }, MC));

// 탭(우열 중심 295)
b.patch("Btn_TabFlame", Object.assign({ pos:[95,385], rect_size:[185,70] }, MC));
b.patch("Btn_TabStar", Object.assign({ pos:[295,385], rect_size:[185,70] }, MC));
b.patch("Btn_TabPot", Object.assign({ pos:[495,385], rect_size:[185,70] }, MC));

// 콘텐츠 750×750 @ [295,-30]
b.patch("Tab_StarForce/Panel", Object.assign({ pos:[295,-30], rect_size:[750,750] }, MC));
b.patch("Tab_Potential/Layout", Object.assign({ pos:[295,-30], rect_size:[750,750] }, MC));
b.patch("Tab_Flame/Layout", Object.assign({ pos:[295,-30], rect_size:[750,750] }, MC));

// 스타포스
const S="Tab_StarForce/Panel";
b.patch(S+"/Text_StarGauge", Object.assign({ pos:[0,-68], rect_size:[700,44] }, TC));
b.patch(S+"/StarForceLevel", Object.assign({ pos:[0,-138], rect_size:[680,52] }, TC));
b.patch(S+"/Layout_Prob", Object.assign({ pos:[0,-238], rect_size:[680,135] }, TC));
b.patch(S+"/Text_NoDown", Object.assign({ pos:[0,-322], rect_size:[680,26] }, TC));
b.patch(S+"/Text_LegendOnly", Object.assign({ pos:[0,-365], rect_size:[680,30] }, TC));
b.patch(S+"/Layout_Cost", Object.assign({ pos:[0,185], rect_size:[660,56] }, BC));
b.patch(S+"/Chk_Protect", Object.assign({ pos:[-90,143], rect_size:[26,26] }, BC));
b.patch(S+"/Text_Protect", Object.assign({ pos:[50,143], rect_size:[240,28] }, BC));
b.patch(S+"/Btn_Enchant", Object.assign({ pos:[130,74], rect_size:[230,78] }, BC));
b.patch(S+"/Btn_Restore", Object.assign({ pos:[-130,74], rect_size:[230,78] }, BC));
b.patch(S+"/Text_Footer", Object.assign({ pos:[0,22], rect_size:[700,24] }, BC));

// 잠재
const P="Tab_Potential/Layout";
b.patch(P+"/Layout_Before", Object.assign({ pos:[0,-135], rect_size:[680,215] }, TC));
b.patch(P+"/Layout_Before/Img_Grade", Object.assign({ pos:[0,80], rect_size:[640,44] }, MC));
b.patch(P+"/Layout_Before/Text_Opts", Object.assign({ pos:[0,-26], rect_size:[620,135] }, MC));
b.patch(P+"/Layout_After", Object.assign({ pos:[0,-365], rect_size:[680,120] }, TC));
b.patch(P+"/Layout_After/Img_Grade", Object.assign({ pos:[0,35], rect_size:[640,40] }, MC));
b.patch(P+"/Layout_After/Text_Opts", Object.assign({ pos:[0,-20], rect_size:[620,58] }, MC));
b.patch(P+"/Chk_X3", Object.assign({ pos:[-240,-462], rect_size:[26,26] }, TC));
b.patch(P+"/Text_X3", Object.assign({ pos:[-100,-462], rect_size:[225,28] }, TC));
b.patch(P+"/Chk_Keep", Object.assign({ pos:[100,-462], rect_size:[26,26] }, TC));
b.patch(P+"/Text_Keep", Object.assign({ pos:[255,-462], rect_size:[265,28] }, TC));
b.patch(P+"/Layout_Cost", Object.assign({ pos:[0,150], rect_size:[640,56] }, BC));
b.patch(P+"/Btn_OptInfo", Object.assign({ pos:[-230,60], rect_size:[205,74] }, BC));
b.patch(P+"/Btn_Prefer", Object.assign({ pos:[0,60], rect_size:[205,74] }, BC));
b.patch(P+"/Btn_Convert", Object.assign({ pos:[230,60], rect_size:[205,74] }, BC));

// 환생
const F="Tab_Flame/Layout";
b.patch(F+"/Img_ItemHdr", Object.assign({ pos:[0,-82], rect_size:[84,84] }, TC));
b.patch(F+"/Text_ItemName", Object.assign({ pos:[0,-150], rect_size:[680,38] }, TC));
b.patch(F+"/Layout_PotenInfo", Object.assign({ pos:[0,-275], rect_size:[680,210] }, TC));
b.patch(F+"/Layout_Cost", Object.assign({ pos:[0,145], rect_size:[660,56] }, BC));
b.patch(F+"/Btn_Ok", Object.assign({ pos:[0,58], rect_size:[250,78] }, BC));

b.write(UI,{strict:false});
console.log("enhance shrink2 done");
