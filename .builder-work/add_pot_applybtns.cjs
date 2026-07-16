// 잠재 탭: Current(Layout_Before)와 Result(Layout_After) 사이 여백에 [적용]/[취소] 버튼 2개 추가.
// 팩 CTA 스킨(Btn_Convert와 동일 RUID c2660e...) 사용, 임의 색 금지 규칙 준수.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const b = UIBuilder.read("ui/EnhanceGroup.ui");
const CTA_RUID = "c2660e96661c4a6e8dc8eaa17eb0655c";  // 큐브 사용 버튼과 동일 팩 스킨
const base = "EnhanceRoot/Tab_Potential/Layout";

// Before/After와 동일 좌표계(top anchor {0.5,1}, pivot 0.5,0.5)로 두 박스 사이 여백(y≈-287)에 배치.
// 적용: Result를 아이템에 확정(Current로 이동). 연두 CTA.
b.button(base + "/Btn_ApplyPot", "적용", {
  anchor: "top-center", pivot: [0.5, 0.5], pos: [-172, -280], rect_size: [330, 36],
  font_size: 22, color: "#2B2B2B",
  image_ruid: CTA_RUID, sprite_type: 0,
  bg_color: { r: 0.68, g: 0.92, b: 0.18, a: 1 },
});
// 취소: 대기결과 폐기(현재 유지). 팩 기본(중립) 스킨.
b.button(base + "/Btn_KeepPot", "취소", {
  anchor: "top-center", pivot: [0.5, 0.5], pos: [172, -280], rect_size: [330, 36],
  font_size: 22, color: "#2B2B2B",
  image_ruid: CTA_RUID, sprite_type: 0,
  bg_color: { r: 1, g: 1, b: 1, a: 1 },
});

b.write("ui/EnhanceGroup.ui");
console.log("적용/취소 버튼 추가 완료");
for (const nm of ["Btn_ApplyPot", "Btn_KeepPot"]) {
  const e = b.find(base + "/" + nm);
  console.log(nm + " -> " + (e ? e.id : "MISSING"));
}
