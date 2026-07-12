// DetailPopup을 Controller → 샘플 창 루트 아래로 이사(레이어링 해결)
const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui";
const SRC = "/ui/InventoryGroup/Controller/DetailPopup";
const DSTREL = "UIR_SimpleFantasy_Sample_Inventory/DetailPopup";

const u = UIBuilder.read(UI);
const ents = u.listEntities().filter(e => e.path === SRC || e.path.startsWith(SRC + "/"));
ents.sort((a, b) => a.path.split("/").length - b.path.split("/").length);
console.log("moving entities:", ents.length);

for (const e of ents) {
  const rec = u.find(e.path);
  const js = rec.jsonString;
  const rel = DSTREL + e.path.slice(SRC.length);
  u.panel(rel, {});
  const srcTypes = new Set();
  for (const c of (js["@components"] || [])) {
    srcTypes.add(c["@type"]);
    u.upsertComponent(rel, c["@type"], JSON.parse(JSON.stringify(c)));
  }
  if (!srcTypes.has("MOD.Core.SpriteGUIRendererComponent") && u.hasComponent(rel, "MOD.Core.SpriteGUIRendererComponent")) {
    u.removeComponent(rel, "MOD.Core.SpriteGUIRendererComponent");
  }
  u.patch(rel, { enable: js.enable !== false, visible: js.visible !== false });
}
// 루트는 기본 숨김
u.patch(DSTREL, { enable: false });
u.remove("Controller/DetailPopup");
u.write(UI, { strict: false });
console.log("DetailPopup moved into window");
