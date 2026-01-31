---
sidebar_position: 13
sidebar_label: "⚡ Streaming"
---
# Streaming Support

## Async Streaming

```python
async for chunk in agent.astream("Research quantum computing"):
    if chunk.get('type') == 'text':
        print(chunk['content'], end='', flush=True)
    elif chunk.get('type') == 'tool_call_item':
        print(f"\n[Tool Call: {chunk['content']}]")
```
