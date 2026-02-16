---
sidebar_position: 9
sidebar_label: "🔌 MCP Integration"
---

# MCP Integration

Model Context Protocol (MCP) servers provide enhanced capabilities like filesystem access, database queries, and more.

## MCP Configuration

You can configure MCP servers using either local commands or remote URLs (SSE/HTTP).

```yaml
mcps:
  # Local process
  filesystem:
    command: "mcp-server-filesystem"
    args: ["/data"]
  
  # Remote server with headers
  remote_api:
    url: "http://localhost:8080/sse"
    headers:
      X-API-Key: "${MY_API_KEY}" # Environment variables are supported
```
