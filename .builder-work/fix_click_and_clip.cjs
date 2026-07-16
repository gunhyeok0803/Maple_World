// 실클릭 차단 해소 + 행 좌우 잘림 해소.
// ① 클릭 불필요 요소(정보 카드/텍스트) RaycastTarget=false 명시 — z 순서와 무관하게 클릭이 슬롯/버튼에 도달.
// ② RegGrid 폭 540→560(셀 540 + 스크롤바 8 + 여유) — 셀 잘림 해소.
// ③ 도감 슬롯 110 재적용(유실 복구).
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const SP = "MOD.Core.SpriteGUIRendererComponent";
const b = UIBuilder.read("ui/PromoteGroup.ui");
const noClick = [
  // 컬렉션 탭
  "Panel_Coll/Card_Info", "Panel_Coll/Text_Need", "Panel_Coll/Text_Result",
  "Panel_Coll/Text_Target", "Panel_Coll/Text_Times", "Panel_Coll/RegCellTpl",
  // 승급 탭(동일 위험 예방)
  "Panel_Promote/Card_Info", "Panel_Promote/Card_List",
  "Panel_Promote/Img_From", "Panel_Promote/Img_From/Icon",
  "Panel_Promote/Img_To", "Panel_Promote/Img_To/Icon",
  "Panel_Promote/Text_Arrow", "Panel_Promote/Text_ListTitle", "Panel_Promote/Text_Need",
  "Panel_Promote/Text_Rate", "Panel_Promote/Text_Result", "Panel_Promote/Text_Target", "Panel_Promote/Text_Times",
  // 창 타이틀
  "Window/Text_WinTitle",
];
let n = 0;
for (const s of noClick) {
  const p = "PromoteRoot/" + s;
  if (b.find(p) && b.hasComponent(p, SP)) { b.patchComponent(p, SP, { RaycastTarget: false }); n++; }
  else console.log("  (skip) " + p);
}
b.patch("PromoteRoot/Panel_Coll/RegGrid", { pos: [295, -35], rect_size: [560, 550] });
for (let i = 1; i <= 9; i++) b.patch("PromoteRoot/Panel_Coll/CollSlot_" + i, { rect_size: [110, 110] });
b.write("ui/PromoteGroup.ui");
console.log("[FIXCLICK] raycast-off=" + n + ", grid 560w, slots 110");
