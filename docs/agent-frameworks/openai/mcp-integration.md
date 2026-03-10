---
sidebar_position: 10
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

## Lazy MCP Loading

For scenarios with many MCP tools or high latency, you can enable lazy loading. This allows the agent to discover and load tools only when needed, reducing initial startup time and token usage.

### Enabling Lazy Loading

Add `enable_lazy_loading: true` to your `crew_config`:

```yaml
crew_config:
  pattern: supervisor
  enable_lazy_loading: true
```

### How It Works

1. **Discovery**: The agent is initially provided with a list of available tool names but not their full schemas.
2. **Schema Retrieval**: When the agent decides to use a tool, it calls `get_input_parameter_schema` to fetch the specific tool's schema.
3. **Execution**: The agent then executes the tool using `execute_multiple_tools` or `execute_tool`.

This workflow is automatically handled by the framework when `enable_lazy_loading` is set to true.

## Using MCP Servers

Agents automatically get access to MCP tools defined in the configuration.
