const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const MC = { anchor:"middle-center", pivot:[0.5,0.5] };
// 기존 2열 그리드 유지(x±48, 세로 간격 92, 셀 88) — 착용 4칸(row1~2) 아래로 잠금 3칸만.
// row1: 250(EquipCell_1,2)  row2: 158(3,4)  row3: 66(Lock1,2)  row4: -26(Lock3)
b.patch("Panel_EquipList/LockCell_1", Object.assign({ pos:[-48,66], rect_size:[88,88], enable:true }, MC));
b.patch("Panel_EquipList/LockCell_2", Object.assign({ pos:[48,66], rect_size:[88,88], enable:true }, MC));
b.patch("Panel_EquipList/LockCell_3", Object.assign({ pos:[-48,-26], rect_size:[88,88], enable:true }, MC));
for (let i=4;i<=8;i++) b.patch("Panel_EquipList/LockCell_"+i, { enable:false });
// 섹션/인벤 그리드는 잠금 아래로 재배치(겹침 없이)
b.patch("Panel_EquipList/Text_Section", Object.assign({ pos:[0,-110], rect_size:[250,24] }, MC));
b.patch("Panel_EquipList/Grid", Object.assign({ pos:[0,-250], rect_size:[240,230] }, MC));
b.write(UI,{strict:false});
console.log("locks back to 2-col grid (3 locks)");
