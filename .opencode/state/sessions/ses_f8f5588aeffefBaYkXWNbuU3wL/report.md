# Final Report — Force pwsh via Global Shell Key (T3)

Date: 2026-09-05
Session: ses_f8f5588aeffefBaYkXWNbuU3wL
Tier: T3 (config change — classified UP, keeper-owned, full loop)
Status: COMPLETE pending restart (restart deferred — needs user approval to go live)

## 1. Goal

Check PowerShell location and currency, then pin global OpenCode config `shell` to the absolute pwsh path so all OpenCode shell tool calls run under PowerShell 7.

Done definition (from plan.md): `shell` = absolute pwsh path, JSON parses, `opencode2 service status` healthy, fresh pwsh verification.

Scope: read-only checks (Get-Command, winget, docs) + one config edit in `C:\Users\nathan\.config\opencode\opencode.jsonc`. File scope: that file ONLY (keeper-owned). No project code.

## 2. Changed Paths with Purpose

### 2.1 `C:\Users\nathan\.config\opencode\opencode.jsonc` — line 10 (ONLY project-external change)

Purpose: pin global OpenCode shell to absolute PowerShell 7 path per docs https://opencode.ai/v2/docs/config/ ### Shell.

Change: added one top-level key:

```jsonc
"shell": "C:\\Program Files\\PowerShell\\7\\pwsh.exe",
```

Verified live file state on 2026-09-05: line 10 reads `"shell": "C:\\Program Files\\PowerShell\\7\\pwsh.exe",` between `"model"` (line 9) and `"compaction"` (line 11). No other lines touched. LF/no-BOM preserved.

Keeper exclusivity honored: `~/.config/opencode/**` edited solely by opencode-keeper. Snapshot taken before edit to `snapshots/20260905-162727/` (pre-edit SHA256 478c2a31...).

### 2.2 Session state (harness bookkeeping, no product effect)

- `.opencode/state/sessions/ses_f8f5588aeffefBaYkXWNbuU3wL/plan.md` — T3 plan, goal, scope, done, rails.
- `.opencode/state/sessions/ses_f8f5588aeffefBaYkXWNbuU3wL/checkpoint.md` — phase boundaries: PLAN / REVERIFY / REVIEW.
- `.opencode/state/sessions/ses_f8f5588aeffefBaYkXWNbuU3wL/keeper.md` — keeper pass record (one line).
- `.opencode/state/sessions/ses_f8f5588aeffefBaYkXWNbuU3wL/documenter.md` — no docs updates rationale.
- `.opencode/state/sessions/ses_f8f5588aeffefBaYkXWNbuU3wL/report.md` — this file.

### 2.3 Paths explicitly NOT changed

- Project code: none.
- `README.md` (Pear Desktop app docs) and `changelog.md` (project release notes): contain no shell/opencode references, out of task-01 scope — no update (documenter.md 2026-09-05).

## 3. Verification Evidence (evidence first)

All evidence below is fresh output from this session's own runs as recorded in checkpoint.md / keeper.md. Claims without fresh output are marked UNVERIFIED — none remain for the gate.

### 3.1 PowerShell location + version: `C:\Program Files\PowerShell\7\pwsh.exe` 7.6.5

- `Get-Command pwsh` baseline: `C:\Program Files\PowerShell\7\pwsh.exe`
- `pwsh --version` / `$PSVersionTable`: `7.6.5`
- Checkpoint line: `phase=PLAN done baseline_pwsh=C:\Program Files\PowerShell\7\pwsh.exe 7.6.5`

Result: PASS — absolute path confirmed, version 7.6.5.

### 3.2 Currency: winget reports no upgrade available

- `winget` check: `no-upgrade` for PowerShell 7.6.5.
- Checkpoint line: `winget=no-upgrade`

Result: PASS — installed 7.6.5 is current per winget.

### 3.3 Upstream latest is 7.6.5 (2026-08-14)

- Upstream release check: `latest_upstream=7.6.5_2026-08-14`
- Matches installed 7.6.5 — no newer stable upstream.

Result: PASS — installed equals upstream latest.

### 3.4 Config shell select: JSON parses, shell key correct

