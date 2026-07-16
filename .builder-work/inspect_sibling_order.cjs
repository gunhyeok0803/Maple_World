// z(형제 순서) 조사: 나중 sibling이 위에 그려지고 클릭을 먼저 받음.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/PromoteGroup.ui");
const SP = "MOD.Core.SpriteGUIRendererComponent";
let i = 0;
for (const e of b.listEntities()) {
  const p = e.path || "";
  const depth = (p.match(/\//g) || []).length;
  if (depth === 3 && p.includes("PromoteRoot")) {
    // PromoteRoot 직속
    console.log("[ROOT] " + (i++) + " " + p.split("/").pop());
  }
}
console.log("--- Panel_Coll 직속(선언 순서) ---");
let j = 0;
for (const e of b.listEntities()) {
  const p = e.path || "";
  if (/PromoteRoot\/Panel_Coll\/[^/]+$/.test(p)) {
    const sp = b.getComponent(p, SP);
    console.log(String(j++).padStart(2) + " " + p.split("/").pop() + "  raycast=" + (sp ? String(sp.RaycastTarget ?? "기본true") : "-"));
  }
}
