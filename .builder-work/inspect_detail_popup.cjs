// 인벤 상세팝업(DetailPopup) 구조 + 배경/텍스트 색 덤프(가독성 수정 대상 파악).
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/InventoryGroup.ui");
const fmt = (c) => c ? `(${(c.r??0).toFixed(2)},${(c.g??0).toFixed(2)},${(c.b??0).toFixed(2)},${(c.a??1).toFixed(2)})` : "-";
for (const e of b.listEntities()) {
  const p = e.path || "";
  if (!/Detail/i.test(p)) continue;
  const rel = p.replace(/^.*?(Detail.*)$/, "$1");
  const t1 = b.getComponent(p, "MOD.Core.TextComponent");
  const t2 = b.getComponent(p, "MOD.Core.TextGUIRendererComponent");
  const sp = b.getComponent(p, "MOD.Core.SpriteGUIRendererComponent");
  if (t1) console.log("TXL " + rel + "  color=" + fmt(t1.FontColor) + " text=" + JSON.stringify((t1.Text||"").slice(0,16)));
  else if (t2) console.log("TXG " + rel + "  color=" + fmt(t2.FontColor) + " text=" + JSON.stringify((t2.Text||"").slice(0,16)));
  else if (sp) console.log("SPR " + rel + "  color=" + fmt(sp.Color) + " ruid=" + (sp.ImageRUID?(sp.ImageRUID.DataId||"obj"):"-"));
  else console.log("--- " + rel);
}
