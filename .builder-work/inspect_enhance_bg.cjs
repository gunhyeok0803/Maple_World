// 강화창의 배경/패널 스프라이트 엔티티 + 현재 ImageRUID 확인(리스킨 대상 확정용).
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/EnhanceGroup.ui");
for (const e of b.listEntities()) {
  const p = e.path || e.name || "?";
  // 배경/프레임/패널/탭콘텐츠 후보만
  if (!/Window|Frame|EnhanceRoot|^\/ui\/EnhanceGroup\/[^/]+$/i.test(p)) continue;
  const sp = b.getComponent(p, "MOD.Core.SpriteGUIRendererComponent");
  const ruid = sp && sp.ImageRUID ? (sp.ImageRUID.DataId || sp.ImageRUID) : "-";
  const size = e.size ? (e.size.x + "x" + e.size.y) : "?";
  console.log(p + "  | sprite=" + (sp ? "Y" : "n") + " ruid=" + ruid + " size=" + size);
}
