---
sidebar_position: 2
---

# Agent Architecture

Each agent consists of three required files:

| File | Location                | Purpose |
|------|-------------------------|---------|
| `{agent}.yaml` | `agents/agents_config/` | Configuration (Model, Tools, Prompts) |
| `agent.py` | `agents/{agent}/`       | Agent class implementation |
| `server.py` | `agents/{agent}/`       | HTTP server entry point |

**Key Points:**
- Agent folder name MUST match config filename.
- `agent.py` uses `os.path.basename` to auto-detect agent name.
- `server.py` uses `oai_agent_server` to automatically configure HTTP endpoints.
