const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/SideMenuGroup.ui");
for (const e of b.listEntities()) {
  const s = b.getComponent(e.path, "MOD.Core.SpriteGUIRendererComponent");
  const t = b.getComponent(e.path, "MOD.Core.UITransformComponent");
  const txt = b.getComponent(e.path, "MOD.Core.TextComponent");
  let line = e.path.replace("/ui/SideMenuGroup/", "") + "  ";
  if (t) line += `pos=(${Math.round(t.anchoredPosition?.x ?? 0)},${Math.round(t.anchoredPosition?.y ?? 0)}) size=(${Math.round(t.RectSize?.x ?? 0)}x${Math.round(t.RectSize?.y ?? 0)}) `;
  if (s) {
    const ruid = s.ImageRUID && (s.ImageRUID.DataId || s.ImageRUID);
    const c = s.Color || {};
    line += `ruid=${typeof ruid === "string" ? ruid : JSON.stringify(ruid)} color=(${(c.r ?? 1).toFixed(2)},${(c.g ?? 1).toFixed(2)},${(c.b ?? 1).toFixed(2)},${(c.a ?? 1).toFixed(2)})`;
  }
  if (txt) line += ` text='${txt.Text}' font=${txt.FontSize} fcolor=(${(txt.FontColor?.r ?? 1).toFixed(2)},${(txt.FontColor?.g ?? 1).toFixed(2)},${(txt.FontColor?.b ?? 1).toFixed(2)})`;
  console.log(line);
}
