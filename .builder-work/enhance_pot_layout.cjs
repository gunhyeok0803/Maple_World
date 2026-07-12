// 잠재 탭 목업 배치 v2 — 컨테이너를 풀캔버스·중앙(center=0,0)으로 만들어 자식 오프셋=캔버스 절대좌표.
// (정상 렌더되는 Panel_Summary와 동일 좌표계). 박스 내부는 stretch로 자동맞춤.
const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "ui/EnhanceGroup.ui";
const T = "MOD.Core.UITransformComponent";
const b = UIBuilder.read(UI);
const P = "/ui/EnhanceGroup/Tab_Potential/Layout";

function fixed(path, minx, miny, maxx, maxy) {
  b.patchComponent(path, T, {
    AnchorsMin: { x: 0.5, y: 0.5 }, AnchorsMax: { x: 0.5, y: 0.5 },
    OffsetMin: { x: minx, y: miny }, OffsetMax: { x: maxx, y: maxy },
    RectSize: { x: maxx - minx, y: maxy - miny },
  });
}
function stretch(path, aminx, aminy, amaxx, amaxy, minx, miny, maxx, maxy) {
  b.patchComponent(path, T, {
    AnchorsMin: { x: aminx, y: aminy }, AnchorsMax: { x: amaxx, y: amaxy },
    OffsetMin: { x: minx, y: miny }, OffsetMax: { x: maxx, y: maxy },
  });
}

// 컨테이너: 풀캔버스·중앙(center=0,0) → 자식 오프셋 = 캔버스 절대좌표
fixed(P, -960, -485, 960, 485);
// 현재 잠재옵션(중앙 좌) / 가챠 결과(중앙 우) — 캔버스 절대좌표
fixed(P + "/Layout_Before", -360, -150, -95, 235);
fixed(P + "/Layout_After", -75, -150, 190, 235);
// 비용(보유/필요) 우측 상단 / [큐브 사용] 우측 하단
fixed(P + "/Layout_Cost", 250, 80, 635, 140);
fixed(P + "/Btn_Convert", 300, -260, 635, -180);
// 박스 내부: 등급 라인(상단 스트립) + 옵션(나머지 채움) — 박스 폭 자동맞춤
for (const box of ["Layout_Before", "Layout_After"]) {
  stretch(P + "/" + box + "/Img_Grade", 0, 1, 1, 1, 10, -50, -10, -8);
  stretch(P + "/" + box + "/Img_Grade/Text_Grade", 0, 0, 1, 1, 0, 0, 0, 0);
  stretch(P + "/" + box + "/Text_Opts", 0, 0, 1, 1, 12, 10, -12, -56);
}
b.write(UI, { strict: false });
console.log("DONE pot layout v2");
