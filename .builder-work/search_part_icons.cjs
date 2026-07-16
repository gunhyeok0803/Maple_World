// 도감 9부위 베이직 아이콘 검색(지역 무관 범용 심볼). sprite 개별 검색.
const path = require("path");
const { searchResources } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-search", "scripts", "msw_resource_api.cjs"
));
const QUERIES = {
  "모자": "모자 아이콘 심플",
  "상의": "상의 옷 아이콘 심플",
  "하의": "바지 아이콘 심플",
  "장갑": "장갑 아이콘 심플",
  "신발": "신발 아이콘 심플",
  "귀고리": "귀고리 아이콘 심플",
  "망토": "망토 아이콘 심플",
  "눈장식": "안경 아이콘 심플",
  "무기": "검 무기 아이콘 심플",
};
(async () => {
  for (const [part, q] of Object.entries(QUERIES)) {
    try {
      const r = await searchResources(q, { resourceTypeFilter: ["sprite"], categoryFilter: ["item", "etc"], topK: 3 });
      const items = (r.items || r.results || r || []).slice ? (r.items || r.results || r) : [];
      console.log("== " + part + " (" + q + ")");
      for (const it of (items.slice ? items.slice(0, 3) : [])) {
        const nm = (it.names && ((it.names.ko && it.names.ko[0]) || (it.names.en && it.names.en[0]))) || "무명";
        console.log("  " + it.id + "  " + nm + "  [" + it.category + "]");
      }
    } catch (e) {
      console.log("== " + part + " 검색 실패: " + e.message);
    }
  }
})();
