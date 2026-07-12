const { UIBuilder } = require("C:/Users/rnsgu/MSW_ProjectAI00/.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const UI = "C:/Users/rnsgu/MSW_ProjectAI00/ui/EnhanceGroup.ui";
const b = UIBuilder.read(UI);
const STAR = "UIR_SimpleFantasy_Sample_StarForce/Panel";

// 1) 창 타이틀을 좌측으로(탭과 충돌 해소)
b.patch("Window/Text_WinTitle", { pos: [-560, -16] });

// 2) 카드 밖으로 흩어지는 별 장식 숨김
for (const p of [STAR + "/Img_Deco/Deco_StarForce_L", STAR + "/Img_Deco/Deco_StarForce_R"]) {
  if (b.find(p)) b.patch(p, { enable: false });
}

// 3) 확률 행 라벨 한글화: Success/Keep/Destroy 행의 텍스트 자식 탐색
const KOR = { Success: "성공", Keep: "유지", Destroy: "파괴" };
for (const row of Object.keys(KOR)) {
  const base = STAR + "/Layout_Prob/" + row;
  let done = false;
  for (const e of b.listEntities()) {
    if (!e.path.startsWith("/ui/EnhanceGroup/" + base + "/")) continue;
    if (e.path.includes("PercentBG")) continue; // 값 표시부는 유지
    const rel = e.path.replace("/ui/EnhanceGroup/", "");
    if (b.hasComponent(rel, "MOD.Core.TextComponent")) {
      const t = b.getComponent(rel, "MOD.Core.TextComponent");
      console.log("row", row, "->", rel, "text=", t.Text);
      b.patchComponent(rel, "MOD.Core.TextComponent", { Text: KOR[row] });
      done = true;
    }
  }
  if (!done) console.log("row", row, ": no label text child found");
}

// 4) 강화 버튼 라벨 한글화
if (b.hasComponent(STAR + "/Btn_Enchant", "MOD.Core.TextComponent")) {
  b.patchComponent(STAR + "/Btn_Enchant", "MOD.Core.TextComponent", { Text: "강화하기" });
  console.log("Btn_Enchant self text patched");
} else {
  for (const e of b.listEntities()) {
    if (!e.path.startsWith("/ui/EnhanceGroup/" + STAR + "/Btn_Enchant/")) continue;
    const rel = e.path.replace("/ui/EnhanceGroup/", "");
    if (b.hasComponent(rel, "MOD.Core.TextComponent")) {
      b.patchComponent(rel, "MOD.Core.TextComponent", { Text: "강화하기" });
      console.log("Btn_Enchant child text patched:", rel);
    }
  }
}

b.write(UI, { strict: false });
console.log("polish a2 done");
