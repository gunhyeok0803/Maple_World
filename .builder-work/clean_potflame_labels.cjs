const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const POT = "UIR_SimpleFantasy_Sample_PotentialSelect/Layout";
const FLAME = "UIR_SimpleFantasy_Sample_PotentialReset/Layout";
function label(rel, s) {
  for (const ct of ["MOD.Core.TextComponent", "MOD.Core.TextGUIRendererComponent"]) {
    if (b.hasComponent(rel, ct)) { b.patchComponent(rel, ct, { Text: s }); return "self:" + ct.replace("MOD.Core.",""); }
  }
  // 버튼 라벨이 자식에 있는 경우
  for (const e of b.listEntities()) {
    if (!e.path.startsWith("/ui/EnhanceGroup/" + rel + "/")) continue;
    const r = e.path.replace("/ui/EnhanceGroup/", "");
    for (const ct of ["MOD.Core.TextComponent", "MOD.Core.TextGUIRendererComponent"]) {
      if (b.hasComponent(r, ct)) { b.patchComponent(r, ct, { Text: s }); return "child:" + r.split("/").pop(); }
    }
  }
  return "MISS";
}
console.log("잠재변경:", label(POT + "/Btn_Cancel", "잠재 변경"));
console.log("유지하기:", label(POT + "/Layout_Before/Btn_Select", "유지하기"));
console.log("선택하기:", label(POT + "/Layout_After/Btn_Select", "선택하기"));
console.log("추가옵션:", label(FLAME + "/Layout_PotenInfo/Img_Grade/Text_Grade", "추가 옵션 (§06 개별 인스턴스 귀속)"));
console.log("불꽃사용:", label(FLAME + "/Btn_Ok", "환생의 불꽃 사용"));
b.write(UI, { strict: false });
console.log("pot/flame labels -> .ui done");
