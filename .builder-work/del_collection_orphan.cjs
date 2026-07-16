// Track1 정리: 죽은 컬렉션 중복 경로 제거.
// - ui/CollectionGroup.ui (열리지 않는 standalone 창)
// - RootDesk/MyDesk/UI/UICollectionPanel.mlua (+ .codeblock) — UIPromotePanel 컬렉션 탭으로 대체됨
const fs = require("fs");
const path = require("path");
const root = path.join("C:", "Users", "rnsgu", "MSW_ProjectAI00");
const targets = [
  path.join(root, "ui", "CollectionGroup.ui"),
  path.join(root, "RootDesk", "MyDesk", "UI", "UICollectionPanel.mlua"),
  path.join(root, "RootDesk", "MyDesk", "UI", "UICollectionPanel.codeblock"),
];
for (const t of targets) {
  if (fs.existsSync(t)) { fs.unlinkSync(t); console.log("deleted: " + t); }
  else { console.log("not found: " + t); }
}
