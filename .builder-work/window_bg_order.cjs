const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
// Window 배경을 항상 맨 뒤로(에디터/런타임 공통) — OrderInLayer는 sibling 순서를 무시하고 깊이 강제
b.patchComponent("Window/Img_Bg", "MOD.Core.SpriteGUIRendererComponent", { OrderInLayer: -50 });
const c = b.getComponent("Window/Img_Bg", "MOD.Core.SpriteGUIRendererComponent");
console.log("Window/Img_Bg OrderInLayer =", c.OrderInLayer);
b.write(UI, { strict: false });
console.log("done");
