# plan: installer .exe (not portable) to Desktop
goal: Build Windows INSTALLER .exe (nsis-web, not portable) from dev2-self worktree (slowed-reverb + show-volume-slider uncommitted) and copy to C:\Users\nathan\Desktop.
scope: `pnpm dist:win:x64` (clean+build+electron-builder nsis-web x64, -p never) OR full `pnpm dist:win` per arch answer. Output ./pack/, copy *-setup-*.exe (installer) only to Desktop. No source edits.
done: Installer .exe exists in ./pack/ AND copy on Desktop, `git status` shows no source modifications (only pre-existing 9 dirty files), build exit 0 evidence in checkpoint.
file scope (owned): pack/** (created), dist/** (intermediates), C:\Users\nathan\Desktop\*.exe (copy). Forbidden: src/**, *.json/*.yml config, git push, portable .exe copy.
baseline R2 (2026-09-05 fresh): node v24.20.0, pnpm 12.3.4, electron-builder present True, pack/ absent, Desktop=C:\Users\nathan\Desktop, branch dev2-self 9 dirty files (M x2 A x7) on 8bd5c312.
