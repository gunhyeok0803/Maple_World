const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/SideMenuGroup.ui";
const b = UIBuilder.read(UI);
const LINE = "66b6a9dde07b4c3abb90c16c0feeed3f";
const MC = { anchor: "middle-center", pivot: [0.5, 0.5] };
// 원본 RUID 확인(사용자 배치 존중)
const src = b.getComponent("UISprite", "MOD.Core.SpriteGUIRendererComponent");
const ruid = (src && src.ImageRUID && src.ImageRUID.DataId) || LINE;
console.log("divider ruid:", ruid);
// 패널 밖 구분선 3개 제거 → 패널 내부로 재생성(y 400/230/-70 → 패널 상대 369/199/-101)
for (const nm of ["UISprite", "UISprite_1", "UISprite_2"]) {
  if (b.find(nm)) b.remove(nm);
}
const YS = [369, 199, -101];
for (let i = 0; i < 3; i++) {
  b.sprite("Panel_Side/Divider_" + (i + 1), Object.assign({ pos: [0, YS[i]], rect_size: [500, 10], image_ruid: ruid }, MC));
}
b.write(UI, { strict: false });
console.log("sidemenu dividers fixed");
