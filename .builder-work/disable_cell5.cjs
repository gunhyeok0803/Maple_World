const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
let i=5;
while (b.find("Panel_EquipList/EquipCell_"+i)){ b.patch("Panel_EquipList/EquipCell_"+i, { enable:false }); console.log("disabled EquipCell_"+i); i++; }
b.write(UI,{strict:false});
console.log("done");
