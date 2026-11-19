# task-03-build-installer-x64
owner: coder
scope: Build Windows x64 INSTALLER (nsis-web, NOT portable) from dev2-self worktree and copy installer .exe to Desktop.
inputs (paths):
- workdir: Q:\PROJECTS\PERSONAL\pear-desktop (branch dev2-self, 9 dirty files on 8bd5c312 — DO NOT switch/commit/stash)
- config: electron-builder.yml (win targets nsis-web+portable; use nsis-web:x64 only), package.json script dist:win:x64
- output dir: Q:\PROJECTS\PERSONAL\pear-desktop\pack\ (currently absent, will be created)
- destination: C:\Users\nathan\Desktop\
deliverable: ./pack/ contains x64 nsis-web setup .exe (NOT portable); copy of that setup .exe on Desktop; no source/config/git changes.
done: build exit 0, installer .exe in pack/ + Desktop copy verified (name+size), `git status --short --branch` still shows only pre-existing M x2 A x7 on dev2-self, no new source diffs.
rails: Run `pnpm dist:win:x64` only (clean+build+electron-builder --win nsis-web:x64 -p never). No `dist:win` (all archs), no portable copy, no -p always/publish, no src/config edits, no git commit/push/switch, no secrets. Long build: allow extended/no timeout, report full output tail + exit code. If build fails environmentally (network/timeout once), retry once before counting cycle (R1 flaky rule).
verification (run yourself, report output+exit):
- pnpm dist:win:x64 (exit code + tail)
- Get-ChildItem pack/*.exe (name+length)
- Copy-Item pack/<setup>.exe C:\Users\nathan\Desktop\ + verify Desktop copy exists
- git status --short --branch; git diff --stat HEAD (must still be 9 files 1336 ins)
reviewer notes: confirm installer (not portable) artifact, no source edits, -p never (no publish), Desktop copy matches pack file.
