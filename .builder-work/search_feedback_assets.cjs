// 피드백용 SFX(type=effect) + VFX(animationclip) 후보 검색. 결과는 id + 한글명만 출력.
const api = require("../.claude/skills/msw-search/scripts/msw_resource_api.cjs");

const SFX = [
  ["star_success", "강화 성공"],
  ["fail", "강화 실패"],
  ["destroy", "파괴 폭발"],
  ["rankup", "등급 상승 레벨업"],
  ["flame", "불꽃 화염"],
  ["promote", "승급 성공"],
  ["collect", "획득 완료"],
  ["cube", "큐브 잠재"],
];
const VFX = [
  ["star", "스타포스 별"],
  ["burst", "폭발 이펙트"],
  ["shine", "반짝임 빛"],
  ["smoke", "연기"],
  ["magic", "마법진"],
];

function fmt(r) {
  const arr = (r && r.results) || r || [];
  return arr.slice(0, 3).map(x => {
    const ko = (x.names && x.names.ko && x.names.ko[0]) || (x.names && x.names.en && x.names.en[0]) || "?";
    return `    ${x.id}  [${x.type}/${x.category||"?"}]  ${ko}`;
  }).join("\n");
}

(async () => {
  console.log("===== SFX (effect) =====");
  for (const [k, q] of SFX) {
    try {
      const r = await api.searchResources(q, { resourceTypeFilter: ["effect"], topK: 3 });
      console.log(`# ${k} — "${q}"\n${fmt(r)}`);
    } catch (e) { console.log(`# ${k} — ERR ${e.message}`); }
  }
  console.log("\n===== VFX (animationclip, skill) =====");
  for (const [k, q] of VFX) {
    try {
      const r = await api.searchResources(q, { resourceTypeFilter: ["animationclip"], categoryFilter: ["skill"], topK: 3 });
      console.log(`# ${k} — "${q}"\n${fmt(r)}`);
    } catch (e) { console.log(`# ${k} — ERR ${e.message}`); }
  }
})();
