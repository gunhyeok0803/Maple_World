const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const P = "Popup_PotInfo";
const FRAME = "2ea3f873108a4538849929efeb21df38"; // Core_Base Base_Info_01
const HEADBG = "552a11490267476daec41dac4e8fd920"; // Core_Base Base_Card_01
const LINE = "66b6a9dde07b4c3abb90c16c0feeed3f";
const CLOSE = "d3c48528"; // (not used)
const MC = { anchor:"middle-center", pivot:[0.5,0.5] };
const c=(r,g,bl,a)=>({r,g,b:bl,a:a===undefined?1:a});
const OIL = { OrderInLayer: 120 };
function oil(rel){ if(b.hasComponent(rel,"MOD.Core.SpriteGUIRendererComponent")) b.patchComponent(rel,"MOD.Core.SpriteGUIRendererComponent",OIL); for(const ct of ["MOD.Core.TextComponent","MOD.Core.TextGUIRendererComponent"]) if(b.hasComponent(rel,ct)) b.patchComponent(rel,ct,OIL); }

// 팝업 컨테이너(부모 먼저 생성)
b.panel(P, Object.assign({ pos:[0,0], rect_size:[1920,1080] }, MC));
// 딤머(전체화면, 클릭 닫기)
b.sprite(P+"/Dimmer", Object.assign({ pos:[0,0], rect_size:[1920,1080], image_ruid:FRAME, raycast:true }, MC));
b.patchComponent(P+"/Dimmer","MOD.Core.SpriteGUIRendererComponent",{ Color:c(0,0,0,0.6), OrderInLayer:118 });
b.upsertComponent(P+"/Dimmer","MOD.Core.ButtonComponent");
// 프레임
b.sprite(P+"/Frame", Object.assign({ pos:[0,0], rect_size:[660,780], image_ruid:FRAME, sprite_type:1 }, MC));
b.patchComponent(P+"/Frame","MOD.Core.SpriteGUIRendererComponent",{ Color:c(0.07,0.09,0.13,0.98), OrderInLayer:120 });
// 타이틀 + 닫기
b.text(P+"/Frame/Title","잠재 옵션 확률 정보", Object.assign({ pos:[0,330], rect_size:[600,44], size:28, color:"#EDF2F8", alignment:4 }, MC));
b.button(P+"/Frame/Btn_Close","X", Object.assign({ pos:[295,335], rect_size:[52,52], font_size:26, color:"#FFFFFF", image_ruid:"50426b5b1ee44bc5a1c10355b0e9ad03" }, MC));
// 등급업
b.text(P+"/Frame/Text_GradeUp","등급 업   —", Object.assign({ pos:[0,270], rect_size:[600,32], size:20, color:"#7FB0FF", alignment:4 }, MC));
// 헤더
b.text(P+"/Frame/H_Opt","옵션", Object.assign({ pos:[-200,215], rect_size:[220,28], size:18, color:"#9AA4B2", alignment:3 }, MC));
b.text(P+"/Frame/H_Val","수치", Object.assign({ pos:[40,215], rect_size:[120,28], size:18, color:"#9AA4B2", alignment:4 }, MC));
b.text(P+"/Frame/H_Rate","등장 확률", Object.assign({ pos:[220,215], rect_size:[140,28], size:18, color:"#9AA4B2", alignment:5 }, MC));
b.sprite(P+"/Frame/HLine", Object.assign({ pos:[0,192], rect_size:[600,3], image_ruid:LINE }, MC));
b.patchComponent(P+"/Frame/HLine","MOD.Core.SpriteGUIRendererComponent",{ Color:c(0.3,0.34,0.4) });
// 8행(옵션/수치/등장확률)
for (let i=1;i<=8;i++){
  const y = 150 - (i-1)*50;
  b.text(P+"/Frame/Opt_"+i,"", Object.assign({ pos:[-200,y], rect_size:[240,40], size:18, color:"#E4E9F0", alignment:3 }, MC));
  b.text(P+"/Frame/Val_"+i,"", Object.assign({ pos:[40,y], rect_size:[120,40], size:18, color:"#E4E9F0", alignment:4 }, MC));
  b.text(P+"/Frame/Rate_"+i,"", Object.assign({ pos:[220,y], rect_size:[150,40], size:18, color:"#8BD67F", alignment:5 }, MC));
}
// 모든 팝업 텍스트/스프라이트 OrderInLayer 상향(창 위에 뜨게)
for (const e of b.listEntities()){ if(e.path.startsWith("/ui/EnhanceGroup/"+P+"/")) oil(e.path.replace("/ui/EnhanceGroup/","")); }
// 초기 숨김
b.patch(P, { enable:false });
b.write(UI,{strict:false});
console.log("potinfo popup built");
