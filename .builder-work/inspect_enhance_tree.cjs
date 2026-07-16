// 강화창(.ui) 구조 덤프 — 노드 경로/컴포넌트 목록만 요약해서 본다.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));

const b = UIBuilder.read("ui/EnhanceGroup.ui");
const ents = b.listEntities();
console.log("=== EnhanceGroup entities:", ents.length, "===");
for (const e of ents) {
  const p = e.path || e.Path || e.name || "?";
  const comps = (e.components || e.Components || []).map(c => (c["@type"] || c.type || c)).join(",");
  console.log(p + "   [" + comps + "]");
}
