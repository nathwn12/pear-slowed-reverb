# task-10-commit-push-dev2self
owner: coder
scope: Commit slowed-reverb work on dev2-self and push new branch to fork. NO build, NO publish, NO pnpm.
inputs:
- workdir: Q:\PROJECTS\PERSONAL\pear-desktop@dev2-self (M .gitignore, M en.json, A slowed-reverb x5 on 8bd5c312)
- remote: origin = https://github.com/nathwn12/pear-desktop.git (fork — verify with git remote -v first)
steps:
1. `git add src/plugins/slowed-reverb src/i18n/resources/en.json .gitignore` (scoped — nothing else; worktree has nothing else dirty, verify first)
2. Commit WITHOUT touching global config: `git -c user.name=<from gh api user> -c user.email=<github noreply or existing> commit -m "feat(plugins): add Slowed Reverb plugin"` — get identity via `gh api user --jq '{login, email}'`; if no public email, use `<login>@users.noreply.github.com`. If repo-local user.name already set (git config user.name), just commit normally.
3. `git push -u origin dev2-self` (new branch, no force — must be clean fast-forward/new-ref; abort and report if rejected)
deliverable: origin/dev2-self == local dev2-self, single commit on top of 8bd5c312 containing only slowed-reverb + en.json keys + gitignore line.
done: git status clean, git log origin/dev2-self -2 shows commit, git show --stat HEAD shows 7 files (5 plugin + en.json + gitignore).
rails: No pnpm, no build, no --force, no global git config changes, no other remotes/branches. Stop and report (don't retry) if push rejected or identity unresolvable.
verification (report output+exit): status before/after, show --stat, push exit, log origin/dev2-self.
