const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
for (const e of b.listEntities()) {
  const size = e.size ? `[${Math.round(e.size[0])}x${Math.round(e.size[1])}]` : "";
  const pos = e.pos ? `(${Math.round(e.pos[0])},${Math.round(e.pos[1])})` : "";
  console.log(`${"  ".repeat(e.depth)}${e.name} ${size}${pos}${e.enable === false ? " [OFF]" : ""}`);
}
