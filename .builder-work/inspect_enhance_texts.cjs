// 강화창 텍스트/내부패널 현황 덤프: 탭 내부 패널 스프라이트 + 텍스트 색.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/EnhanceGroup.ui");
const fmt = (c) => c ? `(${(c.r??0).toFixed(2)},${(c.g??0).toFixed(2)},${(c.b??0).toFixed(2)},${(c.a??1).toFixed(2)})` : "-";
for (const e of b.listEntities()) {
  const p = e.path || "?";
  const t1 = b.getComponent(p, "MOD.Core.TextComponent");
  const t2 = b.getComponent(p, "MOD.Core.TextGUIRendererComponent");
  const sp = b.getComponent(p, "MOD.Core.SpriteGUIRendererComponent");
  if (t1) console.log("TXT(legacy) " + p + " color=" + fmt(t1.FontColor) + " text=" + JSON.stringify((t1.Text||"").slice(0,14)));
  else if (t2) console.log("TXT(gui)    " + p + " color=" + fmt(t2.FontColor) + " text=" + JSON.stringify((t2.Text||"").slice(0,14)));
  else if (sp && /Tab_(StarForce|Potential|Flame)\/(Panel|Layout)$/.test(p))
    console.log("PANEL       " + p + " color=" + fmt(sp.Color) + " ruid=" + (sp.ImageRUID ? (sp.ImageRUID.DataId||"obj") : "-"));
}
