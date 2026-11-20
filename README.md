<h1 align="center">pear-slowed-reverb</h1>

<p align="center"><strong>Play YouTube Music on Windows with a maintained Pear Desktop fork that ships its own builds and updates.</strong></p>

<p align="center">
  <img src="https://img.shields.io/badge/platform-windows--64bit-2b3137?logo=windows&logoColor=white" alt="Platform" />
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="MIT" /></a>
</p>

## Why pear-slowed-reverb

This is a maintained fork of [pear-devs/pear-desktop](https://github.com/pear-devs/pear-desktop). Its release pipeline and updater point at this repository, so Windows builds and their updates come from here rather than upstream. The fork keeps up with upstream's plugin set and carries dependency fixes on top. Upstream's MIT licence and copyright stay untouched.

- **Own release channel.** The Windows installer is built and published from this repo, not from upstream.
- **Current dependencies.** Production advisories that affect the build are gated here even when upstream's backlog leaves them open.
- **Plugins intact.** The full upstream plugin set ships in the fork.

## Install

Download `YouTube-Music-Setup-3.12.3.exe` from the [latest release](https://github.com/nathwn12/pear-slowed-reverb/releases/latest) and run it. The installer targets Windows x64. SmartScreen may warn because the build is not signed by a recognised publisher; that is expected for an independent build.

### Offline or pinned

To pin this version, keep the named installer asset. To build from source, use Node 24 and pnpm 11:

```bash
git clone https://github.com/nathwn12/pear-slowed-reverb.git
cd pear-slowed-reverb
pnpm install --frozen-lockfile
pnpm dist:win:x64
```

## Use it

Open the app and sign in with your YouTube account. Playback, library and search work as in Pear Desktop.

- Enable a player plugin under Options ▸ Plugins; each plugin carries its own settings there.
- Load a CSS theme under Options ▸ Visual Tweaks ▸ Themes.
- If the menu is hidden, press <kbd>Alt</kbd> (or the backtick key with the in-app-menu plugin) to reveal it.
- Update checks point at this fork's releases, so a new version is offered from here.

## Configure it

There is no central config file. Each plugin exposes its own toggles under Options ▸ Plugins, and themes are CSS files in the themes folder. The two settings changed most often:

| Setting | Where | Default |
| --- | --- | --- |
| Hide Menu | Options ▸ Visual Tweaks | off — press <kbd>Alt</kbd> to reveal the menu when on |
| Themes | Options ▸ Visual Tweaks ▸ Themes | the built-in theme; add CSS files to switch |

Upstream's plugin documentation applies to the rest of the plugin set.

## Requirements

- Windows 10 or 11, x64. The released installer is Windows x64 only.
- A YouTube account for sign-in.
- To build from source: Node 24, pnpm 11 and the Windows build tools used by upstream's `electron-builder` step.

## Development

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm dist:win:x64
```

`pnpm check` runs oxlint, the formatter check and the TypeScript check; `pnpm test` runs the Playwright suite. The build produces the Windows x64 installer under `dist\`.

## Status

**Unverified** — as-is, use at your own risk.

## Links

- [Issues](https://github.com/nathwn12/pear-slowed-reverb/issues)
- [Releases](https://github.com/nathwn12/pear-slowed-reverb/releases)
- [Upstream: pear-devs/pear-desktop](https://github.com/pear-devs/pear-desktop)
- [MIT](LICENSE)

<p align="center"><sub>Built by nathwn12</sub></p>
