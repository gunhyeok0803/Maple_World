const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const S = "UIR_SimpleFantasy_Sample_StarForce/Panel";
function label(rel, s) {
  for (const ct of ["MOD.Core.TextComponent", "MOD.Core.TextGUIRendererComponent"]) {
    if (b.hasComponent(rel, ct)) { b.patchComponent(rel, ct, { Text: s }); return true; }
  }
  return false;
}
// 런타임 숨김 → .ui로 이관(에디터=런타임 일치)
const hides = [
  S + "/Layout_Prob/Decrease",
  S + "/Item",
  S + "/Scroll_Stat",
  S + "/StarForceLevel",
  S + "/Layout_Item/Layout_Protect/SelectBG",
  S + "/Layout_Item/Layout_Safety/Text_Count",
  S + "/Layout_Item/Layout_Safety/SelectBG",
];
for (const h of hides) { if (b.find(h)) b.patch(h, { enable: false }); }
// 고정 라벨 → .ui로 이관(Maker 편집 가능)
console.log("파괴흔적:", label(S + "/Layout_Item/Layout_Protect/Text_Type", "파괴 흔적"));
console.log("복구하기:", label(S + "/Layout_Item/Layout_Safety/Text_Type", "복구하기 (순정 1개 소모)"));
b.write(UI, { strict: false });
console.log("star tab .ui cleanup done");
