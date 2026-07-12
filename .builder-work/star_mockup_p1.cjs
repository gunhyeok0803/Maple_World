const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const S = "UIR_SimpleFantasy_Sample_StarForce/Panel";
// 되살리기: 현재▶다음 숫자, 하락(4열), 증폭 stat 행
b.patch(S + "/StarForceLevel", { enable: true });
b.patch(S + "/Layout_Prob/Decrease", { enable: true });
// 우측 아이템 아이콘은 레퍼런스에 없음(아이템은 중앙 요약) → 숨김
b.patch(S + "/Img_Deco", { enable: false });
b.write(UI, { strict: false });
console.log("star mockup pass1 (baseline reveal) done");