- `Get-Content opencode.jsonc | ConvertFrom-Json | Select-Object shell` → `C:\Program Files\PowerShell\7\pwsh.exe`
- Keeper record: `ConvertFrom-Json shell select OK`
- Direct read 2026-09-05 confirms line 10: `"shell": "C:\\Program Files\\PowerShell\\7\\pwsh.exe",`
- JSON parse: OK (no parse error; service status healthy implies valid config).

Result: PASS.

### 3.5 Service healthy: `http://127.0.0.1:49374`

- `opencode2 service status` → healthy, endpoint `http://127.0.0.1:49374`
- Checkpoint line: `phase=REVERIFY done shell=C:\Program Files\PowerShell\7\pwsh.exe service=http://127.0.0.1:49374`
- Keeper record: `opencode2 service status http://127.0.0.1:49374`

Result: PASS — service healthy post-edit without restart.

### 3.6 Diff minimal: fc one-line diff

- `fc` snapshot-vs-live diff: `diff=one-line` / `fc diff=1 line added only`
- Only addition is the top-level `shell` line; no deletions, no reformatting; LF/no-BOM preserved.

Result: PASS — blast radius confined to one line.

### 3.7 Reviewer gate: approve

- Review phase: `phase=REVIEW verdict=approve findings=2-low-unverified-nonblocking`
- Two low-severity unverified non-blocking findings; no reject, no required fix.

Result: PASS — adversarial gate approved.

### 3.8 Shell select re-verified in fresh pwsh

- Fresh pwsh verification re-ran the `ConvertFrom-Json shell select` after the edit — OK (see 3.4).
- Checkpoint REVERIFY phase aggregates shell + service + diff as done.

Result: PASS.

## 4. Limitations

1. **Restart deferred — needs user approval to go live.** The new `shell` value is written and validated but OpenCode service was NOT restarted. Per rails (`restart only on explicit user approval (defer)`) and keeper protocol (`opencode2 service restart` ONLY on explicit user `restart` argument, report-first), the change takes full effect on next service start/restart. Service reports healthy at `http://127.0.0.1:49374` without restart, but shell routing for already-running sessions is not proven live until restart.
2. **Global-only effect.** Change applies to global OpenCode config, not per-project. No per-project override was added or tested.
3. **Reviewer findings unverified (non-blocking).** 2 low findings recorded as unverified-nonblocking; they did not block approval but were not independently re-run with fresh output beyond the REVERIFY bundle.
4. **Docs check limited to scope.** README.md and changelog.md were read for shell/opencode references (none found); no broader docs audit performed.

## 5. Follow-ups

1. **User-approved restart:** run `opencode2 service restart` only after explicit user `restart` approval, then re-run `opencode2 service status` + `ConvertFrom-Json shell select` fresh and append to keeper.md. Owner: opencode-keeper.
2. **Post-restart shell proof:** after restart, run one shell-tool command proving `pwsh.exe 7.6.5` is the active shell (e.g., `$PSVersionTable.PSVersion`) and record output in checkpoint.md.
3. **No doc updates outstanding:** if a future task adds per-project shell overrides, update README.md / changelog.md then; no action now (documenter verdict stands).
4. **No rollback needed:** snapshot `snapshots/20260905-162727/` retained; if restart surfaces regression, restore via `Copy-Item snapshot/*` + certutil-hash validation per /AUTO-ROLLBACK template.

## 6. Sources Read

- `plan.md` (6 lines): goal, scope, done, file scope, rails.
- `checkpoint.md` (3 lines): PLAN / REVERIFY / REVIEW phases with baseline_pwsh, winget, upstream, shell, service, diff, verdict.
- `keeper.md` (1 line): 2026-09-05 keeper/task-01 shell add, docs URL, snapshot SHA, fc diff, JSON select, service URL, no-restart note.
- `documenter.md` (1 line): 2026-09-05 no docs updates, global-only rationale.
- `C:\Users\nathan\.config\opencode\opencode.jsonc` line 10 (live read 2026-09-05): `"shell": "C:\\Program Files\\PowerShell\\7\\pwsh.exe",`.

Evidence first, opinions never. Report finished by reporter as full text to session root.
