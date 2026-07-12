const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/SideMenuGroup.ui");
for (const name of ["Panel_Side", "Panel_Side/Img_Bg"]) {
  const t = b.getComponent(name, "MOD.Core.UITransformComponent");
  const s = b.getComponent(name, "MOD.Core.SpriteGUIRendererComponent");
  console.log("=== " + name);
  console.log("  anchorsMin=" + JSON.stringify(t.AnchorsMin) + " anchorsMax=" + JSON.stringify(t.AnchorsMax));
  console.log("  offsetMin=" + JSON.stringify(t.OffsetMin) + " offsetMax=" + JSON.stringify(t.OffsetMax));
  console.log("  rectSize=" + JSON.stringify(t.RectSize) + " anchoredPos=" + JSON.stringify(t.anchoredPosition) + " pivot=" + JSON.stringify(t.Pivot));
  if (s) console.log("  sprite color=" + JSON.stringify(s.Color) + " ruid=" + JSON.stringify(s.ImageRUID) + " type=" + s.Type + " alpha? raycast=" + s.RaycastTarget);
}
