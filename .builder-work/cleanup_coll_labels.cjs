// Safely remove leftover old level/grade labels under Panel_Coll (LV.10/20/30, 하급 등).
// Conservative: only TEXT-kind entities whose NAME matches old-label patterns; protect all register/info/matrix nodes.
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("ui/PromoteGroup.ui");

const PROTECT = /Cell_|ColHdr_|RowHdr_|CollHint|Card|Btn|Info|Times|Action|Minus|Plus|Max|Sel|Icon|Count|Reg|Book/i;
const OLD = /(Lv|Level|레벨|Grade|등급|하급|중급|상급|최상급)/i;

const toRemove = [];
for (const e of b.listEntities()) {
  const p = e.path || "";
  const name = p.split("/").pop() || "";
  if (p.indexOf("/Panel_Coll/") === -1) continue;
  // direct-ish label under Panel_Coll, TEXT kind, name looks like old level/grade label, not protected
  if (e.kind === "TEXT" && OLD.test(name) && !PROTECT.test(name)) {
    toRemove.push({ path: p, name });
  }
}
console.log("candidates to remove:", toRemove.length);
for (const t of toRemove) console.log("  -", t.path);
// convert absolute path to group-root-relative identifier (strip /ui/PromoteGroup/)
for (const t of toRemove) {
  const id = t.path.replace(/^\/ui\/PromoteGroup\//, "");
  if (b.find(t.path)) b.remove(id);
}
if (toRemove.length > 0) { b.write("ui/PromoteGroup.ui"); console.log("removed", toRemove.length, "leftover labels."); }
else { console.log("no matching leftover labels found (names may differ)."); }
