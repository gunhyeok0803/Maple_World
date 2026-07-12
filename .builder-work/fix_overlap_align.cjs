const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const MC = { anchor:"middle-center", pivot:[0.5,0.5] };

// ── (1) 좌열: 잠금 3칸(한 줄)·섹션·그리드 겹침 해소 ──
const LK=[[-88,70],[0,70],[88,70]];
for (let i=0;i<3;i++) b.patch("Panel_EquipList/LockCell_"+(i+1), Object.assign({ pos:LK[i], rect_size:[84,84], enable:true }, MC));
for (let i=4;i<=8;i++) b.patch("Panel_EquipList/LockCell_"+i, { enable:false });
b.patch("Panel_EquipList/Text_Section", Object.assign({ pos:[0,0], rect_size:[250,24] }, MC));
b.patch("Panel_EquipList/Grid", Object.assign({ pos:[0,-185], rect_size:[240,330] }, MC));

// ── (2) 요약: 현재/강화후 헤더를 아래 컬럼 가장자리에 정렬 ──
// Text_Stats 좌단 -132.5(라벨 시작), Text_StatsNext 우단 142.5(델타 끝)에 맞춤
b.patch("Panel_Summary/Text_ColCur", Object.assign({ pos:[-60,144], rect_size:[145,22] }, MC));   // 좌단 -132.5 (align=MiddleLeft 유지)
b.patch("Panel_Summary/Text_ColNext", Object.assign({ pos:[90,144], rect_size:[105,22] }, MC));    // 우단 142.5 (align=MiddleRight 유지)

b.write(UI,{strict:false});
console.log("overlap + header align fixed");
