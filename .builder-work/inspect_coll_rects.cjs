// 컬렉션 탭 우측 영역 좌표 측정(RegGrid 배치 계산용) + 강화창 EquipCell 참조 구조.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const T = "MOD.Core.UITransformComponent";
const dump = (b, p) => {
  const t = b.getComponent(p, T);
  if (!t) { console.log(p + " (none)"); return; }
  const ap = t.anchoredPosition || {}; const rs = t.RectSize || {};
  console.log(p + "  pos=(" + ap.x + "," + ap.y + ") size=(" + rs.x + "x" + rs.y + ")");
};
const b = UIBuilder.read("ui/PromoteGroup.ui");
for (const p of [
  "PromoteRoot/Panel_Coll", "PromoteRoot/Panel_Coll/RegHdr", "PromoteRoot/Panel_Coll/RegSub",
  "PromoteRoot/Panel_Coll/RegPrompt", "PromoteRoot/Panel_Coll/RegEmpty",
  "PromoteRoot/Panel_Coll/CollSlot_1", "PromoteRoot/Panel_Coll/CollSlot_9",
  "PromoteRoot/Panel_Coll/Coll_RegionName", "PromoteRoot/Panel_Coll/Coll_Progress",
  "PromoteRoot/Panel_Coll/Btn_Region_1", "PromoteRoot/Panel_Coll/Card_Info",
]) dump(b, p);
console.log("--- EnhanceGroup EquipCell reference ---");
const e = UIBuilder.read("ui/EnhanceGroup.ui");
for (const p of [
  "Panel_EquipList/EquipCell_1", "Panel_EquipList/EquipCell_1/Icon",
  "Panel_EquipList/EquipCell_1/QBadge", "Panel_EquipList/EquipCell_1/Count",
]) {
  const t = e.getComponent(p, T);
  if (!t) { console.log(p + " (none)"); continue; }
  const ap = t.anchoredPosition || {}; const rs = t.RectSize || {};
  const comps = ["MOD.Core.SpriteGUIRendererComponent","MOD.Core.TextGUIRendererComponent","MOD.Core.TextComponent","script.UIEquipmentSlotWidget"]
    .filter(c => e.hasComponent(p, c)).map(c => c.split(".").pop());
  console.log(p + "  pos=(" + ap.x + "," + ap.y + ") size=(" + rs.x + "x" + rs.y + ") comps=" + comps.join(","));
}
