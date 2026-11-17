# task-05-build-bypass-direct-bins
owner: coder
scope: Build x64 nsis-web installer via DIRECT node_modules bins (NO pnpm prefix — pnpm auto-install is broken by kuromoji patch drift), copy installer to Desktop.
inputs:
- workdir: Q:\PROJECTS\PERSONAL\pear-desktop (dev2-self, DO NOT switch/commit/stash, DO NOT run any pnpm command)
- bypass (from debugger ses_f8f52f08cffeW476PgYq9xaUIO, verified --version exit 0): .\node_modules\.bin\electron-vite.cmd build THEN .\node_modules\.bin\electron-builder.cmd --win nsis-web:x64 -p never (output ./pack/ per electron-builder.yml)
- optional clean first: .\node_modules\.bin\del-cli.cmd dist pack .vite-inspect
- destination: C:\Users\nathan\Desktop\ (copy ONLY nsis-web setup .exe, never portable; note stale 2026-09-04 YouTube Music Web Setup 3.12.0.exe already there — do not overwrite-or-confuse, verify by name+size+timestamp)
- session root: Q:\PROJECTS\PERSONAL\pear-desktop\.opencode\state\sessions\ses_f900fbeb2ffehdd6Cn7yLRCt4l\
deliverable: pack/ x64 setup .exe + Desktop copy, no source/config/git changes.
done: both build steps exit 0, setup exe in pack/ and Desktop (name+length+timestamp fresh), git status still dev2-self M x2 A x7 / diff-stat 9 files 1336 ins.
rails: ZERO pnpm invocations (not even --version). No src/config/patches edits, no install, no publish (-p never), no portable copy, no push. Long build: extended/no timeout. One attempt; on failure record tail+exit, do not retry with pnpm.
verification (report output+exit): vite build tail+exit, builder tail+exit, Get-ChildItem pack/*.exe, Desktop copy verify, git status --short --branch + git diff --stat HEAD.
