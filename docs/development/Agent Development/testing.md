---
sidebar_position: 7
sidebar_label: "🧪 Testing"
---

# Testing

## Start Agent Server

**Start your agent's HTTP server:**
```bash
# From project root with venv activated
make install

# Start the agent server
python agentic_registry_agents/agents/my_agent_name/server.py

# Should see: "INFO: Server starting on port {port_from_config}"
```

## Test with Postman

**Server URL:** `http://localhost:{port_from_config}`

**Available Endpoints:**
- `POST /chat` - Send message, get response
- `POST /chat/stream` - Send message, get streaming response
- `GET /health` - Health check
- `GET /agent/info` - Agent information

**Test Request (POST /chat):**
```json
{
  "message": "Your test prompt here"
}
```

## Docker Testing (Optional)

```bash
# Set GitHub token
export GITHUB_TOKEN={your_token}

# Build and start
make start-my_agent_name

# Verify
docker ps
```
