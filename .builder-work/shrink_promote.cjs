const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui";
const b = UIBuilder.read(UI);
const MC = { anchor:"middle-center", pivot:[0.5,0.5] };

// ── 창 1440×920 + 탭
b.patch("Window", Object.assign({ pos:[0,0], rect_size:[1440,920] }, MC));
b.patch("Window/Img_Bg", Object.assign({ pos:[0,0], rect_size:[1440,920] }, MC));
b.patch("Window/Text_WinTitle", { pos:[-500,-14], rect_size:[300,40] });
b.patch("Btn_TabPromote", Object.assign({ pos:[-420,415], rect_size:[190,74] }, MC));
b.patch("Btn_TabColl", Object.assign({ pos:[-220,415], rect_size:[190,74] }, MC));

// ── 승급 패널 1360×760
b.patch("Panel_Promote", Object.assign({ pos:[0,-45], rect_size:[1360,760] }, MC));
const P="Panel_Promote";
b.patch(P+"/Card_List", Object.assign({ pos:[-500,0], rect_size:[280,760] }, MC));
b.patch(P+"/Text_ListTitle", Object.assign({ pos:[-500,352], rect_size:[260,28] }, MC));
b.patch(P+"/Grid", Object.assign({ pos:[-500,-25], rect_size:[260,620] }, MC));
b.patch(P+"/Card_Info", Object.assign({ pos:[180,0], rect_size:[960,760] }, MC));
b.patch(P+"/Img_From", Object.assign({ pos:[-20,225], rect_size:[100,100] }, MC));
b.patch(P+"/Img_From/Icon", Object.assign({ pos:[0,0], rect_size:[60,60] }, MC));
b.patch(P+"/Text_Arrow", Object.assign({ pos:[180,225], rect_size:[100,56] }, MC));
b.patch(P+"/Img_To", Object.assign({ pos:[380,225], rect_size:[100,100] }, MC));
b.patch(P+"/Img_To/Icon", Object.assign({ pos:[0,0], rect_size:[60,60] }, MC));
b.patch(P+"/Text_Target", Object.assign({ pos:[180,120], rect_size:[880,42] }, MC));
b.patch(P+"/Text_Rate", Object.assign({ pos:[180,72], rect_size:[600,28] }, MC));
b.patch(P+"/Text_Need", Object.assign({ pos:[180,-5], rect_size:[880,110] }, MC));
b.patch(P+"/Btn_Minus", Object.assign({ pos:[65,-130], rect_size:[64,64] }, MC));
b.patch(P+"/Text_Times", Object.assign({ pos:[180,-130], rect_size:[140,46] }, MC));
b.patch(P+"/Btn_Plus", Object.assign({ pos:[295,-130], rect_size:[64,64] }, MC));
b.patch(P+"/Btn_Max", Object.assign({ pos:[402,-130], rect_size:[100,64] }, MC));
b.patch(P+"/Text_Result", Object.assign({ pos:[180,-215], rect_size:[880,50] }, MC));
b.patch(P+"/Btn_Action", Object.assign({ pos:[180,-310], rect_size:[260,84] }, MC));

// ── 컬렉션 패널 1360×760
b.patch("Panel_Coll", Object.assign({ pos:[0,-45], rect_size:[1360,760] }, MC));
const C="Panel_Coll";
b.patch(C+"/Card_Book", Object.assign({ pos:[-240,0], rect_size:[840,760] }, MC));
const TABX=[-580,-450,-320,-190,-60,70];
for (let i=0;i<6;i++) b.patch(C+"/PartTab_"+(i+1), Object.assign({ pos:[TABX[i],320], rect_size:[126,60] }, MC));
const COLX=[-500,-345,-190,-35], ROWY=[150,5,-140];
for (let g=0;g<4;g++) b.patch(C+"/Text_ColG"+(g+1), Object.assign({ pos:[COLX[g],235], rect_size:[110,26] }, MC));
for (let r=0;r<3;r++) b.patch(C+"/Text_RowLv"+(r+1), Object.assign({ pos:[-615,ROWY[r]], rect_size:[90,28] }, MC));
for (let r=0;r<3;r++) for (let g=0;g<4;g++) {
  const nm=C+"/BookCell_"+(r+1)+"_"+(g+1);
  b.patch(nm, Object.assign({ pos:[COLX[g],ROWY[r]], rect_size:[110,110] }, MC));
  b.patch(nm+"/Icon", Object.assign({ pos:[0,4], rect_size:[52,52] }, MC));
  b.patch(nm+"/Sel", Object.assign({ pos:[0,0], rect_size:[116,116] }, MC));
  b.patch(nm+"/Count", Object.assign({ pos:[24,-38], rect_size:[60,20] }, MC));
  b.patch(nm+"/Reg", Object.assign({ pos:[-24,40], rect_size:[60,20] }, MC));
}
b.patch(C+"/Text_BookHint", Object.assign({ pos:[-240,-330], rect_size:[800,26] }, MC));
b.patch(C+"/Card_Info", Object.assign({ pos:[440,0], rect_size:[400,760] }, MC));
b.patch(C+"/Img_BookSlot", Object.assign({ pos:[440,255], rect_size:[110,110] }, MC));
b.patch(C+"/Img_BookSlot/Icon", Object.assign({ pos:[0,0], rect_size:[64,64] }, MC));
b.patch(C+"/Text_Target", Object.assign({ pos:[440,150], rect_size:[380,40] }, MC));
b.patch(C+"/Text_RateColl", Object.assign({ pos:[440,110], rect_size:[380,26] }, MC));
b.patch(C+"/Text_Need", Object.assign({ pos:[440,40], rect_size:[380,110] }, MC));
b.patch(C+"/Text_BookBonus", Object.assign({ pos:[440,-50], rect_size:[380,80] }, MC));
b.patch(C+"/Btn_Minus", Object.assign({ pos:[345,-140], rect_size:[56,56] }, MC));
b.patch(C+"/Text_Times", Object.assign({ pos:[425,-140], rect_size:[80,40] }, MC));
b.patch(C+"/Btn_Plus", Object.assign({ pos:[500,-140], rect_size:[56,56] }, MC));
b.patch(C+"/Btn_Max", Object.assign({ pos:[572,-140], rect_size:[84,56] }, MC));
b.patch(C+"/Text_Result", Object.assign({ pos:[440,-225], rect_size:[380,60] }, MC));
b.patch(C+"/Btn_Action", Object.assign({ pos:[440,-310], rect_size:[240,80] }, MC));

b.write(UI,{strict:false});
console.log("promote shrink done");
