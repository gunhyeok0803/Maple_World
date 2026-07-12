const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const L = "UIR_SimpleFantasy_Sample_PotentialSelect/Layout";
const TC = { anchor:"top-center", pivot:[0.5,0.5] };
const BC = { anchor:"bottom-center", pivot:[0.5,0.5] };
const MC = { anchor:"middle-center", pivot:[0.5,0.5] };
const PANEL="6e8e561a4582462eaad762cb11d1f835", BLUE="c2660e96661c4a6e8dc8eaa17eb0655c", GRAY="50426b5b1ee44bc5a1c10355b0e9ad03", SLOT="aa931a755e5949699233b817029a3e36";
const c=(r,g,bl,a)=>({r,g,b:bl,a:a===undefined?1:a});
function off(rel){ if(b.find(rel)) b.patch(rel,{enable:false}); }

// 아이템 헤더/슬라이더/화살표/구버튼 숨김(아이템은 중앙 패널)
off(L+"/Img_ItemHdr"); off(L+"/Text_ItemHdr"); off(L+"/Layout_TryCount"); off(L+"/Img_Arrow"); off(L+"/Btn_Cancel"); off(L+"/Deco_Line");

// ── 잠재 옵션 박스 (Layout_Before 재활용)
b.patch(L+"/Layout_Before", Object.assign({ pos:[0,-165], rect_size:[740,235] }, TC));
for(const h of ["Item","Layout_Score","Scroll_Stat","Star","Star_1","Btn_Select","Layout_Top","Deco_Panel_DiaPattern","Deco_Panel_DiaPattern_1"]) off(L+"/Layout_Before/"+h);
b.patch(L+"/Layout_Before/Img_Grade", Object.assign({ pos:[0,88], rect_size:[700,50] }, MC));
b.patch(L+"/Layout_Before/Text_Opts", Object.assign({ pos:[0,-30], rect_size:[680,150] }, MC));

// ── 에디셔널 옵션 박스 (Layout_After 재활용, 잠금)
b.patch(L+"/Layout_After", Object.assign({ pos:[0,-425], rect_size:[740,150] }, TC));
for(const h of ["Item","Layout_Score","Scroll_Stat","Star","Star_1","Btn_Select","Layout_Top","Deco_Panel_DiaPattern","Deco_Panel_DiaPattern_1"]) off(L+"/Layout_After/"+h);
b.patch(L+"/Layout_After/Img_Grade", Object.assign({ pos:[0,45], rect_size:[700,44] }, MC));
b.patch(L+"/Layout_After/Text_Opts", Object.assign({ pos:[0,-30], rect_size:[680,80] }, MC));

// ── 체크박스 2개
b.sprite(L+"/Chk_X3", Object.assign({ pos:[-260,-590], rect_size:[28,28], image_ruid:SLOT }, TC));
b.patchComponent(L+"/Chk_X3","MOD.Core.SpriteGUIRendererComponent",{Color:c(0.18,0.20,0.27)});
b.text(L+"/Text_X3","연속 변환 (x3)", Object.assign({ pos:[-110,-590], rect_size:[240,30], size:18, color:"#C5CBD6", alignment:3 }, TC));
b.sprite(L+"/Chk_Keep", Object.assign({ pos:[120,-590], rect_size:[28,28], image_ruid:SLOT }, TC));
b.patchComponent(L+"/Chk_Keep","MOD.Core.SpriteGUIRendererComponent",{Color:c(0.18,0.20,0.27)});
b.text(L+"/Text_Keep","현재 옵션 기억하기", Object.assign({ pos:[280,-590], rect_size:[280,30], size:18, color:"#C5CBD6", alignment:3 }, TC));

// ── 비용
b.patch(L+"/Layout_Cost", Object.assign({ pos:[0,190], rect_size:[700,60] }, BC));

// ── 버튼 3개
b.button(L+"/Btn_OptInfo","옵션 확률 정보", Object.assign({ pos:[-250,70], rect_size:[220,80], font_size:22, color:"#FFFFFF", image_ruid:GRAY }, BC));
b.button(L+"/Btn_Prefer","선호 옵션 지정", Object.assign({ pos:[0,70], rect_size:[220,80], font_size:22, color:"#FFFFFF", image_ruid:GRAY }, BC));
b.button(L+"/Btn_Convert","변환", Object.assign({ pos:[250,70], rect_size:[220,80], font_size:26, color:"#FFFFFF", image_ruid:BLUE }, BC));

b.write(UI,{strict:false});
console.log("pot rebuild done");
