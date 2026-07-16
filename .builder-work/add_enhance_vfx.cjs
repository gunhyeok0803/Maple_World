// 강화창 아이템 슬롯 위에 성공 버스트 파티클(CircleBurst=38) 노드 추가.
// 런타임엔 Img_ItemSlot:GetChildByName("Vfx")로 접근 → play_on_enable=false, 스크립트에서 Play().
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));

const b = UIBuilder.read("ui/EnhanceGroup.ui");
b.basicParticle("Panel_Summary/Img_ItemSlot/Vfx", {
  particle_type: 38,          // CircleBurst — 원형 광원 폭발(성공)
  color: "#F5D98A",           // 골드
  anchor: "middle-center",
  pos: [0, 0],
  rect_size: [220, 220],
  local_scale: [0.45, 0.45],  // 슬롯 크기로 축소(전체 창 확산 방지)
  particle_speed: 0.4,        // 이동 거리 축소 → 슬롯 주변에 모임
  particle_size: 0.85,
  particle_count: 1.2,
  particle_lifetime: 0.7,
  loop: false,
  play_on_enable: false,
  enable: true,
});
b.write("ui/EnhanceGroup.ui");
console.log("[VFX] Vfx node added under Panel_Summary/Img_ItemSlot");
console.log("id=", b.getId("Panel_Summary/Img_ItemSlot/Vfx"));
