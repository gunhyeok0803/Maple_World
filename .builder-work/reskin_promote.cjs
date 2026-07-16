// PromoteGroup(승급/컬렉션) 리스킨 — 강화창과 동일 스킴.
// 프레임=Skill_Info, 목록카드=Achievement_Slot, 정보카드=Tint_Square_R10, 텍스트 어두운 계열.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const SP = "MOD.Core.SpriteGUIRendererComponent";
const TG = "MOD.Core.TextGUIRendererComponent";
const TL = "MOD.Core.TextComponent";
const FRAME = "56bfbdd3503340ba978baeac40681ce7"; // Skill_Info_Bg_01
const PANEL_UNI = "c26a3cc43a2347979a54ad4d35292271"; // Achievement_Slot
const FLAT = "9eee37f21d974889947d021f08bcda62"; // Tint_Square_R10
const WHITE = { r: 1, g: 1, b: 1, a: 1 };
const TITLE = { r: 0.23, g: 0.26, b: 0.31, a: 1 };
const BODY  = { r: 0.29, g: 0.33, b: 0.39, a: 1 };
const MUTED = { r: 0.42, g: 0.45, b: 0.50, a: 1 };
const GREEN = { r: 0.16, g: 0.55, b: 0.22, a: 1 };
const GOLD  = { r: 0.55, g: 0.42, b: 0.15, a: 1 };

const R = "PromoteRoot/";
const b = UIBuilder.read("ui/PromoteGroup.ui");

// ── 프레임/카드 ──
b.patchComponent(R + "Window/Img_Bg", SP, { ImageRUID: { DataId: FRAME }, Type: 1, Color: WHITE });
b.patchComponent(R + "Panel_Promote/Card_List", SP, { ImageRUID: { DataId: PANEL_UNI }, Type: 1, Color: WHITE });
b.patchComponent(R + "Panel_Promote/Card_Info", SP, { ImageRUID: { DataId: FLAT }, Type: 1, Color: WHITE });
b.patchComponent(R + "Panel_Coll/Card_Info", SP, { ImageRUID: { DataId: FLAT }, Type: 1, Color: WHITE });

// ── 창 타이틀 ──
b.patchComponent(R + "Window/Text_WinTitle", TL, { FontColor: TITLE });

// ── 승급 탭 텍스트 ──
const promoteTL = {
  "Text_ListTitle": TITLE, "Text_Target": TITLE, "Text_Need": BODY,
  "Text_Times": TITLE, "Text_Result": BODY, "Text_Rate": GREEN, "Text_Arrow": GOLD,
};
for (const [n, c] of Object.entries(promoteTL)) b.patchComponent(R + "Panel_Promote/" + n, TL, { FontColor: c });

// ── 컬렉션 탭 텍스트 ──
b.patchComponent(R + "Panel_Coll/Coll_RegionName", TG, { FontColor: GOLD });
b.patchComponent(R + "Panel_Coll/Coll_Progress", TG, { FontColor: BODY });
b.patchComponent(R + "Panel_Coll/Coll_Reward", TG, { FontColor: MUTED });
b.patchComponent(R + "Panel_Coll/RegHdr", TG, { FontColor: GOLD });
b.patchComponent(R + "Panel_Coll/RegSub", TG, { FontColor: MUTED });
b.patchComponent(R + "Panel_Coll/RegPrompt", TG, { FontColor: MUTED });
b.patchComponent(R + "Panel_Coll/RegEmpty", TG, { FontColor: MUTED });
// 컬렉션 탭에도 승급과 동일 이름의 우측 텍스트 잔재(Text_*) — 동일 처리
for (const n of ["Text_Target", "Text_Need", "Text_Times", "Text_Result"]) {
  b.patchComponent(R + "Panel_Coll/" + n, TL, { FontColor: BODY });
}

// ── 밝은 회색 버튼 라벨 어둡게(+/-/MAX/승급하기) ──
for (const p of ["Panel_Promote/Btn_Minus", "Panel_Promote/Btn_Plus", "Panel_Promote/Btn_Max", "Panel_Promote/Btn_Action",
                 "Panel_Coll/Btn_Minus", "Panel_Coll/Btn_Plus", "Panel_Coll/Btn_Max", "Panel_Coll/Btn_Action"]) {
  b.patchComponent(R + p, TL, { FontColor: TITLE });
}

b.write("ui/PromoteGroup.ui");
console.log("[RESKIN] PromoteGroup done");
