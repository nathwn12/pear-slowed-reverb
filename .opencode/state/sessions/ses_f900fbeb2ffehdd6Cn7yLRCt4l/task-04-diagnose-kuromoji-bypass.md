# task-04-diagnose-kuromoji-bypass
owner: debugger
scope: Confirm root cause of pnpm ERR_PNPM_PATCH_FAILED (kuromoji@0.1.2) blocking ALL pnpm scripts, and prove direct-bin bypass works WITHOUT reinstall/repair.
inputs (paths, read-only):
- workdir: Q:\PROJECTS\PERSONAL\pear-desktop (branch dev2-self, DO NOT modify anything, DO NOT run install/build/clean)
- files: patches/kuromoji@0.1.2.patch, pnpm-workspace.yaml (patchedDependencies), node_modules/.bin/electron-vite, node_modules/.bin/electron-builder
- session root: Q:\PROJECTS\PERSONAL\pear-desktop\.opencode\state\sessions\ses_f900fbeb2ffehdd6Cn7yLRCt4l\
deliverable: root-cause statement (why pnpm auto-install fails, why existing node_modules still usable) + proof that direct bins execute without pnpm (e.g., ./node_modules/.bin/electron-vite --version, ./node_modules/.bin/electron-builder --version output+exit) + exact bypass build commands for coder (vite build then builder nsis-web x64, with -p never, NO pnpm prefix).
done: No files modified (git status identical before/after: dev2-self M x2 A x7), proof outputs with exits, bypass command lines that avoid pnpm auto-install entirely.
rails: READ-ONLY except running --version probes. NEVER run pnpm install/build/clean/dist, never touch patches/, never delete node_modules, never start a build. Minimal probes only.
verification (run yourself): git status --short --branch before+after (must match), bin --version outputs+exits.
reviewer notes: bypass must not need reinstall; builder command must be nsis-web x64 -p never (no publish, no portable).
