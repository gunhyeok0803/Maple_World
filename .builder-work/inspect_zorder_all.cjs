// 전 UI 그룹 Z-Order(형제 displayOrder) 감사 — Window/Tab/Panel/Popup 순서 점검.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const FILES = {
  "EnhanceGroup": ["ui/EnhanceGroup.ui", "/ui/EnhanceGroup"],
  "PromoteGroup": ["ui/PromoteGroup.ui", "/ui/PromoteGroup/PromoteRoot"],
  "InventoryGroup": ["ui/InventoryGroup.ui", "/ui/InventoryGroup/UI_Inventory"],
};
for (const [label, [file, rootPath]] of Object.entries(FILES)) {
  const b = UIBuilder.read(file);
  console.log("==== " + label + " (직속 자식: displayOrder)");
  const rows = [];
  for (const e of b.listEntities()) {
    const p = e.path || "";
    // rootPath 직속 자식만
    if (!p.startsWith(rootPath + "/")) continue;
    const rest = p.slice(rootPath.length + 1);
    if (rest.includes("/")) continue;
    const ent = b.find(p);
    const js = ent && ent.jsonString || {};
    rows.push({ name: rest, order: js.displayOrder ?? 0 });
  }
  rows.sort((a, b2) => a.order - b2.order);
  for (const r of rows) console.log("  " + String(r.order).padStart(4) + "  " + r.name);
}
