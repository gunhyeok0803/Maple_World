const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
let removed = 0;
function del(rel){ if(b.find(rel)){ b.remove(rel); removed++; } }

// ── 1) 명확한 이름으로 rename (자식 경로 자동 갱신, mlua는 UUID 바인딩이라 안전)
b.rename("UIR_SimpleFantasy_Sample_StarForce", "Tab_StarForce");
b.rename("UIR_SimpleFantasy_Sample_PotentialSelect", "Tab_Potential");
b.rename("UIR_SimpleFantasy_Sample_PotentialReset", "Tab_Flame");

// ── 2) 미사용 요소 삭제 — 스타포스
const S = "Tab_StarForce/Panel";
for (let i=1;i<=20;i++) del(S+"/Star_"+i);            // 폐기된 그래픽 별
for (const nm of ["Btn_Info","Btn_Close","Text_Title","Item","Scroll_Stat","Text_Preview","Img_Deco","Layout_Item"]) del(S+"/"+nm);

// ── 3) 미사용 요소 삭제 — 잠재
const P = "Tab_Potential/Layout";
for (const nm of ["Img_ItemHdr","Text_ItemHdr","Layout_TryCount","Img_Arrow","Btn_Cancel","Deco_Line","Btn_Info","Text_Title"]) del(P+"/"+nm);
for (const card of ["Layout_Before","Layout_After"]) {
  for (const nm of ["Item","Layout_Score","Scroll_Stat","Star","Star_1","Btn_Select","Layout_Top","Deco_Panel_DiaPattern","Deco_Panel_DiaPattern_1"]) del(P+"/"+card+"/"+nm);
}

// ── 4) 미사용 요소 삭제 — 환생
const F = "Tab_Flame/Layout";
for (const nm of ["Btn_Info","Btn_Close","Text_Title","Layout_TryCount","Deco_Line"]) del(F+"/"+nm);
for (const nm of ["Item","Scroll_Stat","Star","Star_1","Deco_Panel_DiaPattern","Deco_Panel_DiaPattern_1"]) del(F+"/Layout_PotenInfo/"+nm);

// ── 5) 탭 래퍼 3개 저장 상태 enable=false 통일(편집 모드 겹침 해소, 런타임은 ApplyVisibility가 켬)
for (const t of ["Tab_StarForce","Tab_Potential","Tab_Flame"]) b.patch(t, { enable:false });
b.patch("Popup_PotInfo", { enable:false });

// ── 6) 배열 순서(편집 Hierarchy 가독): Window→패널→탭콘텐츠→탭버튼→팝업→Controller
const order = ["Window","Panel_EquipList","Panel_Summary","Tab_StarForce","Tab_Potential","Tab_Flame","Btn_TabStar","Btn_TabPot","Btn_TabFlame","Popup_PotInfo","Controller"];
function pathOf(e){ return (b._entityJson?b._entityJson(e):e.jsonString).path||""; }
function topKey(e){ const rest=pathOf(e).replace("/ui/EnhanceGroup",""); if(rest==="")return "__root__"; return rest.split("/").filter(Boolean)[0]; }
const rootEnts=[], groups={};
for (const e of b.entities){ const k=topKey(e); if(k==="__root__"){rootEnts.push(e);continue;} (groups[k]=groups[k]||[]).push(e); }
const out=[...rootEnts];
for (const nm of order){ if(groups[nm]){ out.push(...groups[nm]); delete groups[nm]; } }
for (const k of Object.keys(groups)) out.push(...groups[k]);
b.entities = out;

console.log("removed entities:", removed, "| total now:", b.entities.length);
b.write(UI,{strict:false});
console.log("hierarchy cleanup done");
