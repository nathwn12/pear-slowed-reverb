---
name: pear-slowed-reverb seed
description: Exact commands, packages and paths for pear-slowed-reverb. Load before building, testing or editing this repo.
---

# pear-slowed-reverb - seed

Generated from this repo's manifests. `seed.mjs --check` fails when a manifest changed since generation, so this file cannot rot silently.

<!-- seed:begin (generated from the manifests; edit outside the markers) -->

## Commands

| Task | Command |
|---|---|
| install | `pnpm install` |
| build | `pnpm build` |
| typecheck | `pnpm typecheck` |
| lint | `pnpm lint` |
| test | `pnpm test` |
| format | `pnpm format` |
| dev | `pnpm dev` |
| start | `pnpm start` |

## Paths

- path: `README.md`
- path: `AGENTS.md`
- path: `.github/workflows`

## Notes

- CI workflows: build.yml, dependency-review.yml, issue-triage.yml, pr-build-artifacts.yml, reviewdog.yml, winget-cla.yml, winget-submission.yml

<!-- seed:end -->

## Ceremonies

- Work one coherent slice at a time; each verified slice is its own commit.
- A mistake made once gets a guard (test, lint, script or pre-commit) and a row in the harness guard ledger.
- Report the command and the result; mark anything unverified as unverified.
- Never publish, push or release without the owner saying so.
