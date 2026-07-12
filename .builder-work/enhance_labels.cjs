// 안전한 라벨 수정(위치 불변): 기존 노드 텍스트만 교체.
const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
b.patchComponent("/ui/EnhanceGroup/Panel_EquipList/Text_Section", "MOD.Core.TextComponent", { Text: "인벤 장비" });
b.write(UI, { strict: false });
console.log("DONE labels");
