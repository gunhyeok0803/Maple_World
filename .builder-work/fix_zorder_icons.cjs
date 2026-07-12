// (5) DetailPopup 가림 해결: Controller displayOrder를 샘플 창 위로
// (6) 아이콘 후보 조사: Core_Icon 모델에서 가방/방어구 계열 이름 나열
const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const { ModelBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/model/msw_model_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui";

const u = UIBuilder.read(UI);
const ctrl = u.find("Controller");
const win = u.find("UIR_SimpleFantasy_Sample_Inventory");
console.log("displayOrder: Controller=", ctrl.jsonString.displayOrder, " window=", win.jsonString.displayOrder);
const newOrder = (win.jsonString.displayOrder || 0) + 1;
u.patch("Controller", { display_order: newOrder });
u.write(UI, { strict: false });
console.log("Controller displayOrder ->", newOrder);

// Core_Icon 자식 이름+RUID 훑기
const ICON = "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UIResourceSimpleFantasy/Core/UIR_SimpleFantasy_Core_Icon.model";
const b = ModelBuilder.read(ICON);
function fv(vals, n){ const e=(vals||[]).find(v=>v.name===n); return e?e.value:undefined; }
const kids = b.listChildren();
console.log("Core_Icon children:", kids.length);
for (const c of kids) {
  const vals = c.Model && c.Model.Values;
  const r = fv(vals, "ImageRUID");
  const id = r && r.DataId ? r.DataId : null;
  if (id) console.log(`${c.Name} = ${id}`);
}
