const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const files = ["DefaultGroup","PopupGroup","ToastGroup","UIGroup","SwatchGroup"];
for (const f of files) {
  const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/" + f + ".ui");
  const g = b.getComponent("/", "MOD.Core.UIGroupComponent");
  const ents = b.listEntities();
  const children = ents.filter(e => e.depth === 1).map(e => e.path.split("/").pop());
  console.log(f + ": DefaultShow=" + (g?g.DefaultShow:"?") + " topChildren=[" + children.join(", ") + "]");
}
