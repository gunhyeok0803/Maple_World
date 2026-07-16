// 강화창 리스킨 2차: 패널 통일(좌목록=상세창과 동일 Achievement_Slot) + Color 흰색 굽기.
// 레이아웃·기능·크기 불변, ImageRUID/Type/Color만 패치.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));

const SP = "MOD.Core.SpriteGUIRendererComponent";
const WHITE = { r: 1, g: 1, b: 1, a: 1 };
const skin = (b, pathId, ruid) =>
  b.patchComponent(pathId, SP, { ImageRUID: { DataId: ruid }, Type: 1, Color: WHITE });

const FRAME = "56bfbdd3503340ba978baeac40681ce7"; // Skill_Info_Bg_01 (메인 프레임)
const PANEL_UNI = "c26a3cc43a2347979a54ad4d35292271"; // Achievement_Slot (좌목록+상세창 통일)
const TABBG = "0f4b90db8a87477e9c7a962b045f90eb"; // Pop_St01 (탭 콘텐츠/팝업)

const b = UIBuilder.read("ui/EnhanceGroup.ui");
skin(b, "Window/Img_Bg", FRAME);
skin(b, "Panel_EquipList/Img_Bg", PANEL_UNI);   // 상세창과 동일 패널로 통일
skin(b, "Panel_Summary/Img_Bg", PANEL_UNI);
skin(b, "Tab_StarForce", TABBG);
skin(b, "Tab_Potential", TABBG);
skin(b, "Tab_Flame", TABBG);
skin(b, "Popup_Prob", TABBG);
b.write("ui/EnhanceGroup.ui");
console.log("[RESKIN] v2 — panel unified + white baked");
