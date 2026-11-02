#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  echo "Uncommitted changes. Commit and push to dev first."; exit 1
fi

deploy() {
  echo ">> Building SITE=$1 -> $2"
  rm -rf out && SITE=$1 npm run build
  npx wrangler pages deploy out --project-name=$2 --branch=main --commit-dirty=true
}

deploy za cargo-flow-africa
deploy bw cargo-flow-africa-bw
echo ">> Both sites deployed."
