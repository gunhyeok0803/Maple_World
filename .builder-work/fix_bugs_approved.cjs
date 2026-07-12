const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);

// ── 버그1: X 버튼/타이틀을 탭 위로(OrderInLayer 950) + 탭 래퍼 RaycastTarget off ──
function setOrder(rel, n){
  if (b.hasComponent(rel,"MOD.Core.SpriteGUIRendererComponent")) b.patchComponent(rel,"MOD.Core.SpriteGUIRendererComponent",{OrderInLayer:n});
  if (b.hasComponent(rel,"MOD.Core.TextComponent")) b.patchComponent(rel,"MOD.Core.TextComponent",{OrderInLayer:n});
  if (b.hasComponent(rel,"MOD.Core.TextGUIRendererComponent")) b.patchComponent(rel,"MOD.Core.TextGUIRendererComponent",{OrderInLayer:n});
}
setOrder("Window/Btn_CloseMain", 950);
setOrder("Window/Text_WinTitle", 950);
for (const t of ["Tab_StarForce","Tab_Potential","Tab_Flame"]) {
  if (b.hasComponent(t,"MOD.Core.SpriteGUIRendererComponent")) b.patchComponent(t,"MOD.Core.SpriteGUIRendererComponent",{RaycastTarget:false});
}

// ── 버그2: 탭 루트 3종 pos (0,0) 통일 + 콘텐츠 루트 (295,-30) 통일 ──
for (const t of ["Tab_StarForce","Tab_Potential","Tab_Flame"]) b.patch(t, { pos:[0,0] });
b.patch("Tab_StarForce/Panel", { pos:[295,-30] });
b.patch("Tab_Potential/Layout", { pos:[295,-30] });
b.patch("Tab_Flame/Layout", { pos:[295,-30] });

// ── 버그3: Window 중앙 복귀 ──
b.patch("Window", { pos:[0,0] });

b.write(UI,{strict:false});
console.log("approved bug fixes applied");
