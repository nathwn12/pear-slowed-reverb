# task-11-stub-pointed-at-fork
owner: coder
scope: Rebuild nsis-web x64 stub with download URL pointed at the FORK (nathwn12), not upstream. NO pnpm, NO push, NO publish.
why: package.json repository=pear-devs/pear-desktop bakes upstream URL into stub; fork release needs fork-pointed stub. Tag v3.12.0 (must equal app version) comes later via gh.
inputs:
- workdir: Q:\PROJECTS\PERSONAL\pear-desktop@dev2-self (clean, 0634226c pushed; DO NOT commit/switch)
- dist/ current (rebuilt 17:00 from identical tree) — skip vite rebuild; if builder errors on dist, run electron-vite build once then retry pack once.
- command shape: .\node_modules\.bin\electron-builder.cmd --win nsis-web:x64 -p never -c.publish.owner=nathwn12 (add -c.publish.provider=github only if needed; keep minimal, report exact command used)
- verify baked URL: strings-grep the built exe for github release URLs — must contain nathwn12/pear-desktop, must NOT contain pear-devs/pear-desktop. (e.g., Select-String on exe bytes for 'github.com/.*/releases/download'.)
- do NOT copy to Desktop yet (ATHENA stages release first); leave artifacts in pack/.
deliverable: pack\nsis-web\ fork-pointed web stub (+ yml/7z as produced), URL proof.
done: builder exit 0, URL grep shows fork owner only, git status still clean.
rails: ZERO pnpm. No src/config edits, no git ops beyond status reads, no publish, no Desktop copy, no push. Extended/no timeout.
verification (report output+exit): exact command, builder tail+exit, URL grep output, pack listing, git status.
