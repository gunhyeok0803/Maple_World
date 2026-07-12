const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const MC = { anchor:"middle-center", pivot:[0.5,0.5] };

// ── (1) EnhanceGroup 좌열 세로 재배치(제목/칸 겹침 제거) ──
const E = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const e = UIBuilder.read(E);
e.patch("Panel_EquipList/Text_Title", Object.assign({ pos:[0,288], rect_size:[230,30] }, MC));
const EC = [["EquipCell_1",-46,205],["EquipCell_2",46,205],["EquipCell_3",-46,117],["EquipCell_4",46,117]];
for (const [nm,x,y] of EC) e.patch("Panel_EquipList/"+nm, Object.assign({ pos:[x,y], rect_size:[88,88] }, MC));
const LK = [[-46,20],[46,20],[-46,-68],[46,-68],[-46,-156],[46,-156]];
for (let i=0;i<6;i++) e.patch("Panel_EquipList/LockCell_"+(i+1), Object.assign({ pos:LK[i], rect_size:[88,88] }, MC));
e.patch("Panel_EquipList/Text_Section", Object.assign({ pos:[0,-212], rect_size:[230,22] }, MC));
e.patch("Panel_EquipList/Grid", Object.assign({ pos:[0,-270], rect_size:[230,90] }, MC));
e.write(E,{strict:false});
console.log("enhance left panel repositioned");

// ── (2) PromoteGroup 동일 z-order 정규화 ──
const P = "C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui";
const p = UIBuilder.read(P);
const BASE = { Window:0, Btn_TabPromote:900, Btn_TabColl:900, Panel_Promote:100, Panel_Coll:200, Controller:0 };
const BG_RE = /(^|_)Img_?Bg$|_BG$|^Card_|^Sel$|^Dimmer$|^Panel$/i;
let n=0;
for (const ent of p.listEntities()) {
  const path = ent.path || ent;
  const rel = path.replace("/ui/PromoteGroup","");
  const seg = rel.split("/").filter(Boolean);
  if (seg.length===0) continue;
  const base = BASE[seg[0]]; if (base===undefined) continue;
  const d = seg.length-1;
  const name = seg[seg.length-1];
  const isBg = BG_RE.test(name);
  const os = base + d*10 + (isBg?0:3);
  const ot = base + d*10 + 6;
  if (p.hasComponent(path,"MOD.Core.SpriteGUIRendererComponent")) { p.patchComponent(path,"MOD.Core.SpriteGUIRendererComponent",{OrderInLayer:os}); n++; }
  if (p.hasComponent(path,"MOD.Core.TextComponent")) { p.patchComponent(path,"MOD.Core.TextComponent",{OrderInLayer:ot}); n++; }
  if (p.hasComponent(path,"MOD.Core.TextGUIRendererComponent")) { p.patchComponent(path,"MOD.Core.TextGUIRendererComponent",{OrderInLayer:ot}); n++; }
}
p.write(P,{strict:false});
console.log("promote z-order patched on", n, "renderers");
