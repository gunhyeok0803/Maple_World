const { ModelBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/model/msw_model_builder.cjs");
const M = "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/Model_Controller.model";
const b = ModelBuilder.read(M);

// 1) 삭제된 스크립트 정의 제거(값 포함)
if (b.hasComponent("script.UIEquipmentEnhancePopup")) b.removeComponent("script.UIEquipmentEnhancePopup");
if (b.hasValue("script.UIEquipmentEnhancePopup", "Enable")) b.removeValue("script.UIEquipmentEnhancePopup", "Enable");

// 2) 옛 EnhancePopup 서브트리 제거(자손 → 부모 순)
const kids = b.listChildren();
const byId = {};
for (const c of kids) byId[c.Id] = c;
function underEnhance(c) {
  let cur = c;
  for (let i = 0; i < 20 && cur; i++) {
    if (cur.Name === "EnhancePopup") return true;
    cur = byId[cur.ParentId];
  }
  return false;
}
const targets = kids.filter(underEnhance);
// 깊은 것부터 제거
function depth(c) { let d = 0, cur = c; while (cur && byId[cur.ParentId]) { d++; cur = byId[cur.ParentId]; } return d; }
targets.sort((a, b2) => depth(b2) - depth(a));
for (const t of targets) {
  if (b.hasChild(t.Name)) {
    try { b.removeChild(t.Name); } catch (e) { /* 동명 처리 후 잔여는 무시 */ }
  }
}
console.log("removed enhance-subtree children:", targets.length, "remaining:", b.listChildren().length);

// 3) UIInventoryPopup 재정의(재부착 효과)
if (b.hasComponent("script.UIInventoryPopup")) b.removeComponent("script.UIInventoryPopup");
if (b.hasValue("script.UIInventoryPopup", "Enable")) b.removeValue("script.UIInventoryPopup", "Enable");
b.component("script.UIInventoryPopup");
b.value("script.UIInventoryPopup", "Enable", true, "bool");

b.write(M);
console.log("model fixed. components:", JSON.stringify(b.listComponents()));
