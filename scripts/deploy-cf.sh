#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  echo "Uncommitted changes on dev. Commit and push them first."; exit 1
fi

echo ">> Building for domain root..."
rm -rf out && npm run build

echo ">> Deploying to Cloudflare Pages (production)..."
npx wrangler pages deploy out --project-name=cargo-flow-africa --branch=main --commit-dirty=true
