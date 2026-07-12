const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui";
const b = UIBuilder.read(UI);

const PANEL = "6e8e561a4582462eaad762cb11d1f835";
const BLUE = "c2660e96661c4a6e8dc8eaa17eb0655c";   // 01 파랑(확정)
const GRAY = "50426b5b1ee44bc5a1c10355b0e9ad03";   // 02 회청
const WIN_DARK = { r: 0.04, g: 0.05, b: 0.07, a: 0.92 };
const CARD_DARK = { r: 0.07, g: 0.09, b: 0.12, a: 0.92 };
const MC = { anchor: "middle-center", pivot: [0.5, 0.5] };
const TEXT_COMPS = ["MOD.Core.TextComponent", "MOD.Core.TextGUIRendererComponent"];
function setLabel(rel, s) {
  for (const ct of TEXT_COMPS) if (b.hasComponent(rel, ct)) { b.patchComponent(rel, ct, { Text: s }); return true; }
  return false;
}

// ── 창: 1600×1000 다크(강화 창과 통일)
b.patch("Window", Object.assign({ pos: [0, 0], rect_size: [1600, 1000] }, MC));
b.patch("Window/Img_Bg", Object.assign({ pos: [0, 0], rect_size: [1600, 1000] }, MC));
b.patchComponent("Window/Img_Bg", "MOD.Core.SpriteGUIRendererComponent", { Color: WIN_DARK });
b.patch("Window/Text_WinTitle", { pos: [-560, -16] });
setLabel("Window/Text_WinTitle", "승급 / 컬렉션");

// ── 탭 2: 좌상단 부착
b.patch("Btn_TabPromote", Object.assign({ pos: [-500, 445], rect_size: [190, 74] }, MC));
b.patch("Btn_TabColl", Object.assign({ pos: [-300, 445], rect_size: [190, 74] }, MC));

// ── 승급 탭 재배치 (패널 내부 좌표, 패널 center = 창 [0,-45])
b.patch("Panel_Promote", Object.assign({ pos: [0, -45], rect_size: [1520, 840] }, MC));
const P = "Panel_Promote";
// 카드 배경 2장(뒤로 보내기 위해 display_order 낮춤)
b.sprite(P + "/Card_List", Object.assign({ pos: [-580, 0], rect_size: [300, 840], image_ruid: PANEL, sprite_type: 1 }, MC));
b.patchComponent(P + "/Card_List", "MOD.Core.SpriteGUIRendererComponent", { Color: CARD_DARK });
b.patch(P + "/Card_List", { display_order: -5 });
b.sprite(P + "/Card_Info", Object.assign({ pos: [175, 0], rect_size: [1140, 840], image_ruid: PANEL, sprite_type: 1 }, MC));
b.patchComponent(P + "/Card_Info", "MOD.Core.SpriteGUIRendererComponent", { Color: CARD_DARK });
b.patch(P + "/Card_Info", { display_order: -5 });
// 좌열: 리스트 타이틀 + 그리드(2열 88)
b.patch(P + "/Text_ListTitle", Object.assign({ pos: [-580, 390], rect_size: [280, 30] }, MC));
setLabel(P + "/Text_ListTitle", "승급 대상 (★0 순정)");
b.patch(P + "/Grid", Object.assign({ pos: [-580, -30], rect_size: [280, 740] }, MC));
b.patch(P + "/CellTemplate", { rect_size: [88, 88] });
b.patch(P + "/CellTemplate/Icon", { rect_size: [48, 48] });
// 우측: 변환 카드 [대상] → [결과]
b.sprite(P + "/Img_From", Object.assign({ pos: [-25, 250], rect_size: [108, 108], image_ruid: PANEL, sprite_type: 1 }, MC));
b.sprite(P + "/Img_From/Icon", Object.assign({ pos: [0, 0], rect_size: [64, 64] }, MC, { enable: false }));
b.text(P + "/Text_Arrow", "→", Object.assign({ pos: [175, 250], rect_size: [100, 60], size: 44, color: "#E8C24A", alignment: 4 }, MC));
b.sprite(P + "/Img_To", Object.assign({ pos: [375, 250], rect_size: [108, 108], image_ruid: PANEL, sprite_type: 1 }, MC));
b.sprite(P + "/Img_To/Icon", Object.assign({ pos: [0, 0], rect_size: [64, 64] }, MC, { enable: false }));
// 텍스트들
b.patch(P + "/Text_Target", Object.assign({ pos: [175, 140], rect_size: [900, 44] }, MC));
b.text(P + "/Text_Rate", "승급 성공률 100% (항상 성공)", Object.assign({ pos: [175, 90], rect_size: [600, 30], size: 18, color: "#9BE28C", alignment: 4 }, MC));
b.patch(P + "/Text_Need", Object.assign({ pos: [175, 35], rect_size: [900, 32] }, MC));
// 수량 조절 행
b.patch(P + "/Btn_Minus", Object.assign({ pos: [30, -70], rect_size: [70, 70] }, MC));
b.patch(P + "/Text_Times", Object.assign({ pos: [145, -70], rect_size: [150, 50] }, MC));
b.patch(P + "/Btn_Plus", Object.assign({ pos: [260, -70], rect_size: [70, 70] }, MC));
b.patch(P + "/Btn_Max", Object.assign({ pos: [380, -70], rect_size: [110, 70] }, MC));
for (const nm of ["Btn_Minus", "Btn_Plus", "Btn_Max"]) {
  b.patchComponent(P + "/" + nm, "MOD.Core.SpriteGUIRendererComponent", { ImageRUID: { DataId: GRAY } });
}
// 결과/실행
b.patch(P + "/Text_Result", Object.assign({ pos: [175, -180], rect_size: [900, 60] }, MC));
b.patch(P + "/Btn_Action", Object.assign({ pos: [175, -310], rect_size: [280, 90] }, MC));
b.patchComponent(P + "/Btn_Action", "MOD.Core.SpriteGUIRendererComponent", { ImageRUID: { DataId: BLUE } });
console.log("action label:", setLabel(P + "/Btn_Action", "승급하기"));

// 컬렉션 패널도 창 크기에 맞춰 컨테이너만 정리(도감 재구성은 다음 조각)
b.patch("Panel_Coll", Object.assign({ pos: [0, -45], rect_size: [1520, 840] }, MC));

b.write(UI, { strict: false });
console.log("promote B1 done");
