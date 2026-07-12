// 잠재 탭 옛 옵션-롤 위젯 제거 (사용자 확정 "완전 제거") + Popup_PotInfo 제거.
const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const potL = "/ui/EnhanceGroup/EnhanceRoot/Tab_Potential/Layout/";
const targets = ["Btn_OptInfo", "Btn_Prefer", "Chk_X3", "Chk_Keep", "Text_X3", "Text_Keep"].map(n => potL + n);
targets.push("/ui/EnhanceGroup/EnhanceRoot/Popup_PotInfo");
let removed = 0;
for (const p of targets) {
  if (b.find(p)) { b.remove(p); removed++; console.log("removed:", p.split("/").pop()); }
  else { console.log("(absent):", p.split("/").pop()); }
}
b.write(UI, { strict: false });
console.log("DONE removed", removed);
