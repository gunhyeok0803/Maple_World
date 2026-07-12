const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const MC = { anchor:"middle-center", pivot:[0.5,0.5] };
const TC = { anchor:"top-center", pivot:[0.5,0.5] };
const BC = { anchor:"bottom-center", pivot:[0.5,0.5] };
const TEXTS = ["MOD.Core.TextComponent","MOD.Core.TextGUIRendererComponent"];
function fs(rel,s){ for(const ct of TEXTS) if(b.hasComponent(rel,ct)){ b.patchComponent(rel,ct,{FontSize:s}); return; } }

// 창 1280×720 (16:9)
b.patch("Window", Object.assign({ pos:[0,0], rect_size:[1280,720] }, MC));
b.patch("Window/Img_Bg", Object.assign({ pos:[0,0], rect_size:[1280,720] }, MC));
b.patch("Window/Text_WinTitle", { pos:[-470,-12], rect_size:[240,36] });

// 좌열 240×630 — 착용4 + 잠금6(총 10칸), 셀 88 유지
b.patch("Panel_EquipList", Object.assign({ pos:[-505,-30], rect_size:[240,630] }, MC));
b.patch("Panel_EquipList/Img_Bg", Object.assign({ pos:[0,0], rect_size:[240,630] }, MC));
b.patch("Panel_EquipList/Text_Title", { pos:[0,-20] });
const CELLS=[["EquipCell_1",-46,240],["EquipCell_2",46,240],["EquipCell_3",-46,148],["EquipCell_4",46,148]];
for (const [nm,x,y] of CELLS) b.patch("Panel_EquipList/"+nm, Object.assign({ pos:[x,y], rect_size:[88,88] }, MC));
const LOCKS=[[-46,56],[46,56],[-46,-36],[46,-36],[-46,-128],[46,-128]];
for (let i=0;i<6;i++) b.patch("Panel_EquipList/LockCell_"+(i+1), Object.assign({ pos:LOCKS[i], rect_size:[88,88] }, MC));
b.patch("Panel_EquipList/LockCell_7", { enable:false });
b.patch("Panel_EquipList/LockCell_8", { enable:false });
b.patch("Panel_EquipList/Text_Section", Object.assign({ pos:[0,-196], rect_size:[230,22] }, MC));
b.patch("Panel_EquipList/Grid", Object.assign({ pos:[0,-258], rect_size:[230,100] }, MC));

// 중열 280×630
b.patch("Panel_Summary", Object.assign({ pos:[-240,-30], rect_size:[280,630] }, MC));
b.patch("Panel_Summary/Img_Bg", Object.assign({ pos:[0,0], rect_size:[280,630] }, MC));
b.patch("Panel_Summary/Img_ItemSlot", Object.assign({ pos:[0,235], rect_size:[88,88] }, MC));
b.patch("Panel_Summary/Text_Name", Object.assign({ pos:[0,168], rect_size:[250,32] }, MC));
b.patch("Panel_Summary/Line_1", Object.assign({ pos:[0,140], rect_size:[240,4] }, MC));
b.patch("Panel_Summary/Text_ColCur", Object.assign({ pos:[-68,116], rect_size:[130,20] }, MC));
b.patch("Panel_Summary/Text_ColNext", Object.assign({ pos:[86,116], rect_size:[95,20] }, MC));
b.patch("Panel_Summary/Line_2", Object.assign({ pos:[0,96], rect_size:[240,3] }, MC));
b.patch("Panel_Summary/Text_Stats", Object.assign({ pos:[-22,-105], rect_size:[200,360] }, MC));
b.patch("Panel_Summary/Text_StatsNext", Object.assign({ pos:[92,-105], rect_size:[75,360] }, MC));
fs("Panel_Summary/Text_Stats",16); fs("Panel_Summary/Text_StatsNext",16);

// 탭(우열 중심 270)
b.patch("Btn_TabFlame", Object.assign({ pos:[90,318], rect_size:[170,62] }, MC));
b.patch("Btn_TabStar", Object.assign({ pos:[270,318], rect_size:[170,62] }, MC));
b.patch("Btn_TabPot", Object.assign({ pos:[450,318], rect_size:[170,62] }, MC));

// 콘텐츠 680×620 @ [270,-25]
b.patch("Tab_StarForce/Panel", Object.assign({ pos:[270,-25], rect_size:[680,620] }, MC));
b.patch("Tab_Potential/Layout", Object.assign({ pos:[270,-25], rect_size:[680,620] }, MC));
b.patch("Tab_Flame/Layout", Object.assign({ pos:[270,-25], rect_size:[680,620] }, MC));

