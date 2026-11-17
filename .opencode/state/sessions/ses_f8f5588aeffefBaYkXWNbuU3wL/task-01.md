# Task-01 — keeper pins shell to pwsh
Owner: opencode-keeper. Scope: C:\Users\nathan\.config\opencode\opencode.jsonc ONLY.
Inputs: v2 docs https://opencode.ai/v2/docs/config/ (### Shell: {"shell":"/bin/zsh"}), current pwsh C:\Program Files\PowerShell\7\pwsh.exe 7.6.5 (winget no-upgrade, upstream latest 7.6.5 2026-08-14).
Deliverable: top-level "shell": "C:\\Program Files\\PowerShell\\7\\pwsh.exe" (absolute path, JSONC valid), snapshot before edit to <session-root>/snapshots/<timestamp>/.
Done: JSON parses (pwsh ConvertFrom-Json), diff shows one key, no other keys touched.
Rails: docs-first, keeper-only edit, no concurrent config writes, no restart without user approval, append <session-root>/keeper.md one line.
Verification: `pwsh -NoProfile -Command "Get-Content C:\Users\nathan\.config\opencode\opencode.jsonc | ConvertFrom-Json | Select-Object -ExpandProperty shell"` + `opencode2 service status`.
