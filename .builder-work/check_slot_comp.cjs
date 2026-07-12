const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui");
const PRE = "UIR_SimpleFantasy_Sample_Inventory";
// 샘플 장비칸 하나 + 타입탭 하나의 SpriteGUIRenderer 원본 JSON
for (const p of [PRE + "/Layout_PlayerInfo/Scroll_EquipSlot/Cap", PRE + "/Layout_Item/Scroll_ItemTypeTab/Btn_EquipTab"]) {
  const sr = b.getComponent(p, "MOD.Core.SpriteGUIRendererComponent");
  console.log("===", p);
  console.log(JSON.stringify(sr));
}
