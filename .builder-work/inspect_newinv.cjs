const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui");
const ents = b.listEntities();
console.log("TOTAL", ents.length);
// 샘플 트리만 출력 (경로에 Sample_Inventory 포함)
let n = 0;
for (const e of ents) {
  if (e.path && e.path.includes("SimpleFantasy")) {
    n++;
    const ind = "  ".repeat(e.depth || 0);
    const sz = e.size ? `[${Math.round(e.size[0]||e.size.x||0)}x${Math.round(e.size[1]||e.size.y||0)}]` : "";
    if (n <= 130) console.log(`${ind}${e.name} ${sz} :: ${e.path}`);
  }
}
console.log("SAMPLE-TREE ENTITIES:", n);
// 루트 modelId 확인
const roots = ents.filter(e => e.name && e.name.includes("SimpleFantasy"));
for (const r of roots) {
  const rec = b.find(r.path);
  console.log("root:", r.path, "modelId=", rec.jsonString.modelId, "origin=", JSON.stringify(rec.jsonString.origin));
}
