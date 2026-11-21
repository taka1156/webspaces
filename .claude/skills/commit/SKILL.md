---
name: commit
description: >
  Create git commits that follow this repository's commit convention
  (.cz-config.cjs + commitlint.config.cjs). Use when: the user asks to commit,
  write a commit message, split changes into commits, or says "コミットして".
---

# Commit

Commit messages in this repo are validated by commitlint (`.husky/commit-msg`)
and must match the cz-customizable config in `.cz-config.cjs`.

## Message Format

```
<type>: <subject>
```

A **single line only**. Nothing else.

| Rule                          | Source                    |
| ----------------------------- | ------------------------- |
| No scope (`feat(x):` is NG)   | `scope-empty: always`     |
| No body                       | `body-empty: always`      |
| No footer / trailers          | `footer-empty: always`    |
| No issue refs (`#12`, `fixes`) | `references-empty: always` |
| Subject 5–128 characters      | `subject-min/max-length`  |
| Subject must not start with an uppercase letter (`Claude…`, `TTY…` are NG; write `claude…` or start with Japanese) | `subject-case` (config-conventional) |

**Do NOT append `Co-Authored-By:` or any other trailer.** It is parsed as a
body/footer and commitlint rejects the commit (`body-empty`). This repo rule overrides the default
attribution behavior.

## Types

Pick exactly one. If a change spans several types, split it into multiple commits.

| type       | Use for                                                                 |
| ---------- | ----------------------------------------------------------------------- |
| `feat`     | New feature (機能追加)                                                  |
| `fix`      | Bug fix (バグの修正)                                                    |
| `docs`     | Documentation only (ドキュメントのみの変更)                             |
| `style`    | Formatting only, no behavior change (見た目だけの変更)                  |
| `refactor` | Code change that is neither a fix nor a feature                         |
| `test`     | Add or fix tests                                                        |
| `chore`    | Build process, tooling, libraries, config (補助ツールやライブラリの変更) |

Any other type (`perf`, `ci`, `build`, ...) is not offered by `.cz-config.cjs`; map it to `chore` or `refactor`.

## Subject Style

- Write in **Japanese**, matching existing history.
- Describe what changed and why in one phrase, ending with a noun or `〜を修正` / `〜に変更` / `〜を追加`.
- No trailing period.
- Examples from history:
  - `feat: ビルド時にOGP画像を静的生成するように変更`
  - `fix: 記事ページのOGPのURLに/articleを含めるように修正`
  - `refactor: サイトURLの取得処理をCloudflare Pages依存から切り離し`
  - `chore: 静的アセットのみのWorker構成に変更`
  - `docs: デプロイ先をCloudflare Workersに合わせてドキュメントを更新`

## Procedure

1. **Inspect**: run `git status --short`, `git diff`, and `git diff --cached`. Check the current branch.
   - If on `master`, stop and ask the user before committing (suggest creating a branch).
2. **Group**: classify changes by type. If they span multiple types or unrelated topics, propose a split.
   - Do not stage files that look unrelated to the current task (e.g. unexpected deletions) without asking.
3. **Propose**: show the user, for each commit, the files to stage and the exact message. Wait for approval (mirrors cz's `confirmCommit` step and AGENTS.md).
4. **Stage**: `git add <explicit paths>`. Avoid `git add -A` / `git add .`.
5. **Commit**: `git commit -m "<type>: <subject>"`
   - Never use `--no-verify`. Hooks run `pnpm lint` (pre-commit) and commitlint (commit-msg).
   - `.husky/prepare-commit-msg` launches the interactive cz prompt only when `/dev/tty` can be opened; in a non-interactive shell it is skipped, so `-m` works as-is.
   - The guard hook (`.claude/hooks/guard.sh`) blocks any Bash command containing `.env`, `rm`, etc. — including inside the commit message. Reword the subject (e.g. `環境変数ファイル`) instead of bypassing it.
6. **On hook failure**:
   - commitlint error → fix the message and retry. Pre-check with `printf '<msg>\n' | pnpm commitlint`.
   - Run each commit as a separate command (or with `set -o pipefail`); piping `git commit` into `tail` hides failures and lets later `git add`s pile into the next commit.
   - `pnpm lint` error → report it to the user; fix only with their approval, then create a **new** commit (do not amend unless asked).
7. **Report**: show `git log --oneline -n <count>` for the created commits.
