const { ModelBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-general/scripts/model/msw_model_builder.cjs");
const ICON = "C:/Users/rnsgu/MSW_ProjectAI00/RootDesk/MyDesk/UIResourceSimpleFantasy/Core/UIR_SimpleFantasy_Core_Icon.model";
const b = ModelBuilder.read(ICON);
const kids = b.listChildren();
// 이름 전체 나열(계층 무시, 컴팩트)
const names = kids.map(c => c.Name);
console.log(names.join(", "));
