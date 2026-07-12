const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui");
const PRE = "/ui/InventoryGroup/UIR_SimpleFantasy_Sample_Inventory";
const ents = b.listEntities().filter(e => e.path && (e.path === PRE || e.path.startsWith(PRE + "/")));

function short(t) {
  return t.replace("MOD.Core.", "").replace("Component", "")
    .replace("UITransform,", "").replace("SpriteGUIRenderer", "SPR").replace("TextGUIRenderer", "TXT")
    .replace("ScrollLayoutGroup", "SCROLL").replace("GridView", "GRID").replace("AvatarGUIRenderer", "AVATAR")
    .replace("CostumeManager", "COSTUME").replace("Button", "BTN");
}

for (const e of ents) {
  const rec = b.find(e.path);
  const js = rec.jsonString;
  const comps = (js["@components"] || []);
  const types = comps.map(c => short(c["@type"])).filter(t => t !== "UITransform").join("+") || "-";
  const rel = e.path.replace(PRE, "") || "(root)";
  const depth = (rel.match(/\//g) || []).length;
  const ind = "  ".repeat(depth);
  // 유용 정보 추출
  let extra = [];
  for (const c of comps) {
    const t = c["@type"];
    if (t === "MOD.Core.TextGUIRendererComponent" || t === "MOD.Core.TextComponent") {
      if (c.Text) extra.push(`txt="${String(c.Text).slice(0, 14)}"`);
      if (c.FontSize) extra.push(`fs=${c.FontSize}`);
    }
    if (t === "MOD.Core.GridViewComponent") {
      extra.push(`grid cell=${JSON.stringify(c.CellSize)} spacing=${JSON.stringify(c.Spacing)} fixed=${c.FixedCount}`);
    }
    if (t === "MOD.Core.ScrollLayoutGroupComponent") {
      extra.push(`scroll type=${c.LayoutType} cell=${JSON.stringify(c.CellSize)}`);
    }
    if (t === "MOD.Core.SpriteGUIRendererComponent") {
      const r = c.ImageRUID && c.ImageRUID.DataId ? c.ImageRUID.DataId.slice(0, 8) : "none";
      extra.push(`ruid=${r}${c.Type !== undefined ? " T" + c.Type : ""}`);
    }
  }
  const ut = comps.find(c => c["@type"] === "MOD.Core.UITransformComponent") || {};
  const sz = ut.RectSize ? `${Math.round(ut.RectSize.x)}x${Math.round(ut.RectSize.y)}` : "?";
  const en = js.enable === false ? " [OFF]" : "";
  console.log(`${ind}${rel.split("/").pop() || "(root)"} <${types}> ${sz}${en} ${extra.join(" ")}`);
}
console.log("TOTAL:", ents.length);
