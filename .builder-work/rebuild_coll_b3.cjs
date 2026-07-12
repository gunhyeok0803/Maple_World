const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui";
const b = UIBuilder.read(UI);

const PANEL = "6e8e561a4582462eaad762cb11d1f835";
const BLUE = "c2660e96661c4a6e8dc8eaa17eb0655c";
const GRAY = "50426b5b1ee44bc5a1c10355b0e9ad03";
const CARD = { r: 0.09, g: 0.11, b: 0.15, a: 0.94 };
const MC = { anchor: "middle-center", pivot: [0.5, 0.5] };
const BRIGHT = "#EDF2F8";
const DIM = "#9AA4B2";
const P = "Panel_Coll";
const TEXT_COMPS = ["MOD.Core.TextComponent", "MOD.Core.TextGUIRendererComponent"];
function setLabel(rel, s) {
  for (const ct of TEXT_COMPS) if (b.hasComponent(rel, ct)) { b.patchComponent(rel, ct, { Text: s }); return true; }
  return false;
}
function brighten(rel, color) {
  for (const ct of TEXT_COMPS) if (b.hasComponent(rel, ct)) b.patchComponent(rel, ct, { FontColor: color });
}

// ── 옛 리스트 구조 제거
for (const nm of ["Grid", "CellTemplate", "Text_ListTitle"]) {
  if (b.find(P + "/" + nm)) b.remove(P + "/" + nm);
}

// ── 카드 2장(좌: 도감 그리드 / 우: 슬롯 정보) — mlua가 SetSiblingIndex로 뒤로 보냄
b.sprite(P + "/Card_Book", Object.assign({ pos: [-260, 0], rect_size: [980, 840], image_ruid: PANEL, sprite_type: 1 }, MC));
b.patchComponent(P + "/Card_Book", "MOD.Core.SpriteGUIRendererComponent", { Color: CARD });
b.sprite(P + "/Card_Info", Object.assign({ pos: [510, 0], rect_size: [480, 840], image_ruid: PANEL, sprite_type: 1 }, MC));
b.patchComponent(P + "/Card_Info", "MOD.Core.SpriteGUIRendererComponent", { Color: CARD });

// ── 부위 탭 6 (무기/모자/상의/하의/신발/장갑 — CollectionBookData Part 순서)
const PARTS = ["무기", "모자", "상의", "하의", "신발", "장갑"];
for (let i = 0; i < 6; i++) {
  const nm = P + "/PartTab_" + (i + 1);
  b.button(nm, PARTS[i], Object.assign({ pos: [-660 + i * 150, 350], rect_size: [140, 64], font_size: 20, color: "#FFFFFF", image_ruid: GRAY }, MC));
}

// ── 등급 열 헤더 + LV 행 라벨
const COLX = [-560, -390, -220, -50];
const GRADES = ["노멀", "레어", "에픽", "유니크"];
for (let g = 0; g < 4; g++) {
  b.text(P + "/Text_ColG" + (g + 1), GRADES[g], Object.assign({ pos: [COLX[g], 262], rect_size: [120, 26], size: 16, color: DIM, alignment: 4 }, MC));
}
const ROWY = [170, 10, -150];
for (let r = 0; r < 3; r++) {
  b.text(P + "/Text_RowLv" + (r + 1), "LV." + (10 * (r + 1)), Object.assign({ pos: [-690, ROWY[r]], rect_size: [100, 30], size: 18, color: DIM, alignment: 4 }, MC));
}

