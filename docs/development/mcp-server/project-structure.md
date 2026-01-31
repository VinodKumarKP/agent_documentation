---
sidebar_position: 5
sidebar_label: "📂 Project Structure"
---

# Project Structure

```
mcp_servers_registry/
├── servers_config/
│   └── my_server.yaml
├── servers/
│   └── {{mcp_server_name}}/
│       ├── __init__.py
│       ├── README.md
│       └── server.py
├── utils/
│   └── my_server_tools.py
└── tests/
    └── test_my_server_tools.py
```
