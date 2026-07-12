const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const S = "UIR_SimpleFantasy_Sample_StarForce/Panel";
const STAR = "a80c808cc5a443c482ab8beab205c068";
const ORANGE = "501210f182594602b16e083351ea3ab3"; // W190 04 (복구하기 구분색)
const TC = { anchor: "top-center", pivot: [0.5, 0.5] };
const BC = { anchor: "bottom-center", pivot: [0.5, 0.5] };
const EMPTY = { r: 0.28, g: 0.30, b: 0.34, a: 1 };

// ── 텍스트 게이지 제거
b.patch(S + "/Text_StarGauge", { enable: false });
// ── 그래픽 별 20개(5개×4묶음) — 콘텐츠 최상단(탭 아래)
let x = -300;
for (let i = 1; i <= 20; i++) {
  const nm = S + "/Star_" + i;
  b.sprite(nm, Object.assign({ pos: [x, -80], rect_size: [26, 26], image_ruid: STAR }, TC));
  b.patchComponent(nm, "MOD.Core.SpriteGUIRendererComponent", { Color: EMPTY });
  x += 29;
  if (i % 5 === 0) x += 16;
}

// ── 콘텐츠 아래로 재배치
b.patch(S + "/StarForceLevel", Object.assign({ pos: [0, -150], rect_size: [700, 54] }, TC));
b.patch(S + "/Layout_Prob", Object.assign({ pos: [0, -270], rect_size: [740, 120] }, TC));
b.patch(S + "/Layout_Item", Object.assign({ pos: [0, -410], rect_size: [700, 120] }, TC));
// 파괴흔적만 남기고 복구하기(Layout_Safety)는 숨김(하단 버튼으로 이동)
b.patch(S + "/Layout_Item/Layout_Safety", { enable: false });

// ── 하단: 복구하기 | 강화하기 (색 다른 두 버튼)
b.patch(S + "/Layout_Cost", Object.assign({ pos: [0, 150] }, BC));
b.patch(S + "/Btn_Enchant", Object.assign({ pos: [135, 55], rect_size: [250, 84] }, BC));
b.button(S + "/Btn_Restore", "복구하기", Object.assign({ pos: [-135, 55], rect_size: [250, 84], font_size: 26, color: "#FFFFFF", image_ruid: ORANGE }, BC));

b.write(UI, { strict: false });
console.log("star mockup pass7 (graphic stars + shift down + restore button) done");
