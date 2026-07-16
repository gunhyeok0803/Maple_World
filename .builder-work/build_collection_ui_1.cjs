// Build CollectionGroup.ui — viewer part (mockup_collection_v1). Pack RUIDs, neutral slots.
// Sections are group-direct for coordinate reliability; only slot inner parts nest locally.
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");

// pack RUIDs (SimpleFantasy)
const R_DARKPANEL = "6e8e561a4582462eaad762cb11d1f835";
const R_SLOT      = "aa931a755e5949699233b817029a3e36"; // neutral slot base
const R_XBTN      = "07096261a9944312b01dee501fed7599";
const R_DIVIDER   = "66b6a9dde07b4c3abb90c16c0feeed3f";

const NAVY   = { r: 0.055, g: 0.07, b: 0.11, a: 0.97 };
const GOLD   = "#f0d98a";
const SUBTXT = "#8f9bb3";

const PARTS = ["모자","상의","하의","장갑","신발","귀고리","망토","눈장식","무기"];
const REGIONS = ["암허스트","헤네시스","엘리니아","페리온","커닝시티"];

const b = new UIBuilder("CollectionGroup", 20, true);

// modal dimmer (blocks clicks behind)
b.sprite("Dimmer", { anchor: "stretch", pos: [0, 0], color: { r: 0.02, g: 0.03, b: 0.05, a: 0.6 }, raycast: true, image_ruid: R_DARKPANEL });

// main window backdrop (visual only)
b.sprite("Panel_Bg", { anchor: "middle-center", pos: [0, 0], rect_size: [1180, 720], color: NAVY, image_ruid: R_DARKPANEL });

// title band
b.text("Title", "컬렉션", { anchor: "middle-center", pos: [-470, 322], rect_size: [240, 46], size: 30, bold: true, color: GOLD, alignment: 3 /*MiddleLeft*/ });
b.text("Subtitle", "지역 도감 · 장비를 등록해 영구 능력치를 얻으세요", { anchor: "middle-center", pos: [-70, 322], rect_size: [560, 30], size: 17, color: SUBTXT, alignment: 3 });
b.button("Btn_Close", "", { anchor: "middle-center", pos: [548, 322], rect_size: [44, 44], image_ruid: R_XBTN, bg_color: { r: 0.11, g: 0.13, b: 0.2, a: 1 } });
b.sprite("Divider_Top", { anchor: "middle-center", pos: [0, 292], rect_size: [1160, 3], color: { r: 0.78, g: 0.63, b: 0.29, a: 0.35 }, image_ruid: R_DIVIDER });

// left region rail
b.sprite("Rail_Bg", { anchor: "middle-center", pos: [-478, -28], rect_size: [214, 560], color: { r: 0.03, g: 0.045, b: 0.07, a: 0.6 }, image_ruid: R_DARKPANEL });
b.text("Rail_Title", "지역", { anchor: "middle-center", pos: [-478, 232], rect_size: [180, 22], size: 13, color: "#7f8aa3", alignment: 3 });
for (let i = 0; i < REGIONS.length; i++) {
  const y = 190 - i * 58;
  const active = i === 0;
  b.button(`Btn_Region_${i + 1}`, "", {
    anchor: "middle-center", pos: [-478, y], rect_size: [196, 50],
    image_ruid: R_SLOT,
    bg_color: active ? { r: 0.24, g: 0.2, b: 0.09, a: 1 } : { r: 0.11, g: 0.13, b: 0.19, a: 0.9 },
  });
  b.text(`Btn_Region_${i + 1}/Name`, REGIONS[i], { anchor: "middle-center", pos: [-24, 0], rect_size: [130, 40], size: 15, bold: active, color: active ? GOLD : "#9aa5bd", alignment: 3 });
  b.text(`Btn_Region_${i + 1}/Cnt`, "0/9", { anchor: "middle-center", pos: [66, 0], rect_size: [44, 40], size: 12, color: active ? "#c8a24a" : "#5f6a82", alignment: 5 /*MiddleRight*/ });
}

