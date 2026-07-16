// Re-lint CollectionGroup.ui verbosely to inspect the 19 warnings (non-blocking).
const { UIBuilder } = require("../.claude/skills/msw-ui-system/scripts/msw_ui_builder.cjs");
const b = UIBuilder.read("ui/CollectionGroup.ui");
b.write("ui/CollectionGroup.ui", { lint_verbose: true });
