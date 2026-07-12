const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);

const BASE = {
  Window: 0,
  Btn_TabStar: 900, Btn_TabPot: 900, Btn_TabFlame: 900,
  Panel_EquipList: 100, Panel_Summary: 200,
  Tab_StarForce: 300, Tab_Potential: 400, Tab_Flame: 500,
  Popup_PotInfo: 1000,
  Controller: 0,
};
const BG_RE = /(^|_)Img_?Bg$|_BG$|^Dimmer$|^Panel$|^PercentBG$/i;

const ents = b.listEntities();
let patched = 0;
for (const e of ents) {
  const p = e.path || e;
  const rel = p.replace("/ui/EnhanceGroup", "");
  const seg = rel.split("/").filter(Boolean);
  if (seg.length === 0) continue;              // group root
  const base = BASE[seg[0]];
  if (base === undefined) continue;
  const localDepth = seg.length - 1;           // section root = 0
  const name = seg[seg.length - 1];
  const isBg = BG_RE.test(name);
  const orderSprite = base + localDepth * 10 + (isBg ? 0 : 3);
  const orderText = base + localDepth * 10 + 6;
  // Sprite
  if (b.hasComponent(p, "MOD.Core.SpriteGUIRendererComponent")) {
    b.patchComponent(p, "MOD.Core.SpriteGUIRendererComponent", { OrderInLayer: orderSprite }); patched++;
  }
  // Text (both renderer kinds)
  if (b.hasComponent(p, "MOD.Core.TextComponent")) {
    b.patchComponent(p, "MOD.Core.TextComponent", { OrderInLayer: orderText }); patched++;
  }
  if (b.hasComponent(p, "MOD.Core.TextGUIRendererComponent")) {
    b.patchComponent(p, "MOD.Core.TextGUIRendererComponent", { OrderInLayer: orderText }); patched++;
  }
}
console.log("OrderInLayer patched on", patched, "renderers");
b.write(UI, { strict: false });
console.log("zorder enhance done");
