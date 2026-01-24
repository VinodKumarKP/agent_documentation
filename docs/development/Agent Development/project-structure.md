---
sidebar_position: 10
---

# Project Structure

```
agentic_registry_agents/
├── agents_config/
│   └── my_agent.yaml
├── agentic_registry_agents/
│   ├── agents_config/
│   │   └── my_agent.yaml
│   └── my_agent/
│       ├── __init__.py
│       ├── README.md
│       ├── agent.py (agent implementation)
│       └── server.py (HTTP server)
└── tests/
    └── test_my_agent.py
```
