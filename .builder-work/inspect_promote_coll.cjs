// Inspect existing PromoteGroup 컬렉션 탭(panelColl) structure + slot resources — to reuse exactly.
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("ui/PromoteGroup.ui");
for (const e of b.listEntities()) {
  const p = e.path || "";
  // panelColl subtree (컬렉션 탭) + tab buttons
  if (p.indexOf("Book") !== -1 || p.indexOf("Coll") !== -1 || p.indexOf("PartTab") !== -1 || p.indexOf("Btn_Tab") !== -1 || p.indexOf("Card_Book") !== -1) {
    console.log(`${p}  [${e.kind}] size=${JSON.stringify(e.size)} pos=${JSON.stringify(e.pos)}`);
  }
}
