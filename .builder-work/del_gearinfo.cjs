const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const before = b.listEntities().length;
if (b.find("UIR_SimpleFantasy_Sample_GearItemInfo")) {
  b.remove("UIR_SimpleFantasy_Sample_GearItemInfo");
  console.log("removed GearItemInfo");
} else {
  console.log("GearItemInfo not found");
}
const after = b.listEntities().length;
console.log("entities: " + before + " -> " + after + " (removed " + (before - after) + ")");
b.write(UI, { strict: false });
console.log("done");
