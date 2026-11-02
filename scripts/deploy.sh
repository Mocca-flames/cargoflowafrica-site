#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
cd "$ROOT"

if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  echo "Uncommitted changes on dev. Commit and push them first."; exit 1
fi

echo ">> Building..."
rm -rf out && npm run build
touch out/.nojekyll

echo ">> Publishing to gh-pages..."
git worktree prune
git worktree add --detach "$TMP"
cd "$TMP"
git branch -D gh-pages 2>/dev/null || true
git checkout --orphan gh-pages
git rm -rf . -q
cp -r "$ROOT/out/." .
git add -A
git commit -q -m "Deploy build of $(git -C "$ROOT" rev-parse --short HEAD)"
git push -f origin gh-pages
cd "$ROOT"
git worktree remove --force "$TMP"
echo ">> Done: https://mocca-flames.github.io/cargoflowafrica-site/"
