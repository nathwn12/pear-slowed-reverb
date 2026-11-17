# task-06-build-offline-nsis
owner: coder
scope: Build OFFLINE Windows x64 installer (full nsis, payload bundled, NOT nsis-web stub, NOT portable) from dev2-self worktree, copy to Desktop.
inputs:
- workdir: Q:\PROJECTS\PERSONAL\pear-desktop (dev2-self, DO NOT switch/commit/stash, DO NOT run any pnpm command — pnpm auto-install broken by kuromoji patch drift)
- dist/ already built today 16:33 from identical tree (git still M x2 A x7, 9 files 1336 ins) — skip vite rebuild, go straight to pack. If builder errors on dist, run .\node_modules\.bin\electron-vite.cmd build first, then retry pack once.
- pack command: .\node_modules\.bin\electron-builder.cmd --win nsis:x64 -p never (full nsis only; without selector you'd get web+portable too)
- destination: C:\Users\nathan\Desktop\ — copy ONLY the nsis setup .exe (~100+MB, likely named "YouTube Music Setup 3.12.0.exe"). Do NOT overwrite "YouTube Music Web Setup 3.12.0.exe" (the stub); do NOT copy portable/web-stub/7z.
- session root: Q:\PROJECTS\PERSONAL\pear-desktop\.opencode\state\sessions\ses_f900fbeb2ffehdd6Cn7yLRCt4l\
deliverable: pack/ full nsis x64 setup exe + Desktop copy, installs OUR payload offline with both plugins.
done: builder exit 0, setup exe >80MB in pack/ + Desktop (name+length+hash match), git status still dev2-self M x2 A x7 / diff-stat 9 files 1336 ins.
rails: ZERO pnpm invocations. No src/config/patches edits, no install, no publish (-p never), no portable/web copy, no push. Extended/no timeout. One pack attempt (+one vite+repack if dist-stale only).
verification (report output+exit): builder tail+exit, Get-ChildItem pack/*.exe -Recurse (name+length), Desktop copy Get-FileHash match vs pack file, git status --short --branch + git diff --stat HEAD.
