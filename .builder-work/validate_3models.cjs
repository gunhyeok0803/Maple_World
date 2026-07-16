// Validate the 3 models InventoryGroup/PromoteGroup depend on — confirm package-ready.
const path = require("path");
const { ModelBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-general", "scripts", "model", "msw_model_builder.cjs"
));
const dir = path.join("C:", "Users", "rnsgu", "MSW_ProjectAI00", "RootDesk", "MyDesk");
const want = [
  ["Model_Controller.model",   "2b1a2c65-ccd6-4573-a174-ee9fb92d0b88"],
  ["Model_UI_Inventory.model", "47f29cff-062a-4302-8f28-530c38e5e30c"],
  ["Model_PromoteRoot.model",  "a0df5b3d-b541-4f23-a575-cd8e8d0411ff"],
];
for (const [f, expectId] of want) {
  try {
    const b = ModelBuilder.read(path.join(dir, f));
    const j = b.build();
    const id = (j.ContentProto && j.ContentProto.Json && j.ContentProto.Json.Id) || "?";
    const v = b.validate();
    const ok = String(id) === expectId;
    const errs = (v && v.errors) ? v.errors.length : (Array.isArray(v) ? v.filter(x=>x && x.severity==="error").length : "?");
    console.log(`${f.padEnd(26)} id=${id} idMatch=${ok ? "OK" : "MISMATCH!"} validate.errors=${errs}`);
  } catch (e) {
    console.log(`${f.padEnd(26)} ERROR: ${e.message}`);
  }
}
