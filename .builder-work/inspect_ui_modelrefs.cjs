// For each Group .ui, list which model Entry IDs its entities are instances of.
// Read-only via UIBuilder. Surfaces origin.entry_id / modelId references.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));

const dir = path.join("C:", "Users", "rnsgu", "MSW_ProjectAI00", "ui");
const files = [
  "DefaultGroup.ui", "SideMenuGroup.ui", "InventoryGroup.ui",
  "EnhanceGroup.ui", "PromoteGroup.ui",
];

// map known ids → friendly name
const known = {
  "2b1a2c65-ccd6-4573-a174-ee9fb92d0b88": "Model_Controller",
  "47f29cff-062a-4302-8f28-530c38e5e30c": "Model_UI_Inventory",
  "c2e155f9-4470-42de-aad9-00b52ba927af": "Model_Btn_Inventory",
  "f9837329-e34e-4d88-a6cc-d2f45994d4cb": "Model_Btn_Menu",
  "50a6635f-6ad6-4100-ba19-635c04ba398d": "Model_Panel_Side",
  "29fe0677-193e-4a52-8f77-d4693c53b7eb": "Model_EnhanceRoot",
  "d7f909ac-5033-47f0-8bc0-3c8a4d29a223": "Model_EnhanceRootXX",
  "a0df5b3d-b541-4f23-a575-cd8e8d0411ff": "Model_PromoteRoot",
  "661a9e1c-74e1-4ee0-a0ef-e5edf128857a": "Model_PromoteRootXX",
};

function collectIds(obj, acc) {
  if (obj == null || typeof obj !== "object") return;
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if ((k === "entry_id" || k === "entryId" || k === "modelId" || k === "root_model_id" ||
         k === "rootModelId" || k === "sub_entity_id") && typeof v === "string" && v.length >= 8) {
      acc[v] = (acc[v] || 0) + 1;
    }
    if (typeof v === "object") collectIds(v, acc);
    if (typeof v === "string" && v.startsWith("model://")) {
      const id = v.slice("model://".length);
      acc[id] = (acc[id] || 0) + 1;
    }
  }
}

for (const f of files) {
  try {
    const b = UIBuilder.read(path.join(dir, f));
    const j = b.build();
    const acc = {};
    collectIds(j, acc);
    // filter to model-like ids we care about (known + any uuid appearing via model://)
    const rows = Object.keys(acc)
      .filter((id) => known[id] !== undefined)
      .map((id) => `${known[id]}(${id.slice(0,8)})×${acc[id]}`);
    console.log(f.padEnd(20) + " → " + (rows.length ? rows.join(", ") : "(no custom-model refs)"));
  } catch (e) {
    console.log(f.padEnd(20) + " ERROR: " + e.message);
  }
}
