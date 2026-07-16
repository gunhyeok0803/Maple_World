// PromoteGroup 리스킨 대상 덤프: 스프라이트(색/RUID) + 텍스트(색).
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/PromoteGroup.ui");
const fmt = (c) => c ? `(${(c.r??0).toFixed(2)},${(c.g??0).toFixed(2)},${(c.b??0).toFixed(2)},${(c.a??1).toFixed(2)})` : "-";
for (const e of b.listEntities()) {
  const p = (e.path || "?").replace("/ui/PromoteGroup/", "");
  if (/RegCellTpl|CollSlot_[2-9]|EquipCell|Btn_Region_[2-5]/.test(p)) continue; // 반복물 생략
  const sp = b.getComponent(e.path, "MOD.Core.SpriteGUIRendererComponent");
  const t1 = b.getComponent(e.path, "MOD.Core.TextComponent");
  const t2 = b.getComponent(e.path, "MOD.Core.TextGUIRendererComponent");
  if (sp) console.log("SPR " + p + "  color=" + fmt(sp.Color) + " ruid=" + (sp.ImageRUID ? (sp.ImageRUID.DataId || "obj") : "-"));
  if (t1) console.log("TXL " + p + "  color=" + fmt(t1.FontColor) + " text=" + JSON.stringify((t1.Text || "").slice(0, 12)));
  if (t2) console.log("TXG " + p + "  color=" + fmt(t2.FontColor) + " text=" + JSON.stringify((t2.Text || "").slice(0, 12)));
}
