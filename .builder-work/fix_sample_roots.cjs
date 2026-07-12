const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
// 드롭된 샘플 루트들의 오프셋 확인
for (const r of ["UIR_SimpleFantasy_Sample_StarForce", "UIR_SimpleFantasy_Sample_PotentialReset", "UIR_SimpleFantasy_Sample_PotentialSelect"]) {
  const t = b.getComponent(r, "MOD.Core.UITransformComponent");
  console.log(r, "anchored=", JSON.stringify(t.anchoredPosition), "pivot=", JSON.stringify(t.Pivot), "anchorsMin=", JSON.stringify(t.AnchorsMin));
}
// 전부 중앙 정규화
b.patch("UIR_SimpleFantasy_Sample_StarForce", { pos: [0, 0] });
b.patch("UIR_SimpleFantasy_Sample_PotentialReset", { pos: [0, 0] });
b.patch("UIR_SimpleFantasy_Sample_PotentialSelect", { pos: [0, 0] });
b.write(UI, { strict: false });
console.log("sample roots normalized");
