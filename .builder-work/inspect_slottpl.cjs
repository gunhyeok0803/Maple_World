const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui");

for (const p of ["Controller/BagPanel/SlotTemplate", "Controller/BagPanel/SlotTemplate/Body", "Controller/BagPanel/SlotTemplate/Icon", "Controller/BagPanel/SlotTemplate/Count"]) {
  const e = b.find(p);
  if (!e) { console.log(p, "=> NOT FOUND"); continue; }
  const comps = (e.jsonString["@components"] || []).map(c => c["@type"]);
  const sr = e.jsonString["@components"].find(c => c["@type"] === "MOD.Core.SpriteGUIRendererComponent");
  console.log("---", p, "id=", e.id);
  console.log("  comps:", comps.join(", "));
  if (sr) console.log("  ImageRUID:", JSON.stringify(sr.ImageRUID), " Color:", JSON.stringify(sr.Color), " Type:", sr.Type);
}
