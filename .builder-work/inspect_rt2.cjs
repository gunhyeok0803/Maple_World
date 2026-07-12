const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
const e = b.find("Panel_EquipList/EquipCell_1");
console.log("FIND KEYS:", e ? Object.keys(e).join(",") : "null");
const js = e && e.jsonString ? (typeof e.jsonString==="string"?JSON.parse(e.jsonString):e.jsonString) : null;
if (js){
  console.log("JSKEYS:", Object.keys(js).join(","));
  const comps = js["@components"]||js.components||[];
  for (const c of comps){ const t=c["@type"]||c.type; if(/Rect|Transform/.test(t||"")){ console.log(t, JSON.stringify(c).slice(0,500)); } }
}