// content header
b.text("RegionName", "암허스트", { anchor: "middle-center", pos: [-190, 245], rect_size: [320, 34], size: 22, bold: true, color: GOLD, alignment: 3 });
b.text("Progress", "0 / 9 등록", { anchor: "middle-center", pos: [470, 245], rect_size: [220, 30], size: 15, color: "#c8d2e6", alignment: 5 });

// 3x3 slot grid (group-direct positions; inner parts local)
const COLX = [-180, 120, 420];
const ROWY = [150, -10, -170];
for (let i = 0; i < 9; i++) {
  const cx = COLX[i % 3];
  const cy = ROWY[Math.floor(i / 3)];
  const s = `Slot_${i + 1}`;
  b.sprite(s, { anchor: "middle-center", pos: [cx, cy], rect_size: [214, 138], color: { r: 0.22, g: 0.25, b: 0.34, a: 1 }, image_ruid: R_SLOT, raycast: true });
  // filled-state parts (toggled by controller)
  b.sprite(`${s}/Icon`, { anchor: "middle-center", pos: [0, 14], rect_size: [58, 58], color: { r: 1, g: 1, b: 1, a: 1 }, image_ruid: R_SLOT, enable: false });
  b.sprite(`${s}/Check`, { anchor: "middle-center", pos: [82, 46], rect_size: [22, 22], color: { r: 0.24, g: 0.64, b: 0.42, a: 1 }, image_ruid: R_SLOT, enable: false });
  b.text(`${s}/Chip`, "", { anchor: "middle-center", pos: [-72, 46], rect_size: [56, 20], size: 10, bold: true, color: "#ffffff", alignment: 4, enable: false });
  // empty-state parts
  b.text(`${s}/Plus`, "＋", { anchor: "middle-center", pos: [0, 14], rect_size: [40, 40], size: 30, color: "#4a5470" });
  b.text(`${s}/Tag`, "미등록", { anchor: "middle-center", pos: [78, 48], rect_size: [56, 20], size: 11, color: "#4a5470", alignment: 5 });
  // part name (always)
  b.text(`${s}/PName`, PARTS[i], { anchor: "middle-center", pos: [0, -46], rect_size: [190, 24], size: 13, color: "#aeb8ce", alignment: 4 });
}

// bonus bar
b.sprite("BonusBar", { anchor: "middle-center", pos: [120, -278], rect_size: [830, 52], color: { r: 0.08, g: 0.1, b: 0.16, a: 0.85 }, image_ruid: R_DARKPANEL });
b.text("Bonus_Lbl", "컬렉션 효과", { anchor: "middle-center", pos: [-215, -278], rect_size: [120, 40], size: 13, color: SUBTXT, alignment: 3 });
b.text("Bonus_Atk", "공격력 +0", { anchor: "middle-center", pos: [-40, -278], rect_size: [140, 40], size: 15, color: "#dfe6f2", alignment: 3 });
b.text("Bonus_Def", "방어력 +0", { anchor: "middle-center", pos: [130, -278], rect_size: [140, 40], size: 15, color: "#dfe6f2", alignment: 3 });
b.text("Bonus_Hp", "HP +0", { anchor: "middle-center", pos: [300, -278], rect_size: [140, 40], size: 15, color: "#dfe6f2", alignment: 3 });
b.text("Hint", "※ 빈 슬롯을 눌러 보유 장비를 등록합니다. 등록 시 장비 1개가 소멸되고 슬롯이 영구 채워집니다.", { anchor: "middle-center", pos: [120, -330], rect_size: [830, 24], size: 12, color: "#6b7690", alignment: 4 });

b.write("ui/CollectionGroup.ui");
console.log("CollectionGroup.ui viewer written:", b.listEntities().length, "entities");
