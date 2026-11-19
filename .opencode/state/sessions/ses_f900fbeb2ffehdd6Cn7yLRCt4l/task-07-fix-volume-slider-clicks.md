# task-07-fix-volume-slider-clicks
owner: coder
scope: Fix show-volume-slider swallowing all clicks when enabled; mirror fix to both copies; commit in INSPIRATION (NO push — ATHENA pushes after review gate).
symptom: enabling Show Volume Slider makes nothing clickable.
prime suspect (verify, don't assume): src/plugins/show-volume-slider/style.css forces `pointer-events:auto !important` (+opacity/visibility) unconditionally on #volume-slider/#expand-volume-slider, defeating the app's own hit-testing — if #expand-volume-slider is a large overlay container, it eats every click. Read src/plugins/show-volume-slider/index.ts (adds on-hover via MutationObserver), grep renderer/ytmusic-player-bar DOM+CSS for #volume-slider/#expand-volume-slider semantics, then choose minimal fix (likely: drop or scope the pointer-events override so app click-through applies; keep always-visible feature).
inputs (paths):
- fix here: Q:\PROJECTS\PERSONAL\pear-desktop\src\plugins\show-volume-slider\style.css (+index.ts only if needed)
- mirror: Q:\PROJECTS\PERSONAL\INSPIRATION\pear-desktop\src\plugins\show-volume-slider\ (same files, byte-identical)
- INSPIRATION branch feat/show-volume-slider (has dirty .gitignore — DO NOT touch it; commit scoped to src/plugins/show-volume-slider/* only, new fix commit on top, precedent 8f47ad97/2527fb29)
deliverable: minimal fix in PERSONAL + identical mirror in INSPIRATION + ONE scoped commit in INSPIRATION (message fix(plugins): ...), no push.
done: direct tsc exit 0 (./node_modules/.bin/tsc -p tsconfig.json --noEmit; pnpm is broken repo-wide, never invoke pnpm), PERSONAL vs INSPIRATION files byte-identical (git diff --no-index exit 0), INSPIRATION commit contains only show-volume-slider paths, PERSONAL worktree otherwise unchanged (dev2-self M x2 A x7 + fix).
rails: No pnpm, no push, no force, no unrelated files, no INSPIRATION .gitignore/stash/switch. Explain root cause + why fix preserves always-visible feature in report.
verification (report output+exit): tsc exit, diff --no-index exits, git status both repos, INSPIRATION git show --stat HEAD.
