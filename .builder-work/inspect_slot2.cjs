const { ModelBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/model/msw_model_builder.cjs");
const MODEL = "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UIResourceSimpleFantasy/Core/UIR_SimpleFantasy_Core_Slot.model";

const b = ModelBuilder.read(MODEL);
const kids = b.listChildren();

function findVal(vals, name) {
  const e = (vals || []).find(v => v.name === name || v.Name === name);
  if (!e) return undefined;
  return e.value !== undefined ? e.value : e.Value;
}
function v2(v){ return v ? [v.x, v.y] : null; }
function ruid(v){
  if (!v) return null;
  if (typeof v === "string") return v;
  return v.DataId || v.dataId || JSON.stringify(v);
}

const rows = [];
for (const c of kids) {
  const vals = c.Model && c.Model.Values;
  const comps = (c.Model && c.Model.Components) || [];
  const hasSprite = comps.some(x => (typeof x === "string" ? x : x["@type"] || "").includes("SpriteGUIRenderer"));
  rows.push({
    name: c.Name,
    parent: c.ParentId === b.snapshot().model_id ? "(root)" : c.ParentId,
    size: v2(findVal(vals, "RectSize")),
    pos: v2(findVal(vals, "anchoredPosition")),
    ruid: ruid(findVal(vals, "ImageRUID")),
    sprite: hasSprite,
  });
}
console.log("TOTAL", rows.length);
for (const r of rows) {
  console.log(`${r.name} | size=${JSON.stringify(r.size)} | pos=${JSON.stringify(r.pos)} | ruid=${r.ruid} | parent=${r.parent}`);
}
