const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);

const LINE = "66b6a9dde07b4c3abb90c16c0feeed3f";
const LOCK = "092a1d9b68524f83ba3a3e8e0c0f482b";
const SLOT_BG = "aa931a755e5949699233b817029a3e36";
const WIN_DARK = { r: 0.04, g: 0.05, b: 0.07, a: 0.92 };   // 사용자 확정 톤
const CARD_DARK = { r: 0.07, g: 0.09, b: 0.12, a: 0.92 };  // 카드(창보다 반 톤 밝게)
const MC = { anchor: "middle-center", pivot: [0.5, 0.5] };

// ── 창: 1600×1000로 축소 + 확정 다크 톤
b.patch("Window", Object.assign({ pos: [0, 0], rect_size: [1600, 1000] }, MC));
b.patch("Window/Img_Bg", Object.assign({ pos: [0, 0], rect_size: [1600, 1000] }, MC));
b.patchComponent("Window/Img_Bg", "MOD.Core.SpriteGUIRendererComponent", { Color: WIN_DARK });

// ── 좌열: 장착중인 장비(잠금 포함 12칸, 2열) + 인벤 레전드리(2열)
b.patch("Panel_EquipList", Object.assign({ pos: [-630, -30], rect_size: [300, 900] }, MC));
b.patch("Panel_EquipList/Img_Bg", Object.assign({ pos: [0, 0], rect_size: [300, 900] }, MC));
b.patchComponent("Panel_EquipList/Img_Bg", "MOD.Core.SpriteGUIRendererComponent", { Color: CARD_DARK });
b.patch("Panel_EquipList/Text_Title", { pos: [0, -26] });
b.patchComponent("Panel_EquipList/Text_Title", "MOD.Core.TextComponent", { FontSize: 18 });
// 실부위 4칸 재배치(88 셀, 부위 라벨은 셀 내부 하단)
const CELLS = [["EquipCell_1", -50, 330], ["EquipCell_2", 50, 330], ["EquipCell_3", -50, 234], ["EquipCell_4", 50, 234]];
for (const [nm, x, y] of CELLS) {
  b.patch("Panel_EquipList/" + nm, Object.assign({ pos: [x, y], rect_size: [88, 88] }, MC));
  b.patch("Panel_EquipList/" + nm + "/Icon", Object.assign({ pos: [0, 2], rect_size: [48, 48] }, MC));
  b.patch("Panel_EquipList/" + nm + "/PartLabel", Object.assign({ pos: [0, -32], rect_size: [84, 18] }, MC));
  b.patchComponent("Panel_EquipList/" + nm + "/PartLabel", "MOD.Core.TextComponent", { FontSize: 11 });
}
// 잠금 8칸(장식)
const LOCKS = [[-50, 138], [50, 138], [-50, 42], [50, 42], [-50, -54], [50, -54], [-50, -150], [50, -150]];
for (let i = 0; i < LOCKS.length; i++) {
  const p = "Panel_EquipList/LockCell_" + (i + 1);
  b.sprite(p, Object.assign({ pos: LOCKS[i], rect_size: [88, 88], image_ruid: SLOT_BG, sprite_type: 1 }, MC));
  b.patchComponent(p, "MOD.Core.SpriteGUIRendererComponent", { Color: { r: 0.5, g: 0.52, b: 0.58, a: 0.85 } });
  b.sprite(p + "/Lock", Object.assign({ pos: [0, 0], rect_size: [28, 32], image_ruid: LOCK }, MC));
}
// 인벤 레전드리 섹션(2열)
b.patch("Panel_EquipList/Text_Section", Object.assign({ pos: [0, -215], rect_size: [280, 26] }, MC));
b.patchComponent("Panel_EquipList/Text_Section", "MOD.Core.TextComponent", { Text: "인벤 레전드리", FontSize: 14 });
b.patch("Panel_EquipList/Grid", Object.assign({ pos: [0, -330], rect_size: [280, 195] }, MC));
b.patch("Panel_EquipList/CellTemplate", { rect_size: [88, 88] });
b.patch("Panel_EquipList/CellTemplate/Icon", { rect_size: [48, 48] });

