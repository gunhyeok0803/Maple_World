const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui";
const b = UIBuilder.read(UI);
const MC = { anchor:"middle-center", pivot:[0.5,0.5] };
const TEXTS = ["MOD.Core.TextComponent","MOD.Core.TextGUIRendererComponent"];
function fs(rel,s){ for(const ct of TEXTS) if(b.hasComponent(rel,ct)){ b.patchComponent(rel,ct,{FontSize:s}); return; } }

// 창 1280×720 + 타이틀/탭
b.patch("Window", Object.assign({ pos:[0,0], rect_size:[1280,720] }, MC));
b.patch("Window/Img_Bg", Object.assign({ pos:[0,0], rect_size:[1280,720] }, MC));
b.patch("Window/Text_WinTitle", { pos:[-520,-12], rect_size:[180,36] });
b.patch("Btn_TabPromote", Object.assign({ pos:[-330,318], rect_size:[175,62] }, MC));
b.patch("Btn_TabColl", Object.assign({ pos:[-148,318], rect_size:[175,62] }, MC));

// 승급 1200×600
b.patch("Panel_Promote", Object.assign({ pos:[0,-35], rect_size:[1200,600] }, MC));
const P="Panel_Promote";
b.patch(P+"/Card_List", Object.assign({ pos:[-440,0], rect_size:[250,600] }, MC));
b.patch(P+"/Text_ListTitle", Object.assign({ pos:[-440,272], rect_size:[235,24] }, MC));
fs(P+"/Text_ListTitle",14);
b.patch(P+"/Grid", Object.assign({ pos:[-440,-20], rect_size:[230,480] }, MC));
b.patch(P+"/Card_Info", Object.assign({ pos:[160,0], rect_size:[850,600] }, MC));
b.patch(P+"/Img_From", Object.assign({ pos:[-10,168], rect_size:[88,88] }, MC));
b.patch(P+"/Text_Arrow", Object.assign({ pos:[160,168], rect_size:[88,48] }, MC));
b.patch(P+"/Img_To", Object.assign({ pos:[330,168], rect_size:[88,88] }, MC));
b.patch(P+"/Text_Target", Object.assign({ pos:[160,85], rect_size:[780,36] }, MC));
b.patch(P+"/Text_Rate", Object.assign({ pos:[160,45], rect_size:[560,24] }, MC));
fs(P+"/Text_Rate",16);
b.patch(P+"/Text_Need", Object.assign({ pos:[160,-22], rect_size:[780,95] }, MC));
fs(P+"/Text_Need",16);
b.patch(P+"/Btn_Minus", Object.assign({ pos:[58,-118], rect_size:[54,54] }, MC));
b.patch(P+"/Text_Times", Object.assign({ pos:[160,-118], rect_size:[115,40] }, MC));
b.patch(P+"/Btn_Plus", Object.assign({ pos:[260,-118], rect_size:[54,54] }, MC));
b.patch(P+"/Btn_Max", Object.assign({ pos:[350,-118], rect_size:[85,54] }, MC));
b.patch(P+"/Text_Result", Object.assign({ pos:[160,-183], rect_size:[780,42] }, MC));
fs(P+"/Text_Result",16);
b.patch(P+"/Btn_Action", Object.assign({ pos:[160,-248], rect_size:[230,72] }, MC));

// 컬렉션 1200×600
b.patch("Panel_Coll", Object.assign({ pos:[0,-35], rect_size:[1200,600] }, MC));
const C="Panel_Coll";
b.patch(C+"/Card_Book", Object.assign({ pos:[-210,0], rect_size:[740,600] }, MC));
const TABX=[-510,-396,-282,-168,-54,60];
for (let i=0;i<6;i++) b.patch(C+"/PartTab_"+(i+1), Object.assign({ pos:[TABX[i],250], rect_size:[110,50] }, MC));
const COLX=[-440,-305,-170,-35], ROWY=[110,-12,-134];
for (let g=0;g<4;g++) { b.patch(C+"/Text_ColG"+(g+1), Object.assign({ pos:[COLX[g],180], rect_size:[100,22] }, MC)); fs(C+"/Text_ColG"+(g+1),14); }
for (let r=0;r<3;r++) { b.patch(C+"/Text_RowLv"+(r+1), Object.assign({ pos:[-545,ROWY[r]], rect_size:[80,24] }, MC)); fs(C+"/Text_RowLv"+(r+1),16); }
for (let r=0;r<3;r++) for (let g=0;g<4;g++) {
  const nm=C+"/BookCell_"+(r+1)+"_"+(g+1);
  b.patch(nm, Object.assign({ pos:[COLX[g],ROWY[r]], rect_size:[96,96] }, MC));
  b.patch(nm+"/Icon", Object.assign({ pos:[0,3], rect_size:[46,46] }, MC));
  b.patch(nm+"/Sel", Object.assign({ pos:[0,0], rect_size:[102,102] }, MC));
  b.patch(nm+"/Count", Object.assign({ pos:[20,-33], rect_size:[54,18] }, MC));
  b.patch(nm+"/Reg", Object.assign({ pos:[-20,35], rect_size:[54,18] }, MC));
}
b.patch(C+"/Text_BookHint", Object.assign({ pos:[-210,-262], rect_size:[700,22] }, MC));
fs(C+"/Text_BookHint",14);
b.patch(C+"/Card_Info", Object.assign({ pos:[390,0], rect_size:[350,600] }, MC));
b.patch(C+"/Img_BookSlot", Object.assign({ pos:[390,200], rect_size:[96,96] }, MC));
b.patch(C+"/Img_BookSlot/Icon", Object.assign({ pos:[0,0], rect_size:[56,56] }, MC));
b.patch(C+"/Text_Target", Object.assign({ pos:[390,108], rect_size:[330,34] }, MC));
fs(C+"/Text_Target",18);
b.patch(C+"/Text_RateColl", Object.assign({ pos:[390,74], rect_size:[330,22] }, MC));
fs(C+"/Text_RateColl",14);
b.patch(C+"/Text_Need", Object.assign({ pos:[390,12], rect_size:[330,92] }, MC));
fs(C+"/Text_Need",16);
b.patch(C+"/Text_BookBonus", Object.assign({ pos:[390,-64], rect_size:[330,64] }, MC));
fs(C+"/Text_BookBonus",15);
b.patch(C+"/Btn_Minus", Object.assign({ pos:[312,-128], rect_size:[48,48] }, MC));
b.patch(C+"/Text_Times", Object.assign({ pos:[382,-128], rect_size:[64,34] }, MC));
b.patch(C+"/Btn_Plus", Object.assign({ pos:[444,-128], rect_size:[48,48] }, MC));
b.patch(C+"/Btn_Max", Object.assign({ pos:[506,-128], rect_size:[70,48] }, MC));
b.patch(C+"/Text_Result", Object.assign({ pos:[390,-192], rect_size:[330,50] }, MC));
fs(C+"/Text_Result",15);
b.patch(C+"/Btn_Action", Object.assign({ pos:[390,-252], rect_size:[210,68] }, MC));

b.write(UI,{strict:false});
console.log("promote 1280x720 done");
