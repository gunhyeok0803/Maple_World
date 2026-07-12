const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const POT = "UIR_SimpleFantasy_Sample_PotentialSelect/Layout";
const FLM = "UIR_SimpleFantasy_Sample_PotentialReset/Layout";

// ── 잠재 탭: 1300 가로 2-pane → 창 우측 열에 맞는 세로 스택
b.patch(POT, { pos: [430, -35], rect_size: [820, 950], pivot: [0.5, 0.5] });
b.patch(POT + "/Text_Title", { pos: [0, 440] });
b.patch(POT + "/Layout_Before", { pos: [0, 240], pivot: [0.5, 0.5] });
b.patch(POT + "/Img_Arrow", { pos: [0, 35] });
b.patch(POT + "/Layout_After", { pos: [0, -170], pivot: [0.5, 0.5] });
b.patch(POT + "/Layout_Cost", { pos: [0, -370], pivot: [0.5, 0.5] });
b.patch(POT + "/Btn_Cancel", { pos: [0, -440], rect_size: [315, 88], pivot: [0.5, 0.5] });
// 카드 내부 옵션 요약 텍스트(구 Item/Scroll_Stat 대체)
b.text(POT + "/Layout_Before/Text_Opts", "", { anchor: "middle-center", pos: [0, -55], rect_size: [500, 190], size: 18, color: "#3E4B5C", alignment: 4, pivot: [0.5, 0.5] });
b.text(POT + "/Layout_After/Text_Opts", "", { anchor: "middle-center", pos: [0, -55], rect_size: [500, 190], size: 18, color: "#3E4B5C", alignment: 4, pivot: [0.5, 0.5] });

// ── 환생 탭: 옵션 요약 텍스트
b.text(FLM + "/Layout_PotenInfo/Text_Opts", "", { anchor: "middle-center", pos: [0, -30], rect_size: [600, 170], size: 18, color: "#3E4B5C", alignment: 4, pivot: [0.5, 0.5] });

b.write(UI, { strict: false });
console.log("pot/flame tabs assembled");
