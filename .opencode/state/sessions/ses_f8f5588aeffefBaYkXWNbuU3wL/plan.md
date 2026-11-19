# Plan — force pwsh via global shell key (T3)
Goal: check PowerShell location + currency, then pin global opencode config `shell` to absolute pwsh path.
Scope: read-only checks (Get-Command, winget, docs) + one config edit in C:\Users\nathan\.config\opencode\opencode.jsonc.
Done: `shell` = absolute pwsh path, JSON parses, `opencode2 service status` healthy, fresh pwsh verification.
File scope: C:\Users\nathan\.config\opencode\opencode.jsonc ONLY (keeper-owned). No project code.
Rails: keeper is sole editor of ~/.config/opencode/**; snapshot before edit; docs-first v2; restart only on explicit user approval (defer).
