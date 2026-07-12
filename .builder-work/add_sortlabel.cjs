const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui";
const u = UIBuilder.read(UI);
// 정렬 버튼 위치 확인
const btn = u.getComponent("UIR_SimpleFantasy_Sample_Inventory/Layout_Item/Etc/Btn_Sort", "MOD.Core.UITransformComponent");
console.log("Btn_Sort:", JSON.stringify({ a: btn.AnchorsMin, pos: btn.anchoredPosition, size: btn.RectSize }));
// 라벨: 정렬 버튼 왼쪽
u.text("UIR_SimpleFantasy_Sample_Inventory/Layout_Item/Etc/Text_SortMode", "습득순", {
  size: 24, color: "#CFE0FF", alignment: 5,
  anchor: "middle-right", pos: [-430, 0], rect_size: [140, 36],
});
u.write(UI, { strict: false });
console.log("sort label added");
