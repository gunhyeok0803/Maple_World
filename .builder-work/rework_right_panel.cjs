// 우측 개편: 직업 서브탭 삭제 + GridView_Gear 확장(서브탭 자리까지)
const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui";
const G = "UIR_SimpleFantasy_Sample_Inventory/Layout_Item/Layout/Layout_Gear";

const u = UIBuilder.read(UI);

// 현 GridView_Gear 트랜스폼 확인
const ut = u.getComponent(G + "/GridView_Gear", "MOD.Core.UITransformComponent");
console.log("before:", JSON.stringify({ AnchorsMin: ut.AnchorsMin, AnchorsMax: ut.AnchorsMax, OffsetMin: ut.OffsetMin, OffsetMax: ut.OffsetMax, RectSize: ut.RectSize, pos: ut.anchoredPosition }));

// 서브탭 삭제
if (u.find(G + "/Scroll_GearSubTab")) { u.remove(G + "/Scroll_GearSubTab"); console.log("subtab removed"); }

// 그리드 확장: Layout_Gear(1000x569) 전체 채움
u.patchComponent(G + "/GridView_Gear", "MOD.Core.UITransformComponent", {
  AnchorsMin: { x: 0, y: 0 },
  AnchorsMax: { x: 1, y: 1 },
  OffsetMin: { x: 0, y: 0 },
  OffsetMax: { x: 0, y: 0 },
});

u.write(UI, { strict: false });
console.log("write done");
