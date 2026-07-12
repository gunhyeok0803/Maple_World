const { ModelBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/model/msw_model_builder.cjs");
const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");

// ---- (1) Sample_Inventory model ----
const SAMPLE = "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UIResourceSimpleFantasy/Sample/UIR_SimpleFantasy_Sample_Inventory.model";
function findVal(vals, name){ const e=(vals||[]).find(v=>v.name===name); return e?e.value:undefined; }
function v2(v){ return v?[Math.round(v.x),Math.round(v.y)]:null; }
function ruid(v){ if(!v) return null; if(typeof v==="string") return v; return v.DataId||null; }

const sb = ModelBuilder.read(SAMPLE);
const rootId = sb.snapshot().model_id;
const idName = {}; idName[rootId]="(root)";
const kids = sb.listChildren();
for(const c of kids) idName[c.Id]=c.Name;
console.log("===== SAMPLE_INVENTORY: children =", kids.length, "=====");
for(const c of kids){
  const vals=c.Model&&c.Model.Values;
  const comps=((c.Model&&c.Model.Components)||[]).map(x=>typeof x==="string"?x:x["@type"]).map(s=>s.replace("MOD.Core.","").replace("Component",""));
  const base=c.Model&&c.Model.BaseModelId;
  console.log(`${c.Name} | parent=${idName[c.ParentId]||c.ParentId} | size=${JSON.stringify(v2(findVal(vals,"RectSize")))} | pos=${JSON.stringify(v2(findVal(vals,"anchoredPosition")))} | ruid=${ruid(findVal(vals,"ImageRUID"))} | comps=[${comps}]${base?" | base="+base:""}`);
}

// ---- (2) current InventoryGroup.ui ----
console.log("\n===== InventoryGroup.ui: entities =====");
const ub = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui");
const ents = ub.listEntities();
console.log("TOTAL", ents.length);
for(const e of ents){
  const ind = "  ".repeat(e.depth||0);
  const sz = e.size?`[${Math.round(e.size[0]||e.size.x||0)}x${Math.round(e.size[1]||e.size.y||0)}]`:"";
  console.log(`${ind}${e.name} <${e.kind||""}> ${sz}`);
}
