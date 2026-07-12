const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const INV = "C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui";
const DEF = "C:/Users/rnsgu/MSW_ProjectAI00/ui/DefaultGroup.ui";
const ARMOR = "aa12d396b4ea45619df053316c8aa5de"; // LongCoat_On
const BAG = "341c9cc01dc74de1aa0dcfef788fca38";   // Img_Bag

// 1) 장비탭 아이콘: 카드 → 방어구(상의)
const u = UIBuilder.read(INV);
const p = "UIR_SimpleFantasy_Sample_Inventory/Layout_Item/Scroll_ItemTypeTab/Btn_CardTab/Img_TabIcon";
if (u.find(p)) {
  u.sprite(p, { image_ruid: ARMOR }); // 트랜스폼 유지, 스프라이트만 교체
  u.write(INV, { strict: false });
  console.log("equip tab icon -> LongCoat");
} else {
  console.log("TAB ICON NOT FOUND");
}

// 2) HUD 인벤 버튼 구조 확인 + 아이콘 교체
const d = UIBuilder.read(DEF);
const ents = d.listEntities();
for (const e of ents) console.log("DEF:", e.path);
const btn = d.find("Btn_Inventory");
if (btn) {
  // 자식 아이콘 있으면 그걸, 없으면 버튼 스프라이트를 교체
  const iconChild = ents.find(e => e.path.includes("Btn_Inventory/") );
  if (iconChild) {
    d.sprite(iconChild.path.replace("/ui/DefaultGroup/", ""), { image_ruid: BAG });
    console.log("HUD icon child ->", iconChild.path);
  } else {
    d.sprite("Btn_Inventory", { image_ruid: BAG });
    console.log("HUD button sprite -> bag");
  }
  d.write(DEF, { strict: false });
}
