const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui");
for (const e of b.listEntities()) {
  if (e.path.includes("EnhancePopup")) console.log(e.path, e.enable === false ? "[OFF]" : "");
}
// 옛 스크립트가 붙은 엔티티 찾기
for (const e of b.listEntities()) {
  const raw = b.find(e.path);
  if (raw && raw.componentNames && raw.componentNames.includes("UIEquipmentEnhancePopup")) {
    console.log("SCRIPT ON:", e.path, "=>", raw.componentNames);
  }
}
