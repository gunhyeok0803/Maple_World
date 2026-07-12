const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const TEXTS = ["MOD.Core.TextComponent","MOD.Core.TextGUIRendererComponent"];
function setText(bb, rel, s){ for(const ct of TEXTS) if(bb.hasComponent(rel,ct)){ bb.patchComponent(rel,ct,{Text:s}); return true; } return false; }

function normalizeZ(bb, groupPath, BASE){
  const BG_RE = /(^|_)Img_?Bg$|_BG$|^Dimmer$|^Panel$|^PercentBG$|^Card_|^Sel$/i;
  let n=0;
  for (const ent of bb.listEntities()){
    const p = ent.path || ent;
    const rel = p.replace(groupPath,"");
    const seg = rel.split("/").filter(Boolean);
    if (seg.length===0) continue;
    const base = BASE[seg[0]]; if (base===undefined) continue;
    const d = seg.length-1;
    const name = seg[seg.length-1];
    const isBg = BG_RE.test(name);
    const os = base + d*10 + (isBg?0:3);
    const ot = base + d*10 + 6;
    if (bb.hasComponent(p,"MOD.Core.SpriteGUIRendererComponent")){ bb.patchComponent(p,"MOD.Core.SpriteGUIRendererComponent",{OrderInLayer:os}); n++; }
    if (bb.hasComponent(p,"MOD.Core.TextComponent")){ bb.patchComponent(p,"MOD.Core.TextComponent",{OrderInLayer:ot}); n++; }
    if (bb.hasComponent(p,"MOD.Core.TextGUIRendererComponent")){ bb.patchComponent(p,"MOD.Core.TextGUIRendererComponent",{OrderInLayer:ot}); n++; }
  }
  return n;
}

// ── EnhanceGroup: 스타포스 안내문 + z 재적용 ──
const E = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const e = UIBuilder.read(E);
setText(e, "Tab_StarForce/Panel/Text_LegendOnly", "최상급 장비만 강화할 수 있습니다");
const ez = normalizeZ(e, "/ui/EnhanceGroup", {
  Window:0, Btn_TabStar:900, Btn_TabPot:900, Btn_TabFlame:900,
  Panel_EquipList:100, Panel_Summary:200, Tab_StarForce:300, Tab_Potential:400, Tab_Flame:500,
  Popup_PotInfo:1000, Controller:0,
});
e.write(E,{strict:false});
console.log("EnhanceGroup: legend text + z re-applied on", ez);

// ── PromoteGroup: 컬렉션 열 헤더(하급~최상급) + z 재적용 ──
const P = "C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui";
const p = UIBuilder.read(P);
setText(p, "Panel_Coll/Text_ColG1", "하급");
setText(p, "Panel_Coll/Text_ColG2", "중급");
setText(p, "Panel_Coll/Text_ColG3", "상급");
setText(p, "Panel_Coll/Text_ColG4", "최상급");
const pz = normalizeZ(p, "/ui/PromoteGroup", {
  Window:0, Btn_TabPromote:900, Btn_TabColl:900, Panel_Promote:100, Panel_Coll:200, Controller:0,
});
p.write(P,{strict:false});
console.log("PromoteGroup: coll headers + z re-applied on", pz);
