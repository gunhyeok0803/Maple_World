// 잠재 탭 목업 배치: 현재(Before)/가챠결과(After) 중앙 좌우 + 비용/큐브사용 우측. 박스 내부는 stretch 자동맞춤.
const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "ui/EnhanceGroup.ui";
const T = "MOD.Core.UITransformComponent";
const b = UIBuilder.read(UI);
const P = "/ui/EnhanceGroup/EnhanceRoot/Tab_Potential/Layout";

// 고정앵커(0.5,0.5) 노드: 중앙 기준 OffsetMin(좌하)/Max(우상) + RectSize
function fixed(path, minx, miny, maxx, maxy) {
  b.patchComponent(path, T, {
    AnchorsMin: { x: 0.5, y: 0.5 }, AnchorsMax: { x: 0.5, y: 0.5 },
    OffsetMin: { x: minx, y: miny }, OffsetMax: { x: maxx, y: maxy },
    RectSize: { x: maxx - minx, y: maxy - miny },
  });
}
// stretch 앵커: 부모 대비 insets (aMin/aMax는 모서리, Offset은 여백)
function stretch(path, aminx, aminy, amaxx, amaxy, minx, miny, maxx, maxy) {
  b.patchComponent(path, T, {
    AnchorsMin: { x: aminx, y: aminy }, AnchorsMax: { x: amaxx, y: amaxy },
    OffsetMin: { x: minx, y: miny }, OffsetMax: { x: maxx, y: maxy },
  });
}

// 컨테이너: 중앙+우측 콘텐츠 영역
fixed(P, -380, -290, 650, 335);
// 현재 잠재옵션(좌 박스) / 가챠 결과(우 박스) — 중앙 좌우
fixed(P + "/Layout_Before", -505, -182, -235, 213);
fixed(P + "/Layout_After", -225, -182, 45, 213);
// 비용(보유/필요) 우측 상단 / [큐브 사용] 우측 하단
fixed(P + "/Layout_Cost", 105, 17, 505, 77);
fixed(P + "/Btn_Convert", 165, -272, 505, -192);

// 박스 내부: 등급 라인(상단 스트립) + 옵션(나머지 채움) — 박스 폭에 자동맞춤
for (const box of ["Layout_Before", "Layout_After"]) {
  stretch(P + "/" + box + "/Img_Grade", 0, 1, 1, 1, 8, -52, -8, -8);
  stretch(P + "/" + box + "/Img_Grade/Text_Grade", 0, 0, 1, 1, 0, 0, 0, 0);
  stretch(P + "/" + box + "/Text_Opts", 0, 0, 1, 1, 10, 10, -10, -60);
}
b.write(UI, { strict: false });
console.log("DONE pot layout");
