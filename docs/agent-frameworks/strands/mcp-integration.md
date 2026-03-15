---
sidebar_position: 9
sidebar_label: "🔌 MCP Integration"
---

# MCP Integration

Model Context Protocol (MCP) provides a powerful way to extend your agents' capabilities by connecting them to external tools and services. Think of MCP servers as providers of "super-tools" that can give your agents the ability to interact with filesystems, databases, or any other external API.

### How It Works

When you configure an MCP server, the framework automatically discovers the tools it offers and makes them available to your agents. The agent can then intelligently decide when to use these tools to accomplish a task. Once configured, the tools from all MCP servers are added to the agent's list of available tools, and the agent can use them just like any other tool.

### Configuration Explained

You can configure MCP servers in two ways: by running a local process or by connecting to a remote URL.

```yaml
mcps:
  # --- Method 1: Running a Local MCP Server ---
  # Use this to run a command-line tool or script as a managed process.
  # The framework will start and stop the server for you.
  filesystem_access:
    # The command to execute to start the server.
    command: "mcp-server-filesystem" 
    # Optional arguments to pass to the command.
    args: ["/path/to/allowed/directory"]

  # --- Method 2: Connecting to a Remote MCP Server ---
  # Use this to connect to an existing server that is already running.
  # This is common for connecting to microservices or third-party APIs.
  remote_database_api:
    # The URL of the remote MCP server.
    # It can be a standard HTTP endpoint or a Server-Sent Events (SSE) stream.
    url: "http://api.internal.mycompany.com/mcp"
    # Optional headers to include with the request, useful for authentication.
    headers:
      # You can use environment variables for sensitive data like API keys.
      Authorization: "Bearer ${DATABASE_API_KEY}" 
```

For systems with many MCP tools, this can increase startup time. To optimize this, the framework also supports lazy loading. See the next section for details.

## Lazy MCP Loading

For scenarios with many MCP tools or high latency, you can enable lazy loading. This allows the agent to discover and load tools only when needed, reducing initial startup time and token usage.

### Enabling Lazy Loading

Add `enable_lazy_loading: true` to your `crew_config`:

```yaml
crew_config:
  pattern: graph
  enable_lazy_loading: true
```

### How It Works

1. **Discovery**: The agent is initially provided with a list of available tool names but not their full schemas.
2. **Schema Retrieval**: When the agent decides to use a tool, it calls `get_input_parameter_schema` to fetch the specific tool's schema.
3. **Execution**: The agent then executes the tool using `execute_multiple_tools` or `execute_tool`.

This workflow is automatically handled by the framework when `enable_lazy_loading` is set to true.
