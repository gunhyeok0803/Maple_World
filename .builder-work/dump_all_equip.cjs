const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
const PREFIX = "/ui/EnhanceGroup/Panel_EquipList";
for (const ent of b.listEntities()){
  const p = ent.path || ent;
  if (!p.startsWith(PREFIX)) continue;
  const rel = p.slice(PREFIX.length).replace(/^\//,"") || "(root)";
  const t = b.getComponent(p, "MOD.Core.UITransformComponent");
  let pos="", size="";
  if(t){ const a=t.anchoredPosition||{x:0,y:0}, s=t.RectSize||{x:0,y:0}; pos=`(${Math.round(a.x)},${Math.round(a.y)})`; size=`${Math.round(s.x)}x${Math.round(s.y)}`; }
  const e = b.find(p); const js = e && (typeof e.jsonString==="string"?JSON.parse(e.jsonString):e.jsonString);
  const en = js ? (js.enable!==false) : "?";
  let img="";
  const sg = b.getComponent(p,"MOD.Core.SpriteGUIRendererComponent");
  if(sg){ img = sg.ImageRUID ? "img("+String(sg.ImageRUID).slice(0,6)+")" : "img(EMPTY)"; if(sg.Color){img+=` a${sg.Color.a??sg.Color.w??"?"}`;} }
  const depth=(rel==="(root)")?0:rel.split("/").length;
  console.log(`${en?" ":"x"} ${"  ".repeat(depth)}${rel.split("/").pop()} ${pos}${size?" "+size:""} ${img}`);
}
