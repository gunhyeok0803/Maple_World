const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const STAR = "UIR_SimpleFantasy_Sample_StarForce/Panel";
const TEXT_COMPS = ["MOD.Core.TextComponent", "MOD.Core.TextGUIRendererComponent"];

function patchText(rel, newText) {
  for (const ct of TEXT_COMPS) {
    if (b.hasComponent(rel, ct)) {
      const c = b.getComponent(rel, ct);
      console.log("PATCH", rel, ct.replace("MOD.Core.", ""), JSON.stringify(c.Text), "->", newText);
      b.patchComponent(rel, ct, { Text: newText });
      return true;
    }
  }
  return false;
}

const KOR = { Success: "성공", Keep: "유지", Destroy: "파괴" };
for (const row of Object.keys(KOR)) {
  const base = STAR + "/Layout_Prob/" + row;
  let done = patchText(base, KOR[row]); // 행 엔티티 자체
  for (const e of b.listEntities()) {
    if (!e.path.startsWith("/ui/EnhanceGroup/" + base + "/")) continue;
    if (e.path.includes("PercentBG")) continue;
    const rel = e.path.replace("/ui/EnhanceGroup/", "");
    if (patchText(rel, KOR[row])) done = true;
  }
  if (!done) console.log("MISS", row);
}

let hit = patchText(STAR + "/Btn_Enchant", "강화하기");
for (const e of b.listEntities()) {
  if (!e.path.startsWith("/ui/EnhanceGroup/" + STAR + "/Btn_Enchant/")) continue;
  const rel = e.path.replace("/ui/EnhanceGroup/", "");
  if (patchText(rel, "강화하기")) hit = true;
}
if (!hit) console.log("MISS Btn_Enchant");

b.write(UI, { strict: false });
console.log("polish a3 done");
