const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui";
const b = UIBuilder.read(UI);
// 액션 버튼: Simple 스트레치(밝게 번짐) → Sliced로 탭과 톤 통일
for (const p of ["Panel_Promote/Btn_Action", "Panel_Coll/Btn_Action"]) {
  b.patchComponent(p, "MOD.Core.SpriteGUIRendererComponent", { Type: 1 });
}
b.write(UI, { strict: false });
console.log("action buttons sliced");
