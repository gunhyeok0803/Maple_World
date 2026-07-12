// 항목3: 스타포스 탭 "파괴 보호권 사용" 관련 정적 노드 제거(레이아웃 유지, .mlua 미참조).
const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const P = "/ui/EnhanceGroup/Tab_StarForce/Panel/";
let n = 0;
for (const name of ["Chk_Protect", "Text_Protect", "Text_NoDown"]) {
  const p = P + name;
  if (b.find(p)) { b.remove(p); n++; console.log("removed:", name); }
  else console.log("(absent):", name);
}
b.write(UI, { strict: false });
console.log("DONE star protect removal, removed", n);
