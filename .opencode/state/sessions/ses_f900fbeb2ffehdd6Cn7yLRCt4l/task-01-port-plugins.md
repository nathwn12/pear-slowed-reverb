# task-01-port-plugins
owner: coder
scope: Port slowed-reverb + show-volume-slider plugins from INSPIRATION repo to THIS repo (Q:\PROJECTS\PERSONAL\pear-desktop), preserving review fixes.

inputs (paths only, read yourself):
- source repo: Q:\PROJECTS\PERSONAL\INSPIRATION\pear-desktop, branch feat/show-volume-slider, range 8bd5c312..HEAD (4 commits: 954746d8 slowed-reverb, 8f47ad97 review-feedback, 2527fb29 wheel-fix, 72e4da6b volume-slider)
- source files: src/plugins/slowed-reverb/engine.ts, src/plugins/slowed-reverb/index.ts, src/plugins/slowed-reverb/panel.ts, src/plugins/slowed-reverb/style.css, src/plugins/slowed-reverb/worklet.ts, src/plugins/show-volume-slider/index.ts, src/plugins/show-volume-slider/style.css, src/i18n/resources/en.json (only added keys)
- target repo: Q:\PROJECTS\PERSONAL\pear-desktop, base master@8bd5c312 clean, origin https://github.com/nathwn12/pear-desktop.git
- reference: package.json scripts typecheck/lint

deliverable:
- On new branch feat/show-volume-slider (from master@8bd5c312): exact port of 7 plugin files + merged en.json keys (additive only, no deletions). Optional: port .gitignore `/.opencode/state/` line if missing.

done definition:
- Test-Path src/plugins/slowed-reverb + src/plugins/show-volume-slider true, `git status --short --branch` shows new branch + expected 8 files, `git diff --stat HEAD` matches source stat (8 files, ~1334 insertions), en.json valid JSON, `pnpm typecheck` passes.

rails:
- Confined to: new branch, src/plugins/slowed-reverb/*, src/plugins/show-volume-slider/*, src/i18n/resources/en.json, .gitignore (append-only). No other files. No push, no destructive git ops, no mass edits.

verification (run yourself, report output+exit):
- git branch --show-current; git status --short --branch; git diff --stat HEAD
- pnpm typecheck (or pnpm exec tsc -p tsconfig.json --noEmit)

reviewer notes:
- Check en.json merge is additive, plugin files byte-identical to source HEAD (except any path fixups, which must be justified), no extra files, no secrets.
