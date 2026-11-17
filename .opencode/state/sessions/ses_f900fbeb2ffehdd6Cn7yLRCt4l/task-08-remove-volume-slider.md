# task-08-remove-volume-slider
owner: coder
scope: Delete show-volume-slider plugin entirely from BOTH copies; slowed-reverb + its en.json keys stay. NO push.
why: user ordered removal (supersedes click-fix 66633b4c, which is unpushed — revert covers it).
steps:
1. PERSONAL (Q:\PROJECTS\PERSONAL\pear-desktop@dev2-self, all uncommitted): `git rm -r src/plugins/show-volume-slider` (staged-new files, never committed) + surgical edit src/i18n/resources/en.json removing ONLY the 4-line "show-volume-slider" block (keep slowed-reverb block). Do NOT touch .gitignore, slowed-reverb/*, or the en.json slowed-reverb keys.
2. INSPIRATION (Q:\PROJECTS\PERSONAL\INSPIRATION\pear-desktop@feat/show-volume-slider, ahead 1 unpushed): `git revert --no-commit 66633b4c 72e4da6b` then ONE commit `revert(plugins): remove Show Volume Slider` (expect: dir deleted, en.json -4+15? net removes slider keys only). Pre-existing dirty .gitignore MUST stay uncommitted/touched-by-nobody.
deliverable: no src/plugins/show-volume-slider anywhere; en.json has slowed-reverb, lacks show-volume-slider; slowed-reverb files intact both copies.
done: tsc exit 0 direct bin (never pnpm); PERSONAL en.json vs INSPIRATION en.json byte-identical; slowed-reverb 5 files byte-identical both copies; glob show-volume-slider zero hits both repos; INSPIRATION log top = revert commit, status shows only M .gitignore + the revert commit ahead; PERSONAL status dev2-self M x2->M x1? (en.json still M, .gitignore M, show-volume-slider A-lines gone, slowed-reverb A x5 remain).
rails: No pnpm, no push, no force, no reset --hard, no stash, no other files. Revert (not reset) in INSPIRATION to preserve history.
verification (report output+exit): tsc exit, both en.json diff --no-index exit, slowed-reverb parity exits, glob hits, both git statuses, INSPIRATION git show --stat HEAD.
