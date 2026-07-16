// 후보 RUID들의 실제 이름 조회(id → ko/en name, type, category).
const api = require("../.claude/skills/msw-search/scripts/msw_resource_api.cjs");
const ids = [
  // SFX 후보(각 이벤트 top들)
  "33bfb1eaec244644a2749e0c11ed9513","c7ca19d16086461cbe4714da72bd873c",
  "e5389ea837dc46f49a97a69d21abbb79","5c0392201c0741e3b75994831dae0ada",
  "79891b9d5f1f4a2e8245df5e211cb248","5a2a22850e4e4c4f80c924a82aafbd0e",
  "bea2f964baed492eb25d24317c30844b","dbb38b4f04044499906bd7a2ca9c4d7c",
  "b602decaf6b244a0a70e92ac2fdcd245","f5fb4f53733a4327a6c4ba1445a6fced",
  "f399837e702843abb2c8196829101982","df5affb8b0274d209a1bd666dd49c0e1",
  "9ffd3369efdb4cc0b8e950cdfc53cf64","43d3d3db39da4c6a8dac13f5dfdd2928",
  // VFX 후보
  "aa3784d325b046c0866a395ca4cb6437","c918ebbbbff4498b98c5b45d1bd2fe1c",
  "137539a9348b43fa859b85166e24208a","b72671a57530470983d927a7b6c4bab3",
  "826cd0bdeb6b4b438c4b34e49ee2b147",
];
(async () => {
  for (const id of ids) {
    try {
      const r = await api.getResource(id);
      const p = (r && r.payload) || r || {};
      const nm = r && (r.names || (r.payload && r.payload.names));
      const ko = nm && nm.ko && nm.ko[0];
      const en = nm && nm.en && nm.en[0];
      console.log(`${id}  [${r.type}/${r.category||"?"}]  ko=${ko||"-"} | en=${en||"-"}`);
    } catch (e) { console.log(`${id}  ERR ${e.message}`); }
  }
})();
