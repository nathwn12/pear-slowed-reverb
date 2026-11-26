# Development setup (troubleshooting)

This page is standalone: it covers one dependency-install failure mode and is not a statement of the repository's current state.

## Where the pin lives

The patch set is declared in [pnpm-workspace.yaml](../pnpm-workspace.yaml) under `patchedDependencies`. The patch files are committed under [patches/](../patches/). Read those tracked sources for exact package names, patch filenames and versions; this page does not repeat them.

## If an install reports ERR_PNPM_PATCH_FAILED

Treat this as a conditional troubleshooting case, not a blanket claim that installs always fail:

1. Compare the failing entry in [pnpm-workspace.yaml](../pnpm-workspace.yaml) with its patch file under [patches/](../patches/). An upstream version change can make a stored patch stop applying.
2. Regenerate the patch with `pnpm patch` + `patch-commit`, and update the declaration in `pnpm-workspace.yaml` in the same change.
3. Re-run the install only after the declaration and the patch agree.

If that error does not appear, the normal install path applies and no regeneration is needed.

## Working around a stuck patch

While a patch is being regenerated, run the already-installed bins directly, for example `./node_modules/.bin/tsc -p tsconfig.json --noEmit`. On Windows use the `.cmd` shims; the extensionless `node_modules/.bin/*` files are bash shims.
