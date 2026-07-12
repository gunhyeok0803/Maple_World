const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui");
// 엔티티 레코드의 전체 키 구조 확인 — modelId/origin 지원 여부
const e = b.find("Controller/BagPanel");
console.log("outer keys:", Object.keys(e));
console.log("jsonString keys:", Object.keys(e.jsonString));
const root = b.find("/");
console.log("root outer keys:", Object.keys(root));
console.log("root jsonString keys:", Object.keys(root.jsonString));
