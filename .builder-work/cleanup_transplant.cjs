// 깨진 이식 트리(.ui) + 맵 사본(map01) 제거 — UI 캔버스 재드롭 전 클린 슬레이트
const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const { MapBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/map/msw_map_builder.cjs");

const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui";
const MAP = "C:/Users/rnsgu/MSW_ProjectAI00/map/map01.map";

const u = UIBuilder.read(UI);
if (u.find("UIR_SimpleFantasy_Sample_Inventory")) {
  u.remove("UIR_SimpleFantasy_Sample_Inventory");
  u.write(UI, { strict: false }); // 기존 파일에 원래 있던 L013 10건 때문에 strict 해제
  console.log("UI: transplanted tree removed. entities now =", u.listEntities().length);
} else {
  console.log("UI: no transplanted tree found");
}

const m = MapBuilder.read(MAP);
if (m.find("UIR_SimpleFantasy_Sample_Inventory")) {
  m.remove("UIR_SimpleFantasy_Sample_Inventory");
  m.write(MAP);
  console.log("MAP: sample copy removed. entities now =", m.listEntities().length);
} else {
  console.log("MAP: no sample copy found");
}
