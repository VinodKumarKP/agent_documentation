---
sidebar_position: 12
sidebar_label: "⚡ Streaming"
---

# Streaming Support

## Async Streaming

```python
async for chunk in agent.astream({"topic": "Quantum Computing"}):
    if 'content' in chunk:
        print(chunk['content'], end='', flush=True)
```
