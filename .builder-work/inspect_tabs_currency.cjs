// 읽기 전용 진단: 강화창/승급창 .ui 탭·버튼·재화 엔티티 현재 좌표 덤프.
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");

const files = ["ui/EnhanceGroup.ui", "ui/PromoteGroup.ui"];
const rx = /(tab|btn|coin|meso|cube|flame|재화|currency|gauge|승급|컬렉션|스타|잠재|환생)/i;

function nameOf(e) { return e && (e.name || e.Name || (e.path && String(e.path).split("/").pop())); }
function posOf(e) {
  return e && (e.pos || e.anchoredPosition || e.position ||
    (e.transform && (e.transform.pos || e.transform.anchoredPosition)) || null);
}

for (const f of files) {
  console.log("\n===== " + f + " =====");
  let b;
  try { b = UIBuilder.read(f); } catch (e) { console.log("read err:", e.message); continue; }
  const ents = b.listEntities();
  if (ents.length) console.log("SAMPLE KEYS:", Object.keys(ents[0]).join(","));
  if (ents.length) console.log("SAMPLE JSON:", JSON.stringify(ents[0]).slice(0, 400));
  for (const e of ents) {
    const nm = nameOf(e);
    if (!nm || !rx.test(nm)) continue;
    console.log(String(nm).padEnd(26), "pos=", JSON.stringify(posOf(e)), "enable=", e.enable);
  }
}
