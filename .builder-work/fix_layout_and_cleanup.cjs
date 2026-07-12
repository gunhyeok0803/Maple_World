// 피드백 반영: (3) 페이퍼돌을 아래로 내려 상단 정보와 겹침 해소
// (4) GridView 좌우 인셋으로 셀 쏠림 완화 (7) 구 BagPanel/EquipPanel/Dimmer 삭제
const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui";
const P = "UIR_SimpleFantasy_Sample_Inventory/Layout_PlayerInfo";
const G = "UIR_SimpleFantasy_Sample_Inventory/Layout_Item/Layout/Layout_Gear/GridView_Gear";

const u = UIBuilder.read(UI);

// (3) 슬롯 행을 60px 내림 + 하단줄/아바타도 같이
const colX = { A: -368, B: -276, C: 276, D: 368 };
const rowY = [150, 60, -30, -120, -210];
const BOT_Y = -308;
const posByDef = {
  1: [colX.A, rowY[0]],  3: [colX.A, rowY[1]],  5: [colX.A, rowY[2]],  7: [colX.A, rowY[3]], 24: [colX.A, rowY[4]],
  2: [colX.B, rowY[0]],  4: [colX.B, rowY[1]],  6: [colX.B, rowY[2]],  8: [colX.B, rowY[3]], 10: [colX.B, rowY[4]],
  11: [colX.C, rowY[0]], 13: [colX.C, rowY[1]], 15: [colX.C, rowY[2]], 19: [colX.C, rowY[3]], 17: [colX.C, rowY[4]],
  12: [colX.D, rowY[0]], 20: [colX.D, rowY[1]], 21: [colX.D, rowY[2]], 22: [colX.D, rowY[3]], 14: [colX.D, rowY[4]],
  9: [-276, BOT_Y], 16: [-184, BOT_Y], 23: [-92, BOT_Y], 18: [0, BOT_Y], 25: [92, BOT_Y], 26: [184, BOT_Y], 27: [276, BOT_Y],
};
for (let def = 1; def <= 27; def++) {
  u.patch(P + "/EquipSlot_" + (def - 1), { pos: posByDef[def] });
}
u.patch(P + "/Avatar_Char", { pos: [0, -20] });
console.log("paperdoll shifted");

// (4) 그리드 좌우 인셋 40 (stretch 오프셋)
u.patchComponent(G, "MOD.Core.UITransformComponent", {
  OffsetMin: { x: 40, y: 0 },
  OffsetMax: { x: -40, y: 0 },
});
console.log("grid inset");

// (7) 구 패널 삭제 (DetailPopup·EnhancePopup은 유지 — 상세는 재사용중, 강화는 다음 단계)
for (const n of ["Controller/BagPanel", "Controller/EquipPanel", "Controller/Dimmer"]) {
  if (u.find(n)) { u.remove(n); console.log("removed", n); }
}

u.write(UI, { strict: false });
console.log("write done");