// ── 도감 셀 12개 (BookCell_{행lv}_{열grade}) — 슬롯 RUID는 런타임(_ItemGrade:SlotRUID)
for (let r = 0; r < 3; r++) {
  for (let g = 0; g < 4; g++) {
    const nm = P + "/BookCell_" + (r + 1) + "_" + (g + 1);
    b.sprite(nm, Object.assign({ pos: [COLX[g], ROWY[r]], rect_size: [120, 120], image_ruid: PANEL, sprite_type: 1, raycast: true }, MC));
    b.upsertComponent(nm, "MOD.Core.ButtonComponent");
    b.sprite(nm + "/Icon", Object.assign({ pos: [0, 4], rect_size: [56, 56] }, MC, { enable: false }));
    b.sprite(nm + "/Sel", Object.assign({ pos: [0, 0], rect_size: [126, 126], image_ruid: PANEL, sprite_type: 1 }, MC, { enable: false }));
    b.patchComponent(nm + "/Sel", "MOD.Core.SpriteGUIRendererComponent", { Color: { r: 0.91, g: 0.76, b: 0.29, a: 0.3 } });
    b.text(nm + "/Count", "", Object.assign({ pos: [28, -42], rect_size: [64, 20], size: 13, color: BRIGHT, alignment: 5 }, MC));
    b.text(nm + "/Reg", "", Object.assign({ pos: [-28, 44], rect_size: [64, 20], size: 13, color: "#9BE28C", alignment: 3 }, MC));
  }
}

// ── 하단 안내문
b.text(P + "/Text_BookHint", "등록한 장비는 소멸하며, 도감 보너스는 영구 적용됩니다.", Object.assign({ pos: [-260, -370], rect_size: [900, 28], size: 15, color: DIM, alignment: 4 }, MC));

// ── 우측 정보 카드: 슬롯 아이콘 + 기존 텍스트/버튼 재배치 + 신규
b.sprite(P + "/Img_BookSlot", Object.assign({ pos: [510, 280], rect_size: [128, 128], image_ruid: PANEL, sprite_type: 1 }, MC));
b.sprite(P + "/Img_BookSlot/Icon", Object.assign({ pos: [0, 0], rect_size: [72, 72] }, MC, { enable: false }));
b.patch(P + "/Text_Target", Object.assign({ pos: [510, 170], rect_size: [440, 44] }, MC));
b.text(P + "/Text_RateColl", "등록 성공률 100% (항상 성공)", Object.assign({ pos: [510, 125], rect_size: [440, 28], size: 16, color: "#9BE28C", alignment: 4 }, MC));
b.patch(P + "/Text_Need", Object.assign({ pos: [510, 75], rect_size: [440, 56] }, MC));
b.text(P + "/Text_BookBonus", "", Object.assign({ pos: [510, -5], rect_size: [440, 80], size: 16, color: BRIGHT, alignment: 4 }, MC));
b.patch(P + "/Btn_Minus", Object.assign({ pos: [385, -110], rect_size: [64, 64] }, MC));
b.patch(P + "/Text_Times", Object.assign({ pos: [475, -110], rect_size: [90, 44] }, MC));
b.patch(P + "/Btn_Plus", Object.assign({ pos: [560, -110], rect_size: [64, 64] }, MC));
b.patch(P + "/Btn_Max", Object.assign({ pos: [655, -110], rect_size: [100, 64] }, MC));
b.patch(P + "/Text_Result", Object.assign({ pos: [510, -200], rect_size: [440, 60] }, MC));
b.patch(P + "/Btn_Action", Object.assign({ pos: [510, -300], rect_size: [260, 88] }, MC));
b.patchComponent(P + "/Btn_Action", "MOD.Core.SpriteGUIRendererComponent", { ImageRUID: { DataId: BLUE }, Color: { r: 1, g: 1, b: 1, a: 1 } });
console.log("reg label:", setLabel(P + "/Btn_Action", "등록하기"));
for (const nm of ["Btn_Minus", "Btn_Plus", "Btn_Max"]) {
  b.patchComponent(P + "/" + nm, "MOD.Core.SpriteGUIRendererComponent", { ImageRUID: { DataId: GRAY }, Color: { r: 1, g: 1, b: 1, a: 1 } });
}
// 기존 텍스트 밝게
const BR = { r: 0.93, g: 0.95, b: 0.98, a: 1 };
for (const nm of ["Text_Target", "Text_Need", "Text_Result", "Text_Times", "Btn_Minus", "Btn_Plus", "Btn_Max", "Btn_Action"]) {
  brighten(P + "/" + nm, BR);
}

b.write(UI, { strict: false });
console.log("coll B3 done");
