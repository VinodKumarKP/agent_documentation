---
sidebar_position: 10
sidebar_label: "🧩 Dynamic Inputs"
---

# Dynamic Input Variables

## Variable Syntax

Use `{variable_name}` in task descriptions:

```yaml
task_list:
  - research_task:
      description: Research the topic: {topic}
      expected_output: A summary of {topic}.
      agent: researcher
```

## Providing Inputs

**Method 1: Configuration Object**
```python
result = await agent.ainvoke(
    "Research quantum computing",
    config={
        'inputs': {
            'topic': 'Quantum Computing'
        }
    }
)
```

**Method 2: Simple Message**
```python
# System auto-detects and maps variables
result = await agent.ainvoke("Quantum Computing")
```
