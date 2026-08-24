#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo '=== [1/4] git pull ==='
git pull --ff-only

echo '=== [2/4] docker compose build ==='
docker compose build web

echo '=== [3/4] docker compose up ==='
docker compose up -d web

echo '=== [4/4] check container ==='
docker ps --filter name=portfolio-web --format '{{.Names}} {{.Status}}'

echo 'Deploy OK'