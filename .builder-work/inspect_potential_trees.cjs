const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
const ROOTS = ["UIR_SimpleFantasy_Sample_PotentialSelect", "UIR_SimpleFantasy_Sample_PotentialReset"];
for (const e of b.listEntities()) {
  const top = e.path.split("/")[3];
  if (!ROOTS.includes(top)) continue;
  if (e.depth > 5) continue;
  const size = e.size ? `[${Math.round(e.size[0])}x${Math.round(e.size[1])}]` : "";
  console.log(`${"  ".repeat(e.depth - 1)}${e.name} ${size}${e.enable === false ? " [OFF]" : ""}`);
}
