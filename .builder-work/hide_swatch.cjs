const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/SwatchGroup.ui";
const b = UIBuilder.read(UI);
b.patchComponent("/", "MOD.Core.UIGroupComponent", { DefaultShow: false });
b.write(UI, { strict: false });
console.log("swatch hidden");
