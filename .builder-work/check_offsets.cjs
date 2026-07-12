const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui");
const paths = [
  "UIR_SimpleFantasy_Sample_Inventory",
  "UIR_SimpleFantasy_Sample_Inventory/Layout_PlayerInfo",
  "UIR_SimpleFantasy_Sample_Inventory/Layout_Item",
];
for (const p of paths) {
  const ut = b.getComponent(p, "MOD.Core.UITransformComponent");
  if (!ut) { console.log(p, "NO UT"); continue; }
  console.log("===", p);
  for (const k of ["AnchorsMin","AnchorsMax","OffsetMin","OffsetMax","RectSize","anchoredPosition","Pivot","AlignmentOption","UIMode"]) {
    if (ut[k] !== undefined) console.log("  " + k + ":", JSON.stringify(ut[k]));
  }
}
