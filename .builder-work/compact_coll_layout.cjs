// 컬렉션 탭 컴팩트 재배치 + 슬롯 클릭 차단 해소.
// ① 도감 블록을 좌측으로 모아 우측 리스트와 간격 확보(겹침 해소), 세로 여백 축소.
// ② CollSlot 자식(Icon/QBadge/Count) RaycastTarget=false → 슬롯 클릭이 항상 버튼에 닿게.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const SP = "MOD.Core.SpriteGUIRendererComponent";
const R = "PromoteRoot/Panel_Coll/";
const b = UIBuilder.read("ui/PromoteGroup.ui");

// ── 도감 3×3: 좌측으로 80 이동 + 행간 120으로 압축 ──
const cols = [-380, -260, -140];
const rows = [160, 40, -80];
for (let i = 1; i <= 9; i++) {
  const c = (i - 1) % 3, r = Math.floor((i - 1) / 3);
  b.patch(R + "CollSlot_" + i, { pos: [cols[c], rows[r]] });
}
// 헤더/보상 재배치
b.patch(R + "Coll_RegionName", { pos: [-330, 235] });
b.patch(R + "Coll_Progress", { pos: [-140, 235] });
b.patch(R + "Coll_Reward", { pos: [-260, -170] });

// ── 우측 리스트: 도감과 간격 105px 확보, 세로 확장 ──
b.patch(R + "RegHdr", { pos: [285, 235] });
b.patch(R + "RegSub", { pos: [285, 207] });
b.patch(R + "RegPrompt", { pos: [285, 40] });
b.patch(R + "RegEmpty", { pos: [285, 40] });
b.patch(R + "RegGrid", { pos: [285, -65], rect_size: [540, 520] });

// ── 클릭 차단 해소: 슬롯 자식 raycast off ──
for (let i = 1; i <= 9; i++) {
  for (const ch of ["Icon", "QBadge", "Count"]) {
    const p = R + "CollSlot_" + i + "/" + ch;
    if (b.find(p)) b.patchComponent(p, SP, { RaycastTarget: false });
  }
}
// 후보행 아이콘 계열도 클릭 불필요(등록은 BtnReg만)
for (const p of ["RegCellTpl/IconCell", "RegCellTpl/IconCell/Icon", "RegCellTpl/IconCell/QBadge", "RegCellTpl/IconCell/Count"]) {
  if (b.find(R + p)) b.patchComponent(R + p, SP, { RaycastTarget: false });
}

b.write("ui/PromoteGroup.ui");
console.log("[COMPACT] collection layout compacted + raycast fixed");
