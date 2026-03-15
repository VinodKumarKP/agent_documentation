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
      description: "Research the topic: {topic}"
      expected_output: "A summary of {topic}."
      agent: "researcher"
```

## Providing Inputs

Pass the variables as a dictionary when you invoke the agent.

```python
result = await agent.ainvoke(
    {"topic": "Quantum Computing"}
)
```
