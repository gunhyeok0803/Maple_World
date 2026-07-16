// 실클릭 차단 원인 조사: raycast/버튼/겹침.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const SP = "MOD.Core.SpriteGUIRendererComponent";
const BT = "MOD.Core.ButtonComponent";
const T = "MOD.Core.UITransformComponent";
const b = UIBuilder.read("ui/PromoteGroup.ui");
const R = "PromoteRoot/Panel_Coll/";
for (const p of [
  R + "CollSlot_1", R + "CollSlot_1/Icon", R + "Btn_Region_1", R + "Card_Info",
  R + "RegGrid", R + "RegCellTpl/BtnReg", R + "Vfx",
  "PromoteRoot/Panel_Promote/Card_Info", "PromoteRoot/Btn_TabColl",
]) {
  if (!b.find(p)) { console.log(p + "  (없음)"); continue; }
  const sp = b.getComponent(p, SP);
  const bt = b.getComponent(p, BT);
  const t = b.getComponent(p, T);
  const ap = t && t.anchoredPosition || {}; const rs = t && t.RectSize || {};
  console.log(p
    + "  pos=(" + (ap.x ?? "미명시") + "," + (ap.y ?? "미명시") + ") size=(" + (rs.x ?? "?") + "x" + (rs.y ?? "?") + ")"
    + "  raycast=" + (sp ? String(sp.RaycastTarget ?? "미명시(기본)") : "-")
    + "  button=" + (bt ? "Y" : "n"));
}
