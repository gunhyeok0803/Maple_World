// 스타포스 탭 Layout_Cost 전체 스펙 덤프(기준값 추출) + 잠재/환생 구조 대조.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/EnhanceGroup.ui");
const T = "MOD.Core.UITransformComponent";
const SP = "MOD.Core.SpriteGUIRendererComponent";
function dump(base) {
  console.log("==== " + base);
  const kids = [];
  for (const e of b.listEntities()) {
    const p = e.path || "";
    if (p === "/ui/EnhanceGroup/" + base || p.startsWith("/ui/EnhanceGroup/" + base + "/")) {
      kids.push(p.replace("/ui/EnhanceGroup/", ""));
    }
  }
  for (const rel of kids) {
    const p = rel;
    const t = b.getComponent(p, T);
    const sp = b.getComponent(p, SP);
    const ap = t && t.anchoredPosition || {}; const rs = t && t.RectSize || {};
    const ruid = sp && sp.ImageRUID ? (sp.ImageRUID.DataId || "obj") : "-";
    const col = sp && sp.Color ? `(${(sp.Color.r??1).toFixed(2)},${(sp.Color.g??1).toFixed(2)},${(sp.Color.b??1).toFixed(2)},${(sp.Color.a??1).toFixed(2)})` : "-";
    console.log("  " + rel.replace(base, "") + "  pos=(" + (ap.x??"?") + "," + (ap.y??"?") + ") size=(" + (rs.x??"?") + "x" + (rs.y??"?") + ") sp=" + (sp?"Y":"n") + " ruid=" + ruid + " col=" + col);
  }
}
dump("Tab_StarForce/Panel/Layout_Cost");
dump("Tab_Potential/Layout/Layout_Cost");
dump("Tab_Flame/Layout/Layout_Cost");
