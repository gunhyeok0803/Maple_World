const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);

// 창을 캔버스에 맞게 확장(콘텐츠 962 높이 수용)
b.patch("Window", { pos: [0, 0], rect_size: [1760, 1060] });
b.patch("Window/Img_Bg", { rect_size: [1760, 1060] });
b.patch("Window/Text_WinTitle", { pos: [0, -16] });
b.patch("Window/Btn_CloseMain", { pos: [-18, -10] });

// 탭/콘텐츠 재정렬(창 안 수납)
b.patch("Btn_TabFlame", { pos: [230, 470] });
b.patch("Btn_TabStar", { pos: [430, 470] });
b.patch("Btn_TabPot", { pos: [630, 470] });
b.patch("UIR_SimpleFantasy_Sample_StarForce/Panel", { pos: [430, -35] });
b.patch("UIR_SimpleFantasy_Sample_PotentialReset/Layout", { pos: [430, -35] });
b.patch("UIR_SimpleFantasy_Sample_PotentialSelect/Layout", { pos: [430, -35] });

// 좌/중 카드 재정렬 + 스탯 텍스트 폭 재지정
b.patch("Panel_EquipList", { pos: [-640, -25], rect_size: [420, 900], pivot: [0.5, 0.5] });
b.patch("Panel_EquipList/Img_Bg", { rect_size: [420, 900] });
b.patch("Panel_Summary", { pos: [-180, -25], rect_size: [420, 900], pivot: [0.5, 0.5] });
b.patch("Panel_Summary/Img_Bg", { rect_size: [420, 900] });
b.patch("Panel_Summary/Text_Stats", { anchor: "middle-center", pos: [0, -80], rect_size: [320, 460], pivot: [0.5, 0.5] });

b.write(UI, { strict: false });
console.log("window fit fixed");
