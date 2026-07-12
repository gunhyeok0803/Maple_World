const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");

function makeRoot(uiPath, group, rootName){
  const b = UIBuilder.read(uiPath);
  if (b.find(group+"/"+rootName)) { console.log(rootName+" already exists"); return; }
  // 투명·전체화면·클릭통과 컨테이너(자식 위치 안 밀리게 (0,0) 1920x1080, identity)
  b.panel(group+"/"+rootName, { anchor:"middle-center", pivot:[0.5,0.5], pos:[0,0], rect_size:[1920,1080] });
  // 자체 스프라이트는 안 보이게 + 클릭 막지 않게
  if (b.hasComponent(group+"/"+rootName,"MOD.Core.SpriteGUIRendererComponent")){
    b.patchComponent(group+"/"+rootName,"MOD.Core.SpriteGUIRendererComponent",{ RaycastTarget:false, Color:{r:1,g:1,b:1,a:0}, OrderInLayer:0 });
  }
  b.write(uiPath,{strict:false});
  console.log("created "+group+"/"+rootName);
}
makeRoot("C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui","EnhanceGroup","EnhanceRoot");
makeRoot("C:/Users/rnsgu/MSW_ProjectAI00/ui/PromoteGroup.ui","PromoteGroup","PromoteRoot");
