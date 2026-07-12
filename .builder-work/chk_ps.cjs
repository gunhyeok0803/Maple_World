const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("C:/Users/rnsgu/MSW_ProjectAI00/ui/SideMenuGroup.ui");
for (const x of b.listEntities()){
  const p=x.path||x;
  if (p.endsWith("/Panel_Side")){
    const e=b.find(p); const js=typeof e.jsonString==="string"?JSON.parse(e.jsonString):e.jsonString;
    console.log("Panel_Side enable =", js.enable);
  }
}
