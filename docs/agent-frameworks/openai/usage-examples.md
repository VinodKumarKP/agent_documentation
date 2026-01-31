---
sidebar_position: 12
sidebar_label: "💡 Usage Examples"
---
# Usage Examples

## Example 1: Simple Assistant

```yaml
model:
  model_id: gpt-4o
  cloud_provider: openai

agent_list:
  - assistant:
      system_prompt: You are a helpful assistant.
```

## Example 2: Multi-Agent Research Team

```yaml
model:
  model_id: gpt-4o
  cloud_provider: openai

agent_list:
  - researcher:
      system_prompt: Research topics and hand off to writer.
  - writer:
      system_prompt: Write summaries based on research.

crew_config:
  pattern: handoff
```
