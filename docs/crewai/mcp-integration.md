---
sidebar_position: 9
---

# MCP Integration

Model Context Protocol (MCP) servers provide enhanced capabilities like filesystem access, database queries, and more.

## MCP Configuration

```yaml
mcps:
  filesystem:
    command: "mcp-server-filesystem"
    args: ["/data"]
  
  environment:
    command: "uv"
    args:
      - "run"
      - "--with"
      - "mcp-env-server"
      - "env_lookup_server"
```
