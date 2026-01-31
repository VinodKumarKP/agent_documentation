---
sidebar_position: 11
---
# Dynamic Input Variables

## Variable Syntax

Use `{variable_name}` in system prompts:

```yaml
agent_list:
  - researcher:
      system_prompt: |
        Research the topic: {topic}
        Focus on {aspect} in the {industry} industry.
```

## Providing Inputs

```python
result = await agent.ainvoke(
    "Research quantum computing",
    config={
        'inputs': {
            'topic': 'Quantum Computing',
            'aspect': 'commercial applications',
            'industry': 'finance'
        }
    }
)
```
