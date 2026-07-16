// 승급/컬렉션 창 성공 버스트 파티클(CircleBurst=38) 추가. 강화창과 동일 파라미터.
// 승급: Img_To(결과 슬롯) 밑 Vfx. 컬렉션: Panel_Coll 중앙 Vfx(등록 축하 버스트).
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));

const P = {
  particle_type: 38, color: "#F5D98A",
  anchor: "middle-center", pos: [0, 0], rect_size: [220, 220],
  local_scale: [0.45, 0.45], particle_speed: 0.4, particle_size: 0.85,
  particle_count: 1.2, particle_lifetime: 0.7,
  loop: false, play_on_enable: false, enable: true,
};

const b = UIBuilder.read("ui/PromoteGroup.ui");
b.basicParticle("PromoteRoot/Panel_Promote/Img_To/Vfx", P);
b.basicParticle("PromoteRoot/Panel_Coll/Vfx", P);
b.write("ui/PromoteGroup.ui");
console.log("[VFX] promote Img_To/Vfx =", b.getId("PromoteRoot/Panel_Promote/Img_To/Vfx"));
console.log("[VFX] coll Panel_Coll/Vfx =", b.getId("PromoteRoot/Panel_Coll/Vfx"));
