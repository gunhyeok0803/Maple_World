// 컬렉션 탭 패널 구성(승급 탭과 동일 구도).
// 좌 Card_Book(지역버튼+도감+보상 배경, Achievement_Slot) + 우 Card_Info(리스트 배경, 재배치).
// z는 런타임 EnsureWiredTab이 SetSiblingIndex(Card_Book→0, Card_Info→1)로 맨 뒤 처리.
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const SP = "MOD.Core.SpriteGUIRendererComponent";
const PANEL_UNI = "c26a3cc43a2347979a54ad4d35292271"; // Achievement_Slot(승급 Card_List와 동일)
const WHITE = { r: 1, g: 1, b: 1, a: 1 };
const R = "PromoteRoot/Panel_Coll/";
const b = UIBuilder.read("ui/PromoteGroup.ui");

// 좌 패널: 지역 버튼(-638..-482) + 도감(-445..-85) + 헤더/보상 커버
b.sprite(R + "Card_Book", {
  anchor: "middle-center", pos: [-360, -10], rect_size: [580, 660],
  image_ruid: PANEL_UNI, sprite_type: 1, color: WHITE, raycast: false,
});
// 우 패널: 등록 리스트 배경(헤더+리스트 커버). 원래 미사용이라 enable=false였음 → 켬.
b.patch(R + "Card_Info", { pos: [290, -10], rect_size: [610, 660], enable: true });
b.patchComponent(R + "Card_Info", SP, { ImageRUID: { DataId: PANEL_UNI }, Type: 1, Color: WHITE, RaycastTarget: false });

b.write("ui/PromoteGroup.ui");
console.log("[PANEL] Card_Book added, Card_Info repositioned");
