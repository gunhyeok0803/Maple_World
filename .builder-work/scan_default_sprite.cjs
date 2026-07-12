const mod = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const { UIBuilder } = mod;
// 빌더 기본 스프라이트 RUID 확인
console.log("DEFAULT_SPRITE_RUID exports:", Object.keys(mod).filter(k=>/DEFAULT|SPRITE/i.test(k)));
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui");
// 알려진 '진짜' RUID 목록(내가 쓴 것들) — 이 외의 것은 의심
const KNOWN = new Set([
  "6e8e561a4582462eaad762cb11d1f835", // PANEL
  "66b6a9dde07b4c3abb90c16c0feeed3f", // LINE
  "092a1d9b68524f83ba3a3e8e0c0f482b", // LOCK
  "aa931a755e5949699233b817029a3e36", // SLOT_BG / none-grade slot
  "c2660e96661c4a6e8dc8eaa17eb0655c", // BLUE tab
  "50426b5b1ee44bc5a1c10355b0e9ad03", // GRAY tab
  "70565cb756634ae7a168975f7a18fb1d","74d4021ef1794501acb73b78d267574e",
  "90c4bb16c95a4ae3916098b6ffb4d0e4","dcbbede8a7a0478b97e2ffa23b7fc14a", // grade slots
]);
for (const e of b.listEntities()) {
  const rel = e.path.replace("/ui/EnhanceGroup/","");
  if (e.enable === false) continue;
  if (!b.hasComponent(rel, "MOD.Core.SpriteGUIRendererComponent")) continue;
  const sp = b.getComponent(rel, "MOD.Core.SpriteGUIRendererComponent");
  const rid = sp.ImageRUID && sp.ImageRUID.DataId;
  // 내가 만든 셀 배경/장식은 KNOWN. Icon류는 런타임 세팅이라 빈 상태일 수 있음
  const leaf = rel.split("/").pop();
  if (rid === undefined || rid === "" || rid === null) {
    console.log("EMPTY RUID: " + rel + " pos=" + (e.pos?e.pos.map(Math.round).join(","):"-") + " size=" + (e.size?e.size.map(Math.round).join("x"):"-"));
  }
}
