---
sidebar_position: 13
sidebar_label: "⚡ Streaming"
---

# Streaming Support

## Async Streaming

```python
async for chunk in agent.astream("Research quantum computing"):
    if 'content' in chunk:
        print(chunk['content'], end='', flush=True)
```
