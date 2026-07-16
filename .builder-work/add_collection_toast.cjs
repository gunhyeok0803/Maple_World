// Add a lightweight success toast to CollectionGroup.ui (⑦ feedback). Hidden by default; controller shows it.
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const R_DARK = "6e8e561a4582462eaad762cb11d1f835";
const b = UIBuilder.read("ui/CollectionGroup.ui");
b.empty("Toast", { anchor: "stretch", pos: [0, 0], enable: false });
b.sprite("Toast/Bg", { anchor: "middle-center", pos: [0, 250], rect_size: [460, 76], color: { r: 0.08, g: 0.1, b: 0.16, a: 0.95 }, image_ruid: R_DARK });
b.text("Toast/Msg", "", { anchor: "middle-center", pos: [0, 250], rect_size: [440, 60], size: 22, bold: true, color: "#f0d98a", alignment: 4 });
b.write("ui/CollectionGroup.ui");
console.log("Toast added. entities:", b.listEntities().length);
