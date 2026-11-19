# task-02-dev2-self
owner: ATHENA (inline after fan-in, no worker files touched during port)
scope: After task-01 coder completes + ATHENA fan-in verification + reviewer gate pass, create branch dev2-self containing ported slowed-reverb + show-volume-slider work.
inputs:
- target repo: Q:\PROJECTS\PERSONAL\pear-desktop
- expected source branch: feat/show-volume-slider (created by task-01 from master@8bd5c312)
- session root: Q:\PROJECTS\PERSONAL\pear-desktop\.opencode\state\sessions\ses_f900fbeb2ffehdd6Cn7yLRCt4l\
deliverable: branch dev2-self exists pointing at verified feat/show-volume-slider HEAD (or checkout -b dev2-self from it), no working-tree changes lost.
done: git branch --show-current / git log --oneline -3 / git status --short --branch evidence in checkpoint.
rails: Do NOT run until background coder ses_f900dbf5dffeGOmkINNk9lMUFl completion notification arrives + fan-in verification re-run + review gate. No push. No touching src/plugins/* during task-01.
verification: git branch -v; git log --oneline -3 dev2-self; git status --short --branch
