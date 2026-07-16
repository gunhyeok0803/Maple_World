const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/TestGroup.ui");
const ents = b.listEntities();
console.log("총 엔티티 수: " + ents.length);
let refCount = 0;
for (const e of ents) {
  const raw = b.find(e.path);
  const origin = raw && raw.jsonString && raw.jsonString.origin;
  const modelId = origin && (origin.entry_id || origin.model_id);
  const mark = (modelId && String(modelId).includes("96edf478")) ? "  <<< 96edf478 참조" : "";
  if (mark) refCount++;
  console.log("  " + (e.path||"").replace(/^\/ui\/[^/]+\//,"") + (modelId ? ("  origin=" + modelId) : "") + mark);
}
console.log("96edf478 참조 엔티티 수: " + refCount);
