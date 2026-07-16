// 인벤 상세팝업 밝은 배경 텍스트 대비 조정.
// 런타임 색 세팅 없는 정적 텍스트만 색 변경 + PotGrade(런타임 등급색)는 외곽선으로 대비.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const TL = "MOD.Core.TextComponent";
const TG = "MOD.Core.TextGUIRendererComponent";
const D = "UI_Inventory/DetailPopup/";  // 실제 루트 경로는 find로 확인
const b = UIBuilder.read("ui/InventoryGroup.ui");

// 실제 경로 탐색(그룹 루트가 UI_Inventory 하위인지 직속인지 대응)
function P(leaf) {
  for (const cand of ["UI_Inventory/DetailPopup/" + leaf, "DetailPopup/" + leaf]) {
    if (b.getId(cand)) return cand;
  }
  return null;
}
function setTL(leaf, color) { const p = P(leaf); if (p) b.patchComponent(p, TL, { FontColor: color }); else console.log("skip TL " + leaf); }
function setTG(leaf, fields) { const p = P(leaf); if (p) b.patchComponent(p, TG, fields); else console.log("skip TG " + leaf); }

const TITLE = { r: 0.16, g: 0.18, b: 0.22, a: 1 };  // 이름 진회색
const TEAL  = { r: 0.11, g: 0.45, b: 0.41, a: 1 };  // 추가옵션 진청록
const MUTED = { r: 0.33, g: 0.37, b: 0.43, a: 1 };  // 교환여부 중간회색
const GOLD  = { r: 0.62, g: 0.44, b: 0.09, a: 1 };  // 별 진골드
const DARK  = { r: 0.10, g: 0.11, b: 0.14, a: 0.85 };

setTL("Name", TITLE);
setTL("Expiry", MUTED);
setTL("Stars", GOLD);
setTG("OptLines", { FontColor: TEAL });
// PotGrade: 등급색 유지 + 어두운 외곽선으로 밝은 배경 대비 확보
setTG("PotGrade", { OutlineColor: DARK, OutlineWidth: 0.18 });

b.write("ui/InventoryGroup.ui");
console.log("[FIX] detail popup contrast adjusted");
