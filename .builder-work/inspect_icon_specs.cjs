// 아이콘 통일 기준 비교: 인벤 셀(기준) vs 컬렉션 도감/후보행 vs 승급 리스트 셀.
// 각 슬롯의 [셀크기 / Icon 크기·pos / QBadge 크기·pos / Count 크기·pos] 덤프.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const T = "MOD.Core.UITransformComponent";
const dump = (b, label, base) => {
  console.log("== " + label);
  for (const suf of ["", "/Icon", "/QBadge", "/Count", "/PartLabel"]) {
    const p = base + suf;
    if (!b.find(p)) { continue; }
    const t = b.getComponent(p, T);
    if (!t) continue;
    const ap = t.anchoredPosition || {}; const rs = t.RectSize || {};
    const am = t.AnchorsMin || {}; const px = t.Pivot || {};
    console.log("  " + (suf || "(cell)") + "  pos=(" + ap.x + "," + ap.y + ") size=(" + rs.x + "x" + rs.y + ") anchor=(" + am.x + "," + am.y + ") pivot=(" + (px.x ?? "?") + "," + (px.y ?? "?") + ")");
  }
};
console.log("--- InventoryGroup (기준) ---");
const inv = UIBuilder.read("ui/InventoryGroup.ui");
for (const e of inv.listEntities()) {
  const p = e.path || "";
  if (/CellTemplate$/.test(p)) { dump(inv, p, p.replace("/ui/InventoryGroup/", "")); break; }
}
console.log("--- EnhanceGroup ---");
const en = UIBuilder.read("ui/EnhanceGroup.ui");
dump(en, "EquipCell_1", "Panel_EquipList/EquipCell_1");
dump(en, "CellTemplate(강화 인벤그리드)", "Panel_EquipList/CellTemplate");
console.log("--- PromoteGroup ---");
const pr = UIBuilder.read("ui/PromoteGroup.ui");
dump(pr, "CollSlot_1(도감)", "PromoteRoot/Panel_Coll/CollSlot_1");
dump(pr, "RegCellTpl/IconCell(후보행)", "PromoteRoot/Panel_Coll/RegCellTpl/IconCell");
dump(pr, "CellTemplate(승급 리스트)", "PromoteRoot/Panel_Promote/CellTemplate");
