# ARGENT

AI coding agent with persistent memory. Built on [OpenCode](https://opencode.ai) with [MemPalace](https://github.com/milla-jovovich/mempalace) memory integration.

<p align="center">
  <a href="https://discord.gg"><img alt="Discord" src="https://img.shields.io/discord/1391832426048651334?style=flat-square&label=discord" /></a>
</p>

---

### What is ARGENT?

ARGENT is OpenCode — the open source AI coding agent — with one critical upgrade: **it remembers**.

Every conversation with an AI loses its context when the session ends. Six months of decisions, debugging sessions, and architecture debates, gone. ARGENT fixes this by integrating MemPalace's memory system directly into the coding agent. Your AI doesn't just code — it remembers what it coded, why you made certain decisions, and what you've tried before.

- **OpenCode** — provider-agnostic AI coding agent with LSP support, TUI focus, and client/server architecture
- **MemPalace** — 96.6% recall on LongMemEval benchmark. Raw verbatim storage, palace-based organization (wings, rooms, closets, drawers), zero API calls

### How It Works

The memory system uses **The Palace** — ancient Greek orators memorized speeches by placing ideas in rooms of a building. MemPalace applies the same principle to AI memory:

- **Wings** — people and projects
- **Rooms** — specific topics within a wing (auth, billing, deploy)
- **Closets** — summaries pointing to original content
- **Drawers** — verbatim files, never summarized

The 4-layer memory stack:
| Layer | What | Size |
|-------|------|------|
| **L0** | Identity — who is this AI? | ~50 tokens |
| **L1** | Critical facts — team, projects, preferences | ~120 tokens |
| **L2** | Room recall — recent sessions, current project | On demand |
| **L3** | Deep search — semantic query across all memory | On demand |

### Installation

```bash
# Install ARGENT (same as OpenCode)
npm i -g opencode-ai@latest        # or bun/pnpm/yarn
scoop install opencode             # Windows
brew install anomalyco/tap/opencode # macOS/Linux

# Initialize memory for your projects
cd your-project
mempalace init
mempalace mine .
```

### Quick Start

```bash
# Run ARGENT like OpenCode
opencode

# Inside the session, your AI automatically:
# - Loads your memory on startup (L0 + L1)
# - Searches memory when topics come up
# - Saves important decisions automatically

# Or use mempalace directly
mempalace search "why did we switch to GraphQL"
mempalace status
```

### Key Features

- **Provider agnostic** — Claude, OpenAI, Google, or local models
- **LSP support** — out of the box
- **TUI native** — built for the terminal
- **Client/server** — run agent remotely if needed
- **Persistent memory** — remembers decisions across sessions
- **96.6% recall** — LongMemEval benchmark, zero API calls
- **Local only** — everything stays on your machine

### Documentation

For OpenCode docs: [opencode.ai/docs](https://opencode.ai/docs)

For MemPalace details: [github.com/milla-jovovich/mempalace](https://github.com/milla-jovovich/mempalace)

### License

MIT
