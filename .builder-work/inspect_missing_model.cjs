// PromoteGroup.ui에서 MissingModel(96edf478) 참조 엔티티 특정.
// LEA-3028 대상 엔티티 id 6개도 함께 조회.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const MISSING = "96edf478";
const ERR_IDS = ["2d5d5151", "4eff35a1", "5a5f8e63", "9dd0067b", "aedd66c8", "fdb8c352"];

for (const f of ["ui/PromoteGroup.ui", "ui/CollectionGroup.ui"]) {
  const b = UIBuilder.read(f);
  console.log("=== " + f + " ===");
  for (const e of b.listEntities()) {
    const p = e.path || "?";
    const ent = b.find(p);
    if (!ent) continue;
    const raw = JSON.stringify(ent);
    const hitMissing = raw.includes(MISSING);
    const hitErr = ERR_IDS.find(id => (ent.id || "").startsWith(id));
    if (hitMissing || hitErr) {
      const js = ent.jsonString || {};
      console.log((hitErr ? "[ERR-ID] " : "[MODEL] ") + p + "  id=" + (ent.id||"").slice(0,8)
        + " modelId=" + (js.modelId || (js.origin && js.origin.entry_id) || "-"));
    }
  }
}
