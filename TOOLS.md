
### Coding Agent Defaults
- **Always use Claude Code** (`claude`) as the default coding agent, NOT Codex
- Codex requires OpenAI API key which may be missing/expired
- When launching Claude Code with `--dangerously-skip-permissions`, it still shows TWO interactive prompts:
  1. "Trust this folder?" → select "Yes, I trust this folder" (Enter)
  2. "Bypass Permissions warning" → select "Yes, I accept" (Down + Enter, since default is "No")
- **Always handle both prompts immediately** after launching — don't leave agents stuck
- **Always set up monitoring cron** (every 2-3 min) when launching background coding agents
- **Always include wake notification** (`openclaw system event`) in agent prompts for auto-notify on completion
- **Never set timeout on complex coding tasks** — `-p` flag buffers all output, timeout kills before any output appears. Only use timeout for simple/quick tasks.
- **Don't use pty with `-p` flag** — `-p` is non-interactive print mode, no TTY needed
- **ALWAYS use `--dangerously-skip-permissions`** even with `-p` flag — without it Claude Code will fail on file writes silently

### Browser Default
- Always use `profile="nymeria"` — connects directly via CDP (port 9222), NO relay extension needed
- This is the Nymeria Chrome profile with direct CDP control
- Never use `profile="chrome"` (relay-based, requires extension click)
- Only use `profile="openclaw"` if specifically asked or if Chrome is unavailable

### Messaging Language Policy
- Default language for WhatsApp responses: English.
- If an incoming message is in another language, reply in that language instead.
