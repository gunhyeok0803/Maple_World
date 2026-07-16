// 고아 테스트 파일 ui/TestGroup.ui 삭제 (SimpleFantasy Core Base 모델 미리보기 덤프 — LEA-3028 원인).
const fs = require("fs");
const path = require("path");
const target = path.join("C:", "Users", "rnsgu", "MSW_ProjectAI00", "ui", "TestGroup.ui");
if (fs.existsSync(target)) {
  fs.unlinkSync(target);
  console.log("deleted: " + target);
} else {
  console.log("not found (already gone): " + target);
}
