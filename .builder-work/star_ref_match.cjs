const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const S = "UIR_SimpleFantasy_Sample_StarForce/Panel";
const TC = { anchor: "top-center", pivot: [0.5, 0.5] };
const BC = { anchor: "bottom-center", pivot: [0.5, 0.5] };
const TEXTS = ["MOD.Core.TextComponent", "MOD.Core.TextGUIRendererComponent"];
function txt(rel, opt) { // {text,color,size}
  for (const ct of TEXTS) if (b.hasComponent(rel, ct)) {
    const u = {};
    if (opt.text !== undefined) u.Text = opt.text;
    if (opt.color !== undefined) u.FontColor = opt.color;
    if (opt.size !== undefined) u.FontSize = opt.size;
    b.patchComponent(rel, ct, u); return true;
  }
  return false;
}
const c = (r,g,bl,a) => ({ r, g, b: bl, a: a===undefined?1:a });

// 1) 별: 그래픽 숨김, 텍스트 게이지 복귀(금색, 큼)
for (let i=1;i<=20;i++) b.patch(S+"/Star_"+i, { enable:false });
b.patch(S+"/Text_StarGauge", Object.assign({ enable:true, pos:[0,-92], rect_size:[700,50] }, TC));
txt(S+"/Text_StarGauge", { color: c(0.96,0.77,0.26), size: 34 });

// 2) 3▶4 크게
b.patch(S+"/StarForceLevel", Object.assign({ pos:[0,-172], rect_size:[700,60] }, TC));

// 3) 확률 3박스(성공/실패(유지)/파괴) — 하락 숨김
b.patch(S+"/Layout_Prob/Decrease", { enable:false });
b.upsertComponent(S+"/Layout_Prob", "MOD.Core.ScrollLayoutGroupComponent", {
  "@type":"MOD.Core.ScrollLayoutGroupComponent", Type:0, CellSize:{x:214,y:126}, Spacing:16, ChildAlignment:4, UseScroll:false, Enable:true });
b.patch(S+"/Layout_Prob", Object.assign({ pos:[0,-300], rect_size:[720,140] }, TC));
const MC = { anchor:"middle-center", pivot:[0.5,0.5] };
const boxes = [["Success","성공",c(0.36,0.85,0.36)],["Keep","실패 (유지)",c(1,1,1)],["Destroy","파괴",c(1,0.36,0.36)]];
for (const [col,label,valColor] of boxes) {
  const base = S+"/Layout_Prob/"+col;
  // 라벨(위)
  b.patch(base+"/PrecentTitle", Object.assign({ pos:[0,40], rect_size:[200,28] }, MC));
  txt(base+"/PrecentTitle/Text_Label", { text: label, color: c(0.80,0.84,0.90), size: 18 });
  // 값 박스(아래, 어둡게 + 큰 값)
  b.patch(base+"/PercentBG", Object.assign({ pos:[0,-24], rect_size:[200,66] }, MC));
  b.patchComponent(base+"/PercentBG", "MOD.Core.SpriteGUIRendererComponent", { Color: c(0.12,0.14,0.20) });
  txt(base+"/PercentBG/Text_Percent", { color: valColor, size: 36 });
}

// 4) 하락 안내문
b.text(S+"/Text_NoDown", "ⓘ 실패 시 강화 단계가 하락하지 않습니다.", Object.assign({ pos:[0,-392], rect_size:[700,28], size:16, color:"#E6B84D", alignment:4 }, TC));

// 5) 강화 비용(가독)
b.patch(S+"/Layout_Cost", Object.assign({ pos:[0,-455], rect_size:[700,60] }, TC));

// 6) 파괴 보호권 사용 체크박스(시각 목업)
b.sprite(S+"/Chk_Protect", Object.assign({ pos:[-140,-520], rect_size:[30,30], image_ruid:"aa931a755e5949699233b817029a3e36" }, TC));
b.patchComponent(S+"/Chk_Protect", "MOD.Core.SpriteGUIRendererComponent", { Color: c(0.18,0.20,0.27) });
b.text(S+"/Text_Protect", "파괴 보호권 사용", Object.assign({ pos:[40,-520], rect_size:[300,30], size:18, color:"#C5CBD6", alignment:3 }, TC));

// 7) 파괴흔적 박스 숨김(레퍼런스엔 없음 — 2단계 우리 모델 정합)
b.patch(S+"/Layout_Item", { enable:false });

// 8) 하단 버튼 + 푸터
b.patch(S+"/Btn_Enchant", Object.assign({ pos:[140,75], rect_size:[250,84] }, BC));
if (b.find(S+"/Btn_Restore")) b.patch(S+"/Btn_Restore", Object.assign({ pos:[-140,75], rect_size:[250,84] }, BC));
b.text(S+"/Text_Footer", "※ 장비 파괴 시 복구 아이템과 비용이 소모되어 복구할 수 있습니다.", Object.assign({ pos:[0,25], rect_size:[730,26], size:14, color:"#8A93A3", alignment:4 }, BC));

b.write(UI, { strict:false });
console.log("star ref-match done");
