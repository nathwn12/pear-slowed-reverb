# Development setup (how-to)

This how-to owns the dependency-install facts referenced by the repository policy file. Project policy and the command list stay in AGENTS.md.

## Pinned patch state

`patches/kuromoji@0.1.2.patch` is wired through `pnpm-workspace.yaml` `patchedDependencies`. It no longer applies to the current registry tarball, so every `pnpm install` dies in pre-run install with `ERR_PNPM_PATCH_FAILED`. Regenerate it with `pnpm patch` + `patch-commit` before using pnpm for build, lint, typecheck or test.

Until then, run the already-installed bins directly, for example `./node_modules/.bin/tsc -p tsconfig.json --noEmit`. On Windows use the `.cmd` shims; the extensionless `node_modules/.bin/*` files are bash shims.

## Scope

The full command list, plugin layout, release flow and hygiene rules are policy in the repository policy file; this page is the how-to for the broken dependency-install state only.
