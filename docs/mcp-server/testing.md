---
sidebar_position: 3
---

# Testing

## Local Testing

```bash
# From project root with venv activated
make install

# Start server
python mcp_servers_registry/servers/{{mcp_server_name}}/server.py --transport streamable-http

# Should see: "INFO: Server starting on port {port_number}"
```

## Test with MCP Inspector

```bash
# Install and launch
npx @modelcontextprotocol/inspector
```

**Inspector Configuration:**
- Server URL: `http://localhost:{port_number}/mcp`
- Transport: `Streamable HTTP`

**Test Your Tools:**
1. Select your tool from the list
2. Enter test inputs
3. Verify outputs match expectations
4. Test edge cases and error handling

## Docker Testing (Optional)

```bash
# Set GitHub token
export GITHUB_TOKEN={your_token}

# Build and start
make start-my_server

# Verify
docker ps
```