// ── 중열: 선택 요약(현재/강화 후 2컬럼)
b.patch("Panel_Summary", Object.assign({ pos: [-295, -30], rect_size: [340, 900] }, MC));
b.patch("Panel_Summary/Img_Bg", Object.assign({ pos: [0, 0], rect_size: [340, 900] }, MC));
b.patchComponent("Panel_Summary/Img_Bg", "MOD.Core.SpriteGUIRendererComponent", { Color: CARD_DARK });
b.patch("Panel_Summary/Img_ItemSlot", Object.assign({ pos: [0, 330], rect_size: [108, 108] }, MC));
b.patch("Panel_Summary/Text_Name", Object.assign({ pos: [0, 245], rect_size: [300, 36] }, MC));
b.sprite("Panel_Summary/Line_1", Object.assign({ pos: [0, 208], rect_size: [300, 6], image_ruid: LINE }, MC));
b.text("Panel_Summary/Text_ColCur", "현재", Object.assign({ pos: [-70, 178], rect_size: [140, 22], size: 13, color: "#9AA4B2", alignment: 3 }, MC));
b.text("Panel_Summary/Text_ColNext", "강화 후", Object.assign({ pos: [115, 178], rect_size: [100, 22], size: 13, color: "#9AA4B2", alignment: 5 }, MC));
b.patch("Panel_Summary/Text_Stats", Object.assign({ pos: [-35, -110], rect_size: [220, 520] }, MC));
b.text("Panel_Summary/Text_StatsNext", "", Object.assign({ pos: [120, -110], rect_size: [90, 520], size: 16, color: "#9BE28C", alignment: 2 }, MC));

// ── 우열: 탭 3(콘텐츠 상단 부착) + 콘텐츠 카드
b.patch("Btn_TabFlame", Object.assign({ pos: [150, 445], rect_size: [190, 74] }, MC));
b.patch("Btn_TabStar", Object.assign({ pos: [350, 445], rect_size: [190, 74] }, MC));
b.patch("Btn_TabPot", Object.assign({ pos: [550, 445], rect_size: [190, 74] }, MC));
const ROOTS = [
  "UIR_SimpleFantasy_Sample_StarForce/Panel",
  "UIR_SimpleFantasy_Sample_PotentialReset/Layout",
  "UIR_SimpleFantasy_Sample_PotentialSelect/Layout",
];
for (const p of ROOTS) {
  b.patch(p, Object.assign({ pos: [350, -15] }, MC));
  if (b.hasComponent(p, "MOD.Core.SpriteGUIRendererComponent")) {
    b.patchComponent(p, "MOD.Core.SpriteGUIRendererComponent", { Color: { r: 0.07, g: 0.09, b: 0.12, a: 0.95 } });
  }
}
// 샘플 자체 헤더 요소 숨김(탭이 그 자리를 차지)
for (const p of [
  "UIR_SimpleFantasy_Sample_StarForce/Panel/Text_Title",
  "UIR_SimpleFantasy_Sample_StarForce/Panel/Btn_Info",
  "UIR_SimpleFantasy_Sample_StarForce/Panel/Btn_Close",
  "UIR_SimpleFantasy_Sample_PotentialReset/Layout/Text_Title",
  "UIR_SimpleFantasy_Sample_PotentialReset/Layout/Btn_Info",
  "UIR_SimpleFantasy_Sample_PotentialReset/Layout/Btn_Close",
  "UIR_SimpleFantasy_Sample_PotentialSelect/Layout/Text_Title",
  "UIR_SimpleFantasy_Sample_PotentialSelect/Layout/Btn_Info",
]) b.patch(p, { enable: false });
// 잠재 선택 탭의 1200폭 구분선 잔재 축소
b.patch("UIR_SimpleFantasy_Sample_PotentialSelect/Layout/Deco_Line", { rect_size: [740, 4] });
// 비용 바 배경 다크 틴트
for (const p of [
  "UIR_SimpleFantasy_Sample_StarForce/Panel/Layout_Cost/Img_BG",
  "UIR_SimpleFantasy_Sample_PotentialReset/Layout/Layout_Cost/Img_BG",
  "UIR_SimpleFantasy_Sample_PotentialSelect/Layout/Layout_Cost/Img_BG",
]) b.patchComponent(p, "MOD.Core.SpriteGUIRendererComponent", { Color: { r: 0.10, g: 0.13, b: 0.18, a: 0.9 } });

// 샘플 내부 텍스트 일괄 밝게(다크 배경 가독성) — GearItemInfo(꺼둔 상세창) 제외
const BRIGHT = { r: 0.93, g: 0.95, b: 0.98, a: 1 };
let fixed = 0;
for (const e of b.listEntities()) {
  const top = e.path.split("/")[3] || "";
  if (!top.startsWith("UIR_SimpleFantasy_Sample_")) continue;
  if (top === "UIR_SimpleFantasy_Sample_GearItemInfo") continue;
  if (b.hasComponent(e.path, "MOD.Core.TextComponent")) {
    b.patchComponent(e.path, "MOD.Core.TextComponent", { FontColor: BRIGHT });
    fixed++;
  }
  if (b.hasComponent(e.path, "MOD.Core.TextGUIRendererComponent")) {
    b.patchComponent(e.path, "MOD.Core.TextGUIRendererComponent", { FontColor: BRIGHT });
    fixed++;
  }
}
console.log("brightened texts:", fixed);

b.write(UI, { strict: false });
console.log("enhance window A-rebuild done");
