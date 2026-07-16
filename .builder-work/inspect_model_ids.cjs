// Inspect identity (EntryKey / Id / Name) of the custom UI models.
// Read-only: uses ModelBuilder.read + build to surface identity fields.
const path = require("path");
const { ModelBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-general", "scripts", "model", "msw_model_builder.cjs"
));

const dir = path.join("C:", "Users", "rnsgu", "MSW_ProjectAI00", "RootDesk", "MyDesk");
const files = [
  "Model_Controller.model",
  "Model_UI_Inventory.model",
  "Model_Btn_Inventory.model",
  "Model_Btn_Menu.model",
  "Model_Panel_Side.model",
  "Model_EnhanceRoot.model",
  "Model_EnhanceRootXX.model",
  "Model_PromoteRoot.model",
  "Model_PromoteRootXX.model",
];

for (const f of files) {
  try {
    const b = ModelBuilder.read(path.join(dir, f));
    const j = b.build();
    // top-level EntryKey; ContentProto.Json.{Id,Name}
    const entryKey = j.EntryKey || (j.Entry && j.Entry.Key) || "?";
    const cp = j.ContentProto || {};
    const json = cp.Json || {};
    const comps = b.listComponents();
    console.log(
      f.padEnd(28) +
      " EntryKey=" + String(entryKey) +
      " | Id=" + String(json.Id) +
      " | Name=" + String(json.Name) +
      " | comps=[" + comps.join(",") + "]"
    );
  } catch (e) {
    console.log(f.padEnd(28) + " ERROR: " + e.message);
  }
}