// 스타포스
const S="Tab_StarForce/Panel";
b.patch(S+"/Text_StarGauge", Object.assign({ pos:[0,-58], rect_size:[640,40] }, TC));
fs(S+"/Text_StarGauge",22);
b.patch(S+"/StarForceLevel", Object.assign({ pos:[0,-120], rect_size:[620,48] }, TC));
b.upsertComponent(S+"/Layout_Prob","MOD.Core.ScrollLayoutGroupComponent",{ "@type":"MOD.Core.ScrollLayoutGroupComponent", Type:0, CellSize:{x:190,y:112}, Spacing:14, ChildAlignment:4, UseScroll:false, Enable:true });
b.patch(S+"/Layout_Prob", Object.assign({ pos:[0,-205], rect_size:[620,120] }, TC));
for (const col of ["Success","Keep","Destroy"]) {
  b.patch(S+"/Layout_Prob/"+col, Object.assign({ pos:[0,0], rect_size:[190,112] }, MC));
  b.patch(S+"/Layout_Prob/"+col+"/PrecentTitle", Object.assign({ pos:[0,34], rect_size:[170,26] }, MC));
  b.patch(S+"/Layout_Prob/"+col+"/PercentBG", Object.assign({ pos:[0,-20], rect_size:[170,56] }, MC));
  fs(S+"/Layout_Prob/"+col+"/PercentBG/Text_Percent",28);
}
b.patch(S+"/Text_NoDown", Object.assign({ pos:[0,-282], rect_size:[620,24] }, TC));
fs(S+"/Text_NoDown",14);
b.patch(S+"/Text_LegendOnly", Object.assign({ pos:[0,-320], rect_size:[620,28] }, TC));
b.patch(S+"/Layout_Cost", Object.assign({ pos:[0,152], rect_size:[600,50] }, BC));
b.patch(S+"/Chk_Protect", Object.assign({ pos:[-85,116], rect_size:[24,24] }, BC));
b.patch(S+"/Text_Protect", Object.assign({ pos:[48,116], rect_size:[230,26] }, BC));
fs(S+"/Text_Protect",16);
b.patch(S+"/Btn_Enchant", Object.assign({ pos:[120,56], rect_size:[210,70] }, BC));
b.patch(S+"/Btn_Restore", Object.assign({ pos:[-120,56], rect_size:[210,70] }, BC));
b.patch(S+"/Text_Footer", Object.assign({ pos:[0,15], rect_size:[640,22] }, BC));
fs(S+"/Text_Footer",13);

// 잠재
const P="Tab_Potential/Layout";
b.patch(P+"/Layout_Before", Object.assign({ pos:[0,-112], rect_size:[620,190] }, TC));
b.patch(P+"/Layout_Before/Img_Grade", Object.assign({ pos:[0,70], rect_size:[580,40] }, MC));
b.patch(P+"/Layout_Before/Text_Opts", Object.assign({ pos:[0,-24], rect_size:[560,115] }, MC));
fs(P+"/Layout_Before/Text_Opts",17);
b.patch(P+"/Layout_After", Object.assign({ pos:[0,-315], rect_size:[620,105] }, TC));
b.patch(P+"/Layout_After/Img_Grade", Object.assign({ pos:[0,30], rect_size:[580,36] }, MC));
b.patch(P+"/Layout_After/Text_Opts", Object.assign({ pos:[0,-18], rect_size:[560,50] }, MC));
fs(P+"/Layout_After/Text_Opts",16);
b.patch(P+"/Chk_X3", Object.assign({ pos:[-220,-398], rect_size:[24,24] }, TC));
b.patch(P+"/Text_X3", Object.assign({ pos:[-92,-398], rect_size:[205,26] }, TC));
fs(P+"/Text_X3",16);
b.patch(P+"/Chk_Keep", Object.assign({ pos:[92,-398], rect_size:[24,24] }, TC));
b.patch(P+"/Text_Keep", Object.assign({ pos:[232,-398], rect_size:[240,26] }, TC));
fs(P+"/Text_Keep",16);
b.patch(P+"/Layout_Cost", Object.assign({ pos:[0,128], rect_size:[580,50] }, BC));
b.patch(P+"/Btn_OptInfo", Object.assign({ pos:[-205,52], rect_size:[185,66] }, BC));
b.patch(P+"/Btn_Prefer", Object.assign({ pos:[0,52], rect_size:[185,66] }, BC));
b.patch(P+"/Btn_Convert", Object.assign({ pos:[205,52], rect_size:[185,66] }, BC));

// 환생
const F="Tab_Flame/Layout";
b.patch(F+"/Img_ItemHdr", Object.assign({ pos:[0,-70], rect_size:[76,76] }, TC));
b.patch(F+"/Text_ItemName", Object.assign({ pos:[0,-128], rect_size:[620,34] }, TC));
b.patch(F+"/Layout_PotenInfo", Object.assign({ pos:[0,-232], rect_size:[620,185] }, TC));
b.patch(F+"/Layout_Cost", Object.assign({ pos:[0,125], rect_size:[600,50] }, BC));
b.patch(F+"/Btn_Ok", Object.assign({ pos:[0,48], rect_size:[230,70] }, BC));

b.write(UI,{strict:false});
console.log("enhance 1280x720 done");
