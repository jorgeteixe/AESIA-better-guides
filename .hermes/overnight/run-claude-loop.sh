#!/usr/bin/env bash
set -u

REPO="/home/hermes/AESIA-better-guides"
BRANCH="claude/overnight-opus-4-8-aesia-poc"
MODEL="claude-opus-4-8"
LOG_DIR="$REPO/.hermes/overnight"
PROMPT_FILE="$LOG_DIR/goal-prompt.md"
RUNTIME_DIR="$LOG_DIR/runtime"
PROGRESS_FILE="$LOG_DIR/progress.md"

mkdir -p "$RUNTIME_DIR"
cd "$REPO" || exit 1

log() {
  printf '[%s] %s\n' "$(date -Is)" "$*" | tee -a "$RUNTIME_DIR/loop.log"
}

sleep_for_reset() {
  local seconds="$1"
  log "Sleeping ${seconds}s before retry"
  sleep "$seconds"
}

ensure_branch() {
  git checkout "$BRANCH" >>"$RUNTIME_DIR/git-checkout.log" 2>&1 || git checkout -b "$BRANCH" >>"$RUNTIME_DIR/git-checkout.log" 2>&1
  git fetch origin >>"$RUNTIME_DIR/git-fetch.log" 2>&1 || true
  if git ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then
    git pull --rebase origin "$BRANCH" >>"$RUNTIME_DIR/git-pull.log" 2>&1 || {
      log "git pull --rebase failed; aborting rebase and hard-resetting to HEAD"
      git rebase --abort >>"$RUNTIME_DIR/git-pull.log" 2>&1 || true
      git reset --hard HEAD >>"$RUNTIME_DIR/git-pull.log" 2>&1 || true
    }
  fi
}

run_validation() {
  npm run build >>"$RUNTIME_DIR/build.log" 2>&1
}

commit_and_push() {
  local iteration="$1"
  if git diff --quiet && git diff --cached --quiet; then
    log "No changes to commit"
    return 0
  fi

  git add -A >>"$RUNTIME_DIR/git-add.log" 2>&1 || return 1

  if git diff --cached --quiet; then
    log "No staged changes after git add"
    return 0
  fi

  git commit -m "overnight: improve AESIA UX/content (${iteration})" >>"$RUNTIME_DIR/git-commit.log" 2>&1 || return 1
  git push -u origin "$BRANCH" >>"$RUNTIME_DIR/git-push.log" 2>&1 || return 1
  return 0
}

handle_failed_iteration() {
  local reason="$1"
  log "Iteration failed: $reason"
  {
    echo
    echo "## $(date -Is)"
    echo "- Estado: iteración revertida automáticamente"
    echo "- Motivo: $reason"
    echo "- Acción: se hizo \`git reset --hard HEAD\` para mantener la rama construible"
  } >> "$PROGRESS_FILE"
  git reset --hard HEAD >>"$RUNTIME_DIR/git-reset.log" 2>&1 || true
}

iteration=1
while true; do
  ensure_branch
  ts="$(date +%Y%m%d-%H%M%S)"
  result_json="$RUNTIME_DIR/claude-$ts.json"
  stderr_log="$RUNTIME_DIR/claude-$ts.stderr.log"
  prompt_file="$RUNTIME_DIR/claude-prompt-$ts.txt"

  cat > "$prompt_file" <<EOF
Read /home/hermes/AESIA-better-guides/.hermes/overnight/goal-prompt.md and /home/hermes/AESIA-better-guides/.hermes/overnight/progress.md first.

Then execute one autonomous improvement pass on this repository. Research externally if useful, implement the best safe improvement you can find, validate locally with npm run build, update the progress log, and finish with a concise machine-readable summary using sections exactly named:
SUMMARY:
VALIDATION:
NEXT_IDEA:
EOF

  log "Starting iteration $iteration with model $MODEL"
  if ! claude -p "$(cat "$prompt_file")" \
      --model "$MODEL" \
      --effort max \
      --dangerously-skip-permissions \
      --max-turns 30 \
      --output-format json \
      >"$result_json" 2>"$stderr_log"; then
    err_text="$(tail -n 40 "$stderr_log" 2>/dev/null)"
    if printf '%s' "$err_text" | grep -Eqi 'rate.limit|rate_limit|usage limit|too many requests|credit balance is too low|exceeded'; then
      log "Claude hit a limit; will wait and retry"
      sleep_for_reset 1800
      iteration=$((iteration + 1))
      continue
    fi
    log "Claude command exited non-zero"
    sleep_for_reset 600
    iteration=$((iteration + 1))
    continue
  fi

  subtype="$(python3 - <<'PY' "$result_json"
import json,sys
with open(sys.argv[1]) as f:
    data=json.load(f)
print(data.get('subtype',''))
PY
)"
  terminal_reason="$(python3 - <<'PY' "$result_json"
import json,sys
with open(sys.argv[1]) as f:
    data=json.load(f)
print(data.get('terminal_reason',''))
PY
)"

  if [ "$subtype" != "success" ] || [ "$terminal_reason" != "completed" ]; then
    summary="$(python3 - <<'PY' "$result_json"
import json,sys
with open(sys.argv[1]) as f:
    data=json.load(f)
print(data.get('result',''))
PY
)"
    if printf '%s' "$summary" | grep -Eqi 'rate.limit|rate_limit|usage limit|too many requests|credit balance is too low|exceeded'; then
      log "Claude returned a limit message in JSON output; waiting for reset"
      sleep_for_reset 1800
      iteration=$((iteration + 1))
      continue
    fi
    handle_failed_iteration "Claude returned subtype=$subtype terminal_reason=$terminal_reason"
    sleep_for_reset 300
    iteration=$((iteration + 1))
    continue
  fi

  if ! run_validation; then
    handle_failed_iteration "npm run build failed after Claude changes"
    sleep_for_reset 300
    iteration=$((iteration + 1))
    continue
  fi

  if ! commit_and_push "$iteration"; then
    handle_failed_iteration "git commit/push failed"
    sleep_for_reset 300
    iteration=$((iteration + 1))
    continue
  fi

  log "Iteration $iteration completed successfully"
  sleep_for_reset 60
  iteration=$((iteration + 1))
done
