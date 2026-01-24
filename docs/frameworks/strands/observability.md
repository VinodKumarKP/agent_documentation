---
sidebar_position: 13
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
agent = StrandsAgent(
    agent_name="my_agent",
    agent_config=config,
    session_id="user-session-123",
    user_id="user-456"
)

# Output is automatically tracked per session
result = await agent.ainvoke("Query")
```

## Session Output Files

Session outputs are automatically saved to:
```
output/{session_id}/output.jsonl
```

Each line contains:
```json
{
  "agent": "researcher",
  "type": "text_delta",
  "content": "Research findings...",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

## Agent Information

Get detailed agent information:

```python
info = agent.get_agent_info()
print(info)
```

Output:
```python
{
    'agent_name': 'research_crew',
    'session_id': 'session-123',
    'initialized': True,
    'has_observability': True,
    'region': 'us-west-2',
    'model_info': {
        'model_id': 'us.anthropic.claude-sonnet-4-20250514-v1:0',
        'region': 'us-west-2'
    },
    'orchestration': {
        'pattern': 'graph',
        'agent_count': 3,
        'entry_agent': 'researcher'
    },
    'config_summary': {
        'agent_count': 3,
        'tool_count': 1,
        'agents': ['researcher', 'analyst', 'writer'],
        'tools': ['calculator']
    }
}
```
