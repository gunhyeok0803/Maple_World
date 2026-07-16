// 스타포스 탭 다크 잔재 스프라이트 색/RUID 확인.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/EnhanceGroup.ui");
const fmt = (c) => c ? `(${(c.r??0).toFixed(2)},${(c.g??0).toFixed(2)},${(c.b??0).toFixed(2)},${(c.a??1).toFixed(2)})` : "-";
for (const e of b.listEntities()) {
  const p = e.path || "?";
  if (!p.includes("Tab_StarForce")) continue;
  const sp = b.getComponent(p, "MOD.Core.SpriteGUIRendererComponent");
  if (sp) console.log(p.replace("/ui/EnhanceGroup/Tab_StarForce/", "") + "  color=" + fmt(sp.Color) + " ruid=" + (sp.ImageRUID ? (sp.ImageRUID.DataId || "obj") : "-"));
}
