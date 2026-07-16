// 승급/컬렉션 VFX 부착 지점 경로 확인: Img_To(승급 결과 슬롯), Card_Book(컬렉션 책 카드).
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/PromoteGroup.ui");
for (const e of b.listEntities()) {
  const p = e.path || e.name || "?";
  if (/Img_To|Card_Book|Card_List|Img_From/.test(p)) console.log(p);
}
