const { ModelBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/model/msw_model_builder.cjs");

const MODEL = "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UIResourceSimpleFantasy/Core/UIR_SimpleFantasy_Core_Slot.model";

const b = ModelBuilder.read(MODEL);
console.log("=== SNAPSHOT ===");
console.log(JSON.stringify(b.snapshot(), null, 1));
console.log("=== ROOT COMPONENTS ===");
console.log(b.listComponents());
const kids = b.listChildren();
console.log("=== CHILD COUNT ===", kids.length);
console.log("=== FIRST 3 CHILDREN (raw) ===");
for (const c of kids.slice(0, 3)) {
  console.log(JSON.stringify({ Name: c.Name, Id: c.Id, ParentId: c.ParentId, Components: c.Model && c.Model.Components, Values: c.Model && c.Model.Values }, null, 1));
}
