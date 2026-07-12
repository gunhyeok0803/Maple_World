// 좌측 Layout_PlayerInfo 개편: 카드슬롯 제거, 보이스/전투력 숨김, 아바타 중앙,
// Scroll_EquipSlot(10칸) → 페이퍼돌 27칸(EquipSlot_0~26 + Icon/Lock, SlotDefs 인덱스 호환)
const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui";
const P = "UIR_SimpleFantasy_Sample_Inventory/Layout_PlayerInfo";

const SLOT_BG = "aa931a755e5949699233b817029a3e36";  // 팩 Core_Slot 기본(일반)
const LOCK_RUID = "092a1d9b68524f83ba3a3e8e0c0f482b"; // 팩 잠금 아이콘

const u = UIBuilder.read(UI);

// 1) 제거/숨김
for (const n of ["Btn_Card1", "Btn_Card2", "Scroll_EquipSlot"]) {
  if (u.find(P + "/" + n)) { u.remove(P + "/" + n); console.log("removed", n); }
}
for (const n of ["Img_Voice", "Img_VoicePreset_BG", "CharPower"]) {
  if (u.find(P + "/" + n)) { u.patch(P + "/" + n, { enable: false }); console.log("hidden", n); }
}

// 2) 아바타 중앙 (Layout_PlayerInfo 기준)
u.patch(P + "/Avatar_Char", { anchor: "middle-center", pos: [0, 30] });

// 3) 페이퍼돌 27칸 — SlotDefs(1-based) 부위별 좌표. EquipSlot_(i-1) 이름 규약 유지.
const S = 84, PITCH = 92;
const colX = { A: -368, B: -276, C: 276, D: 368 };
const rowY = [210, 118, 26, -66, -158];
const BOT_Y = -266;
// defIdx(1-based) → [x, y]
const posByDef = {
  1: [colX.A, rowY[0]],  3: [colX.A, rowY[1]],  5: [colX.A, rowY[2]],  7: [colX.A, rowY[3]], 24: [colX.A, rowY[4]],
  2: [colX.B, rowY[0]],  4: [colX.B, rowY[1]],  6: [colX.B, rowY[2]],  8: [colX.B, rowY[3]], 10: [colX.B, rowY[4]],
  11: [colX.C, rowY[0]], 13: [colX.C, rowY[1]], 15: [colX.C, rowY[2]], 19: [colX.C, rowY[3]], 17: [colX.C, rowY[4]],
  12: [colX.D, rowY[0]], 20: [colX.D, rowY[1]], 21: [colX.D, rowY[2]], 22: [colX.D, rowY[3]], 14: [colX.D, rowY[4]],
  // 하단 7칸: 훈장9 뱃지16 엠블렘23 안드로이드18 기계심장25 펫26 미정27
  9: [-276, BOT_Y], 16: [-184, BOT_Y], 23: [-92, BOT_Y], 18: [0, BOT_Y], 25: [92, BOT_Y], 26: [184, BOT_Y], 27: [276, BOT_Y],
};

let made = 0;
for (let def = 1; def <= 27; def++) {
  const xy = posByDef[def];
  if (!xy) { console.log("NO POS for def", def); continue; }
  const name = P + "/EquipSlot_" + (def - 1);
  u.sprite(name, { anchor: "middle-center", pos: xy, rect_size: [S, S], image_ruid: SLOT_BG, raycast: true });
  u.addComponent(name, "MOD.Core.ButtonComponent");
  u.sprite(name + "/Icon", { anchor: "middle-center", pos: [0, 0], rect_size: [60, 60], enable: false });
  u.sprite(name + "/Lock", { anchor: "middle-center", pos: [0, 0], rect_size: [32, 32], image_ruid: LOCK_RUID, enable: false });
  made++;
}
console.log("slots made:", made);
u.write(UI, { strict: false });
console.log("write done");
