---
sidebar_position: 12
---

# Streaming Support

## Async Streaming

```python
async for chunk in agent.astream("Research quantum computing"):
    if chunk.get('type') == 'text_delta':
        print(chunk['content'], end='', flush=True)
    elif chunk.get('type') == 'agent_complete':
        print(f"\n[{chunk['agent']} completed]")
    elif chunk.get('type') == 'handoff':
        print(f"\n{chunk['content']}")
```

## Stream Event Types

- `text_delta`: Incremental text output
- `agent_complete`: Agent finished its task
- `handoff`: Task handed off to another agent
- `tool_use`: Tool invocation
- `status`: Status updates

## Multi-Agent Streaming

For graph and swarm patterns, streaming provides visibility into agent handoffs:

```python
async for event in agent.astream("Analyze market trends"):
    if event.get('type') == 'handoff':
        print(f"Handoff: {event['content']}")
    elif event.get('type') == 'agent_complete':
        agent_name = event.get('agent')
        output = event.get('content')
        print(f"\n{agent_name} output:\n{output}\n")
```
