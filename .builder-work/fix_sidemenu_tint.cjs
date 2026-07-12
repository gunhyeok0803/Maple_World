const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/SideMenuGroup.ui";
const b = UIBuilder.read(UI);

// 팩 Panel_04와 동일한 다크 네이비 틴트(흰 스프라이트 + Color 방식)
b.patchComponent("Panel_Side/Img_Bg", "MOD.Core.SpriteGUIRendererComponent", {
  Color: { r: 0.09019608, g: 0.121568628, b: 0.1764706, a: 0.9 },
});

// 라벨 잘림 보정(폭 100, 폰트 12)
b.patch("Panel_Side/Tile_Enhance/Label", { rect_size: [100, 30] });
b.patchComponent("Panel_Side/Tile_Enhance/Label", "MOD.Core.TextComponent", { FontSize: 12 });
b.patch("Panel_Side/Tile_Upgrade/Label", { rect_size: [100, 30] });
b.patchComponent("Panel_Side/Tile_Upgrade/Label", "MOD.Core.TextComponent", { FontSize: 12 });

b.write(UI);
console.log("tint + label fixed");
