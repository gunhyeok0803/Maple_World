const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const PANEL = "6e8e561a4582462eaad762cb11d1f835";
const MC = { anchor: "middle-center", pivot: [0.5, 0.5] };
const BRIGHT = "#EDF2F8";

const POT = "UIR_SimpleFantasy_Sample_PotentialSelect/Layout";
const FLAME = "UIR_SimpleFantasy_Sample_PotentialReset/Layout";
const STAR = "UIR_SimpleFantasy_Sample_StarForce/Panel";

// ── 잠재 탭: 상단에 아이템 헤더(슬롯+아이콘) 추가 + before 카드 아래로
b.patch(POT + "/Layout_Before", Object.assign({ pos: [0, -290] }, MC, { anchor: "top-center" }));
b.patch(POT + "/Img_Arrow", Object.assign({ pos: [0, -470] }, MC, { anchor: "top-center" }));
b.patch(POT + "/Layout_After", Object.assign({ pos: [0, -650] }, MC, { anchor: "top-center" }));
b.sprite(POT + "/Img_ItemHdr", Object.assign({ pos: [-150, -70], rect_size: [88, 88], image_ruid: PANEL, sprite_type: 1 }, MC, { anchor: "top-center" }));
b.sprite(POT + "/Img_ItemHdr/Icon", Object.assign({ pos: [0, 0], rect_size: [52, 52] }, MC, { enable: false }));
b.text(POT + "/Text_ItemHdr", "", Object.assign({ pos: [40, -70], rect_size: [260, 40], size: 20, color: BRIGHT, alignment: 3 }, MC, { anchor: "top-center" }));

// ── 환생 탭: 다이아 배너 중앙에 아이템 아이콘 + 이름
b.sprite(FLAME + "/Img_ItemHdr", Object.assign({ pos: [0, -80], rect_size: [92, 92], image_ruid: PANEL, sprite_type: 1 }, MC, { anchor: "top-center" }));
b.sprite(FLAME + "/Img_ItemHdr/Icon", Object.assign({ pos: [0, 0], rect_size: [56, 56] }, MC, { enable: false }));

// ── 스타포스 탭: 별 게이지 텍스트 추가(아이템 아이콘 Img_Deco 아래)
b.text(STAR + "/Text_StarGauge", "", Object.assign({ pos: [0, 120], rect_size: [700, 60], size: 26, color: "#F5C542", alignment: 4 }, MC));

b.write(UI, { strict: false });
console.log("tab items added");
