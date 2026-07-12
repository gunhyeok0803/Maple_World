const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui";
const b = UIBuilder.read(UI);
const MC = { anchor:"middle-center", pivot:[0.5,0.5] };

// 창 1360×860 + 타이틀/탭
b.patch("Window", Object.assign({ pos:[0,0], rect_size:[1360,860] }, MC));
b.patch("Window/Img_Bg", Object.assign({ pos:[0,0], rect_size:[1360,860] }, MC));
b.patch("Window/Text_WinTitle", { pos:[-555,-14], rect_size:[190,40] });
b.patch("Btn_TabPromote", Object.assign({ pos:[-355,385], rect_size:[185,70] }, MC));
b.patch("Btn_TabColl", Object.assign({ pos:[-160,385], rect_size:[185,70] }, MC));

// 승급 1280×700
b.patch("Panel_Promote", Object.assign({ pos:[0,-40], rect_size:[1280,700] }, MC));
const P="Panel_Promote";
b.patch(P+"/Card_List", Object.assign({ pos:[-470,0], rect_size:[270,700] }, MC));
b.patch(P+"/Text_ListTitle", Object.assign({ pos:[-470,322], rect_size:[250,26] }, MC));
b.patch(P+"/Grid", Object.assign({ pos:[-470,-25], rect_size:[250,580] }, MC));
b.patch(P+"/Card_Info", Object.assign({ pos:[170,0], rect_size:[900,700] }, MC));
b.patch(P+"/Img_From", Object.assign({ pos:[-10,200], rect_size:[96,96] }, MC));
b.patch(P+"/Text_Arrow", Object.assign({ pos:[170,200], rect_size:[96,52] }, MC));
b.patch(P+"/Img_To", Object.assign({ pos:[350,200], rect_size:[96,96] }, MC));
b.patch(P+"/Text_Target", Object.assign({ pos:[170,105], rect_size:[820,40] }, MC));
b.patch(P+"/Text_Rate", Object.assign({ pos:[170,60], rect_size:[580,26] }, MC));
b.patch(P+"/Text_Need", Object.assign({ pos:[170,-15], rect_size:[820,105] }, MC));
b.patch(P+"/Btn_Minus", Object.assign({ pos:[60,-130], rect_size:[60,60] }, MC));
b.patch(P+"/Text_Times", Object.assign({ pos:[170,-130], rect_size:[130,44] }, MC));
b.patch(P+"/Btn_Plus", Object.assign({ pos:[280,-130], rect_size:[60,60] }, MC));
b.patch(P+"/Btn_Max", Object.assign({ pos:[380,-130], rect_size:[95,60] }, MC));
b.patch(P+"/Text_Result", Object.assign({ pos:[170,-205], rect_size:[820,46] }, MC));
b.patch(P+"/Btn_Action", Object.assign({ pos:[170,-285], rect_size:[250,80] }, MC));

// 컬렉션 1280×700
b.patch("Panel_Coll", Object.assign({ pos:[0,-40], rect_size:[1280,700] }, MC));
const C="Panel_Coll";
b.patch(C+"/Card_Book", Object.assign({ pos:[-225,0], rect_size:[790,700] }, MC));
const TABX=[-545,-423,-301,-179,-57,65];
for (let i=0;i<6;i++) b.patch(C+"/PartTab_"+(i+1), Object.assign({ pos:[TABX[i],292], rect_size:[118,56] }, MC));
const COLX=[-470,-325,-180,-35], ROWY=[135,0,-135];
for (let g=0;g<4;g++) b.patch(C+"/Text_ColG"+(g+1), Object.assign({ pos:[COLX[g],212], rect_size:[105,24] }, MC));
for (let r=0;r<3;r++) b.patch(C+"/Text_RowLv"+(r+1), Object.assign({ pos:[-580,ROWY[r]], rect_size:[85,26] }, MC));
for (let r=0;r<3;r++) for (let g=0;g<4;g++) {
  const nm=C+"/BookCell_"+(r+1)+"_"+(g+1);
  b.patch(nm, Object.assign({ pos:[COLX[g],ROWY[r]], rect_size:[104,104] }, MC));
  b.patch(nm+"/Icon", Object.assign({ pos:[0,4], rect_size:[50,50] }, MC));
  b.patch(nm+"/Sel", Object.assign({ pos:[0,0], rect_size:[110,110] }, MC));
  b.patch(nm+"/Count", Object.assign({ pos:[22,-36], rect_size:[58,19] }, MC));
  b.patch(nm+"/Reg", Object.assign({ pos:[-22,38], rect_size:[58,19] }, MC));
}
b.patch(C+"/Text_BookHint", Object.assign({ pos:[-225,-305], rect_size:[760,24] }, MC));
b.patch(C+"/Card_Info", Object.assign({ pos:[415,0], rect_size:[380,700] }, MC));
b.patch(C+"/Img_BookSlot", Object.assign({ pos:[415,235], rect_size:[104,104] }, MC));
b.patch(C+"/Img_BookSlot/Icon", Object.assign({ pos:[0,0], rect_size:[60,60] }, MC));
b.patch(C+"/Text_Target", Object.assign({ pos:[415,135], rect_size:[360,38] }, MC));
b.patch(C+"/Text_RateColl", Object.assign({ pos:[415,98], rect_size:[360,24] }, MC));
b.patch(C+"/Text_Need", Object.assign({ pos:[415,30], rect_size:[360,100] }, MC));
b.patch(C+"/Text_BookBonus", Object.assign({ pos:[415,-55], rect_size:[360,72] }, MC));
b.patch(C+"/Btn_Minus", Object.assign({ pos:[330,-135], rect_size:[52,52] }, MC));
b.patch(C+"/Text_Times", Object.assign({ pos:[405,-135], rect_size:[72,38] }, MC));
b.patch(C+"/Btn_Plus", Object.assign({ pos:[473,-135], rect_size:[52,52] }, MC));
b.patch(C+"/Btn_Max", Object.assign({ pos:[540,-135], rect_size:[78,52] }, MC));
b.patch(C+"/Text_Result", Object.assign({ pos:[415,-210], rect_size:[355,56] }, MC));
b.patch(C+"/Btn_Action", Object.assign({ pos:[415,-285], rect_size:[230,76] }, MC));

b.write(UI,{strict:false});
console.log("promote shrink2 done");
