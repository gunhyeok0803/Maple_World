// 새 창 부속: GridView 셀 프리팹(CellTemplate) + 닫기버튼 + 메소 텍스트
const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/InventoryGroup.ui";
const WIN = "UIR_SimpleFantasy_Sample_Inventory";
const SLOT_BG = "aa931a755e5949699233b817029a3e36";

const u = UIBuilder.read(UI);

// 1) GridView 셀 프리팹 — 기존 UIEquipmentSlotWidget 재사용(등급 SlotRUID 로직)
u.sprite(WIN + "/CellTemplate", { anchor: "middle-center", pos: [0, 0], rect_size: [100, 100], image_ruid: SLOT_BG, raycast: true });
u.addComponent(WIN + "/CellTemplate", "MOD.Core.ButtonComponent");
u.addComponent(WIN + "/CellTemplate", "script.UIEquipmentSlotWidget");
u.sprite(WIN + "/CellTemplate/Icon", { anchor: "middle-center", pos: [0, 2], rect_size: [64, 64] });
u.text(WIN + "/CellTemplate/Count", "", { size: 20, color: "#FFFFFF", alignment: 8, anchor: "bottom-right", pos: [-8, 6], rect_size: [54, 22], outline: true, outline_color: "#000000" });

// 2) 닫기 버튼(우상단)
u.button(WIN + "/BtnClose", "X", { anchor: "top-right", pos: [-28, -20], rect_size: [56, 56], font_size: 30, color: "#FFFFFF" });
u.patchComponent(WIN + "/BtnClose", "MOD.Core.SpriteGUIRendererComponent", { Color: { r: 0.13, g: 0.17, b: 0.26, a: 1 } });

// 3) 메소 텍스트(Etc 줄, 정렬버튼 왼쪽)
u.text(WIN + "/Layout_Item/Etc/Text_Meso", "0", { size: 26, color: "#FFE9A8", alignment: 5, anchor: "middle-right", pos: [-140, 0], rect_size: [260, 40] });

u.write(UI, { strict: false });
console.log("cell/close/meso added");
