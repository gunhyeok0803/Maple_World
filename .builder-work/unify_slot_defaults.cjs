// 슬롯류 .ui 기본값 전수 통일: 기본(빈) 슬롯 = aa931a75 중립(모든 화면 동일).
// 파란 기본/흰백 바탕 혼재 해소. 채워지면 런타임이 잠재등급색+배지로 교체(위젯/SetItemHdr).
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const SP = "MOD.Core.SpriteGUIRendererComponent";
const NEUTRAL = "aa931a755e5949699233b817029a3e36";
const WHITE = { r: 1, g: 1, b: 1, a: 1 };

const apply = (b, file, paths) => {
  let n = 0;
  for (const p of paths) {
    if (b.find(p)) { b.patchComponent(p, SP, { ImageRUID: { DataId: NEUTRAL }, Type: 0, Color: WHITE }); n++; }
    else console.log("  (skip, 없음) " + p);
  }
  b.write(file);
  console.log("[UNIFY] " + file + " → " + n + " slots neutralized");
};

const e = UIBuilder.read("ui/EnhanceGroup.ui");
apply(e, "ui/EnhanceGroup.ui", [
  "Panel_Summary/Img_ItemSlot",
  "Tab_Flame/Layout/Img_ItemHdr",
  "Tab_Potential/Layout/Img_ItemHdr",
  "Tab_StarForce/Panel/Img_ItemHdr",
]);

const p = UIBuilder.read("ui/PromoteGroup.ui");
apply(p, "ui/PromoteGroup.ui", [
  "PromoteRoot/Panel_Promote/Img_From",
  "PromoteRoot/Panel_Promote/Img_To",
  "PromoteRoot/Panel_Coll/Img_BookSlot",
]);
