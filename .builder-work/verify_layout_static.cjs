// Static layout verification (no play): CollectionGroup structure + PromoteGroup cleanup state.
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");

console.log("===== CollectionGroup (Window 직속 주요 노드) =====");
{
  const b = UIBuilder.read("ui/CollectionGroup.ui");
  const es = b.listEntities();
  const want = /Window\/(Btn_ToPromote|Btn_ToColl|Btn_Close|Subtitle|Rail_Bg|RegionName|Progress|Slot_[1-9]|BonusBar|Hint)$/;
  for (const e of es) { const p = e.path || ""; if (want.test(p)) console.log(`  ${p.replace('/ui/CollectionGroup/Window/','')}  pos=${JSON.stringify(e.pos)} size=${JSON.stringify(e.size)}`); }
  // slot의 위젯/아이콘 존재 확인(1개 샘플)
  console.log("  Slot_1 children:", es.filter(e => (e.path||"").indexOf("Window/Slot_1/") !== -1).map(e => (e.path||"").split("/").pop()).join(","));
  console.log("  total:", es.length);
}
console.log("\n===== PromoteGroup (승급 탭 유지 + Panel_Coll 정리 확인) =====");
{
  const b = UIBuilder.read("ui/PromoteGroup.ui");
  const es = b.listEntities();
  const collChildren = es.filter(e => (e.path||"").indexOf("/Panel_Coll/") !== -1);
  console.log("  Panel_Coll 잔여 자식 수:", collChildren.length, "→", collChildren.map(e=>(e.path||"").split("/").pop()).slice(0,20).join(","));
  const promo = es.filter(e => (e.path||"").indexOf("/Panel_Promote/") !== -1 || (e.path||"").indexOf("panelPromote") !== -1);
  console.log("  Btn_TabPromote:", !!b.find("/ui/PromoteGroup/PromoteRoot/Btn_TabPromote"), " Btn_TabColl:", !!b.find("/ui/PromoteGroup/PromoteRoot/Btn_TabColl"));
  console.log("  total:", es.length);
}
