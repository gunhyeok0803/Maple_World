// (a) CollectionGroup: 상단 [승급][컬렉션] 전환 바 추가(양방향 전환). (b) PromoteGroup: 매트릭스/잔재 라벨 제거.
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const R_X = "07096261a9944312b01dee501fed7599";
const GOLD = "#f0d98a";

// ===== (a) CollectionGroup top tab bar =====
{
  const b = UIBuilder.read("ui/CollectionGroup.ui");
  // 상단 전환 바(윈도우 최상단). 두 버튼 항상 표시.
  b.button("Window/Btn_ToPromote", "승급", { anchor: "middle-center", pos: [-560, 322], rect_size: [150, 52], font_size: 20, bold: true, color: "#c7d0e2", bg_color: { r: 0.11, g: 0.13, b: 0.2, a: 1 } });
  b.button("Window/Btn_ToColl", "컬렉션", { anchor: "middle-center", pos: [-402, 322], rect_size: [150, 52], font_size: 20, bold: true, color: GOLD, bg_color: { r: 0.24, g: 0.2, b: 0.09, a: 1 } });
  // 기존 타이틀은 부제로 축소(겹침 방지) — 제목 위치 조정
  if (b.find("/ui/CollectionGroup/Window/Title")) b.patch("Window/Title", { pos: [-250, 322] });
  b.write("ui/CollectionGroup.ui", { strict: false });
  console.log("CollectionGroup top tab bar added.");
}

// ===== (b) PromoteGroup Panel_Coll cleanup: remove matrix + leftover level/grade labels =====
{
  const b = UIBuilder.read("ui/PromoteGroup.ui");
  const rel = (abs) => abs.replace(/^\/ui\/PromoteGroup\//, "");
  const toRemove = [];
  for (const e of b.listEntities()) {
    const p = e.path || "";
    if (p.indexOf("/Panel_Coll/") === -1) continue;
    const name = p.split("/").pop() || "";
    // remove my matrix (Cell_/ColHdr_/RowHdr_/CollHint) — will re-route 컬렉션 to CollectionGroup
    if (/^(Cell_|ColHdr_|RowHdr_|CollHint)/.test(name)) { toRemove.push(p); continue; }
    // remove leftover old level/grade LABELS (text) — LV.10/20/30, 하급 등. Protect controls.
    if (e.kind === "TEXT" && /(Lv|LV|Level|레벨|하급|중급|상급|최상급|등급)/.test(name) && !/(Card|Btn|Info|Times|Action|Hint)/i.test(name)) {
      toRemove.push(p);
    }
  }
  // sort deepest-first so children removed before parents
  toRemove.sort((a, b2) => b2.split("/").length - a.split("/").length);
  console.log("Panel_Coll remove count:", toRemove.length);
  for (const p of toRemove) { if (b.find(p)) b.remove(rel(p)); }
  b.write("ui/PromoteGroup.ui", { strict: false });
  console.log("PromoteGroup Panel_Coll cleaned.");
}
