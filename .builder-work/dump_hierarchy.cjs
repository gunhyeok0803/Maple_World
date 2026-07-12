const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);

const RENDER = ["MOD.Core.SpriteGUIRendererComponent","MOD.Core.TextComponent","MOD.Core.TextGUIRendererComponent","MOD.Core.ButtonComponent","MOD.Core.RectTransformComponent"];
const ents = b.listEntities();

// listEntities returns objects with path/name; sort by path for tree readability
function rel(p){ return p.replace("/ui/EnhanceGroup",""); }
const rows = [];
for (const e of ents) {
  const p = e.path || e;
  const r = rel(p);
  const depth = (r.match(/\//g)||[]).length;
  let order = "", enable = e.enable, ray = "", ttext = "", sprite="";
  // RectTransform: pos/size
  let pos="", size="";
  try {
    const rt = b.getComponent(p, "MOD.Core.RectTransformComponent");
    if (rt) { const ap=rt.AnchoredPosition||rt.anchoredPosition; const sd=rt.SizeDelta||rt.sizeDelta;
      if(ap) pos=`(${Math.round(ap.x)},${Math.round(ap.y)})`; if(sd) size=`${Math.round(sd.x)}x${Math.round(sd.y)}`; }
  } catch(_){}
  try { const sg=b.getComponent(p,"MOD.Core.SpriteGUIRendererComponent"); if(sg){ order="S"+(sg.OrderInLayer!==undefined?sg.OrderInLayer:"?"); if(sg.RaycastTarget)ray="RAY"; if(sg.ImageRUID)sprite="img"; } } catch(_){}
  try { const tc=b.getComponent(p,"MOD.Core.TextComponent"); if(tc){ order+=" T"+(tc.OrderInLayer!==undefined?tc.OrderInLayer:"?"); ttext=(tc.Text||"").slice(0,14); } } catch(_){}
  try { const tg=b.getComponent(p,"MOD.Core.TextGUIRendererComponent"); if(tg){ order+=" TG"+(tg.OrderInLayer!==undefined?tg.OrderInLayer:"?"); ttext=(tg.Text||"").slice(0,14); } } catch(_){}
  try { const bt=b.getComponent(p,"MOD.Core.ButtonComponent"); if(bt){ order+=" BTN"; } } catch(_){}
  rows.push({r,depth,enable,pos,size,order,ray,ttext});
}
rows.sort((a,b)=>a.r<b.r?-1:1);
for (const x of rows) {
  const ind = "  ".repeat(Math.max(0,x.depth-1));
  const en = x.enable===false?"[OFF]":"     ";
  console.log(`${en} ${ind}${x.r.split("/").pop()||"(root)"}  ${x.pos}${x.size?" "+x.size:""}  ${x.order}${x.ray?" "+x.ray:""}${x.ttext?"  \""+x.ttext+"\"":""}`);
}
console.log("TOTAL:", rows.length);
