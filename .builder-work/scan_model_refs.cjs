// 이관 준비: 모든 .ui가 참조하는 모델 Entry ID 수집 → MyDesk 모델 파일과 대조 → 생사 판정.
const fs = require("fs");
const path = require("path");
const { UIBuilder } = require(path.join(
  "C:", "Users", "rnsgu", "MSW_ProjectAI00",
  ".claude", "skills", "msw-ui-system", "scripts", "msw_ui_builder.cjs"
));
const root = path.join("C:", "Users", "rnsgu", "MSW_ProjectAI00");

// 1) 모든 .ui의 origin entry id 수집
const uiDir = path.join(root, "ui");
const refs = {};   // entryId -> [ "GroupName:count" ]
for (const f of fs.readdirSync(uiDir).filter(x => x.endsWith(".ui"))) {
  const b = UIBuilder.read(path.join(uiDir, f));
  const counts = {};
  for (const e of b.listEntities()) {
    const raw = b.find(e.path);
    const o = raw && raw.jsonString && raw.jsonString.origin;
    const id = o && (o.entry_id || o.model_id);
    if (id && id !== "UIGroup") counts[id] = (counts[id] || 0) + 1;
  }
  for (const [id, c] of Object.entries(counts)) {
    (refs[id] = refs[id] || []).push(f.replace(".ui", "") + " x" + c);
  }
}

// 2) MyDesk 모델 파일의 EntryKey 수집 (재귀)
function* walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) yield* walk(p);
    else if (name.endsWith(".model")) yield p;
  }
}
const models = [];
for (const p of walk(path.join(root, "RootDesk", "MyDesk"))) {
  try {
    const j = JSON.parse(fs.readFileSync(p, "utf8"));
    let entry = j.EntryKey || "";
    entry = String(entry).replace(/^model:\/\//, "");
    if (!entry) {
      const cp = j.ContentProto && j.ContentProto.Json;
      entry = (cp && cp.Id) || "?";
    }
    // ContentProto.Json이 문자열인 경우 파싱
    if (entry === "?" && j.ContentProto && typeof j.ContentProto.Json === "string") {
      try { entry = JSON.parse(j.ContentProto.Json).Id || "?"; } catch (e2) {}
    }
    models.push({ file: path.relative(root, p), id: entry });
  } catch (e) { models.push({ file: path.relative(root, p), id: "(parse err)" }); }
}

// 3) 대조 출력
console.log("=== MyDesk 모델 → .ui 참조 여부 ===");
for (const m of models) {
  const short = String(m.id).slice(0, 8);
  const used = Object.keys(refs).find(k => String(k).startsWith(short) || String(m.id) === k);
  const usage = used ? refs[used].join(", ") : "";
  const flag = used ? "LIVE " : "dead ";
  // SimpleFantasy 팩은 요약(길어서)
  if (m.file.includes("UIResourceSimpleFantasy")) {
    if (used) console.log(flag + m.file + "  [" + short + "]  <- " + usage);
  } else {
    console.log(flag + m.file + "  [" + short + "]" + (used ? "  <- " + usage : ""));
  }
}
const sfTotal = models.filter(m => m.file.includes("UIResourceSimpleFantasy")).length;
const sfUsed = models.filter(m => m.file.includes("UIResourceSimpleFantasy") && Object.keys(refs).some(k => String(k).startsWith(String(m.id).slice(0,8)))).length;
console.log("\nSimpleFantasy 팩: 총 " + sfTotal + "개 중 .ui 직접참조 " + sfUsed + "개 (미참조는 출력 생략)");

// 4) .ui가 참조하는데 MyDesk에 없는 모델(외부/누락)
console.log("\n=== .ui 참조 중 MyDesk에 파일이 없는 Entry ID ===");
const myIds = new Set(models.map(m => String(m.id)));
for (const [id, u] of Object.entries(refs)) {
  const found = models.some(m => String(m.id) === String(id));
  if (!found) console.log("  " + id + "  <- " + u.join(", "));
}
