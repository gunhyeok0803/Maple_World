// Generate CollectionBookData.csv — region x part x grade (quantity/repeatable, MVP_v11 §05).
const fs = require("fs");
const parts = [
  ["모자", "파란색 머리띠"], ["상의", "하얀 반팔 면티"], ["하의", "파란 청 반바지"],
  ["장갑", "노가다 목장갑"], ["신발", "가죽 샌들"], ["귀고리", "한쪽 은 귀고리"],
  ["망토", "허름한 망토"], ["눈장식", "금이간 안경"], ["무기", "목검"],
];
// grade → [RegUnit, Atk, Def, Hp]  (하급/중급/상급/최상급). 무기는 Atk 중심, 그 외 Def/HP 중심(플레이스홀더).
const byGrade = { 1: [800, 5, 3, 25], 2: [200, 10, 6, 50], 3: [20, 20, 12, 100], 4: [1, 40, 24, 200] };
const region = "암허스트";
let out = "Region,Part,ItemName,Grade,RegUnit,Atk,Def,Hp\n";
for (const [part, item] of parts) {
  const weapon = (part === "무기");
  for (let g = 1; g <= 4; g++) {
    const [unit, a, d, h] = byGrade[g];
    // 무기: Atk 강조(Def 0), 방어구/장신구: Def/HP 강조(Atk 소량)
    const atk = weapon ? a + Math.floor(a / 2) : Math.max(1, Math.floor(a / 5));
    const def = weapon ? 0 : d;
    const hp = weapon ? Math.floor(h / 2) : h;
    out += `${region},${part},${item},${g},${unit},${atk},${def},${hp}\n`;
  }
}
fs.writeFileSync("RootDesk/MyDesk/Data/CollectionBookData.csv", out, "utf8");
console.log("wrote CollectionBookData.csv rows:", out.trim().split("\n").length - 1);
