const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);

// 렌더 순서(앞=뒤로 감, 뒤=위로 옴): Window(배경) → 좌우 패널 → 탭 콘텐츠 → 탭 버튼 → Controller
const order = [
  "Window",
  "Panel_EquipList",
  "Panel_Summary",
  "UIR_SimpleFantasy_Sample_StarForce",
  "UIR_SimpleFantasy_Sample_PotentialSelect",
  "UIR_SimpleFantasy_Sample_PotentialReset",
  "Btn_TabStar",
  "Btn_TabPot",
  "Btn_TabFlame",
  "Controller",
];
function pathOf(e) { return (b._entityJson ? b._entityJson(e) : e.jsonString).path || ""; }
function topKey(e) {
  const rest = pathOf(e).replace("/ui/EnhanceGroup", "");
  if (rest === "") return "__root__";
  return rest.split("/").filter(Boolean)[0];
}
const rootEnts = [];
const groups = {};
for (const e of b.entities) {
  const k = topKey(e);
  if (k === "__root__") { rootEnts.push(e); continue; }
  (groups[k] = groups[k] || []).push(e);
}
const out = [...rootEnts];
for (const name of order) { if (groups[name]) { out.push(...groups[name]); delete groups[name]; } }
const leftover = Object.keys(groups);
for (const k of leftover) out.push(...groups[k]);
console.log("root ents:", rootEnts.length, "| leftover groups(예상밖):", leftover.join(",") || "none");
console.log("reordered total:", out.length, "(was", b.entities.length + ")");
b.entities = out;
b.write(UI, { strict: false });
console.log("z-order fixed (Window→back, tabs→front)");
