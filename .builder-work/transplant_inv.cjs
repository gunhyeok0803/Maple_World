// 맵(map01)에 드롭된 UIR_SimpleFantasy_Sample_Inventory 트리를
// ui/InventoryGroup.ui로 이식(컴포넌트 데이터 원본 유지). 맵 사본 제거는 별도 스크립트.
const { MapBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/map/msw_map_builder.cjs");
const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");

const MAP = "C:/Users/rnsgu/MSW_ProjectAI00/map/map01.map";
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui";
const SRC_PREFIX = "/maps/map01/UIR_SimpleFantasy_Sample_Inventory";

const m = MapBuilder.read(MAP);
const all = m.listEntities();
const srcPaths = all.map(e => e.path).filter(p => p && (p === SRC_PREFIX || p.startsWith(SRC_PREFIX + "/")));
// 부모 먼저 생성되도록 깊이순 정렬
srcPaths.sort((a, b) => a.split("/").length - b.split("/").length);
console.log("source entities:", srcPaths.length);

const u = UIBuilder.read(UI);
let created = 0, compUpserts = 0, srRemoved = 0;

for (const sp of srcPaths) {
  const rec = m.find(sp);
  if (!rec) { console.log("MISS", sp); continue; }
  const js = rec.jsonString;
  const comps = js["@components"] || [];
  // 새 경로: /maps/map01/... → InventoryGroup 상대경로
  const rel = sp.replace("/maps/map01/", ""); // "UIR_.../child/..."
  // 최소 엔티티 생성(panel: UITransform+SpriteGUIRenderer) 후 컴포넌트 원본으로 전량 교체
  u.panel(rel, {});
  created++;
  const srcTypes = new Set();
  for (const c of comps) {
    const t = c["@type"];
    srcTypes.add(t);
    const data = JSON.parse(JSON.stringify(c));
    if (t === "MOD.Core.UITransformComponent") {
      data.UIMode = 1; // 맵 드롭으로 World가 됐어도 Screen으로 정규화
    }
    u.upsertComponent(rel, t, data);
    compUpserts++;
  }
  // panel이 넣은 SpriteGUIRenderer가 원본에 없으면 제거
  if (!srcTypes.has("MOD.Core.SpriteGUIRendererComponent") && u.hasComponent(rel, "MOD.Core.SpriteGUIRendererComponent")) {
    u.removeComponent(rel, "MOD.Core.SpriteGUIRendererComponent");
    srRemoved++;
  }
  // 엔티티 메타(enable/visible/표시순서) 복사
  u.patch(rel, { enable: js.enable !== false, visible: js.visible !== false });
}

// 루트를 화면 중앙으로
u.patchComponent("UIR_SimpleFantasy_Sample_Inventory", "MOD.Core.UITransformComponent", {
  anchoredPosition: { x: 0, y: 0 },
});

console.log(`created=${created} compUpserts=${compUpserts} srRemoved=${srRemoved}`);
u.write(UI, { strict: false, lint_verbose: true });
console.log("UI write done");
