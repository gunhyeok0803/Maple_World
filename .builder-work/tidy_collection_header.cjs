// CollectionGroup 헤더 정돈: 상단 [승급][컬렉션] 탭바가 생겼으므로 중복 "컬렉션" 제목 제거, 부제 위치 정돈.
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("ui/CollectionGroup.ui");
// 중복 제목 제거
if (b.find("/ui/CollectionGroup/Window/Title")) b.remove("Window/Title");
// 부제: 탭바 오른쪽으로 이동(탭과 겹치지 않게)
if (b.find("/ui/CollectionGroup/Window/Subtitle")) b.patch("Window/Subtitle", { pos: [40, 322] });
// 탭바 활성/비활성 색은 컨트롤러가 갱신하지만, 기본은 컬렉션 활성으로 둠(이미 build에서 설정)
b.write("ui/CollectionGroup.ui", { strict: false });
const es = b.listEntities();
// 상단 영역 위치 점검(겹침 확인)
for (const e of es) {
  const p = e.path || "";
  if (/Window\/(Btn_ToPromote|Btn_ToColl|Subtitle|Btn_Close)$/.test(p)) {
    console.log(`${p.split("/").pop()}  pos=${JSON.stringify(e.pos)} size=${JSON.stringify(e.size)}`);
  }
}
console.log("header tidied. entities:", es.length);
