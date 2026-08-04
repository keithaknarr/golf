#!/usr/bin/env bash
set -euo pipefail

LOG_FILE="${LOG_FILE:-./.golf-server.log}"
mkdir -p "$(dirname "$LOG_FILE")"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting golf app with auto-restart enabled" | tee -a "$LOG_FILE"

while true; do
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Launching server" | tee -a "$LOG_FILE"
  node scripts/start.js >> "$LOG_FILE" 2>&1
  exit_code=$?
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Server exited with code $exit_code. Restarting in 2 seconds..." | tee -a "$LOG_FILE"
  sleep 2
done
