# MemPalace + OpenCode Demo

## What's Integrated

MCP config added to `.opencode/opencode.jsonc`:
```jsonc
"mcp": {
  "mempalace": {
    "type": "local",
    "command": ["python", "-m", "mempalace.mcp_server"],
    "environment": { "MEMPALACE_PALACE_PATH": "~/.mempalace" }
  }
}
```

When opencode runs, you'll have 22 mempalace tools: `mempalace:search`, `mempalace:add_drawer`, etc.

## Quick CLI Test

Run from AIGENT folder:

```powershell
# 1. Check status
cat test-status.json | python -m mempalace.mcp_server

# 2. Add a memory  
cat test-add.json | python -m mempalace.mcp_server

# 3. Search
cat test-search.json | python -m mempalace.mcp_server
```

## Test JSON Files (Included)

- `test-status.json` - Check palace status
- `test-add.json` - Add a memory to test/demo
- `test-search.json` - Search for "test memory"  
- `test-wings.json` - List all wings

## Verified Results

**Add:** `{"success": true, "drawer_id": "drawer_test_demo_...", "wing": "test", "room": "demo"}`

**Search:** `{"results": [{"text": "This is a test memory from the demo", "similarity": 0.617}]}`

**List wings:** `{"wings": {"test": 1}}`

## Auto-Mining

Created `.opencode/command/save-memory.md` - instruction telling agent to save session context to memory palace.

When opencode runs a session, the agent should use mempalace tools to save:
- Decisions made
- Code patterns discovered  
- Entity relationships (via `mempalace_kg_add`)
- Errors fixed and their solutions
- Important verbatim content (via `mempalace_add_drawer`)

Standard wings:
- `opencode` - opencode tool/agent learnings
- `code` - code patterns and solutions
- `decisions` - architectural decisions
- `projects` - project-specific knowledge
- `errors` - bugs and their fixes