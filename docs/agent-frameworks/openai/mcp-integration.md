---
sidebar_position: 10
sidebar_label: "🔌 MCP Integration"
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

## Using MCP Servers

Agents automatically get access to MCP tools defined in the configuration.
