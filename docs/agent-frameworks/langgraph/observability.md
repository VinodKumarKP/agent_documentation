---
sidebar_position: 14
---

# Observability

## Langfuse Integration

Enable tracing by setting environment variables:

```bash
export LANGFUSE_ENABLED=true
export LANGFUSE_PUBLIC_KEY=pk-xxx
export LANGFUSE_SECRET_KEY=sk-xxx
export LANGFUSE_HOST=https://cloud.langfuse.com
```

## Session Management

```python
# Create agent with session tracking
agent = LangGraphAgent(
    agent_name="my_agent",
    agent_config=config,
    session_id="user-session-123",
    user_id="user-456"
)
```
