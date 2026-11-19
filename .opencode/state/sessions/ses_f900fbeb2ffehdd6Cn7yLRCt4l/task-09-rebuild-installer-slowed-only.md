# task-09-rebuild-installer-slowed-only
owner: coder
scope: Rebuild OFFLINE x64 nsis installer from slider-free tree (slowed-reverb only) and refresh Desktop copy.
why: dist/ is stale (built WITH show-volume-slider); source changed (removal) so FULL rebuild required this time.
inputs:
- workdir: Q:\PROJECTS\PERSONAL\pear-desktop@dev2-self (DO NOT switch/commit/stash, DO NOT run any pnpm command)
- commands (direct bins only): .\node_modules\.bin\del-cli.cmd dist pack .vite-inspect THEN .\node_modules\.bin\electron-vite.cmd build THEN .\node_modules\.bin\electron-builder.cmd --win nsis:x64 -p never
- destination: C:\Users\nathan\Desktop\YouTube Music Setup 3.12.0.exe (overwrite with fresh build — user-ordered regen; verify size/hash differ-or-match explicitly, do NOT touch the Web stub or the 7z)
- session root: Q:\PROJECTS\PERSONAL\pear-desktop\.opencode\state\sessions\ses_f900fbeb2ffehdd6Cn7yLRCt4l\
deliverable: fresh full-nsis x64 setup exe in pack/ + Desktop copy, built from slowed-only tree.
done: all three steps exit 0, Desktop exe hash == pack exe hash, glob show-volume-slider still zero hits, git status still dev2-self M .gitignore / M en.json / A slowed-reverb x5.
rails: ZERO pnpm. No src/config edits, no git ops beyond status reads, no publish, no portable/web copy, no push. Extended/no timeout.
verification (report output+exit): each step tail+exit, pack exe name+size, Desktop hash vs pack hash, glob hits, git status --short --branch.
