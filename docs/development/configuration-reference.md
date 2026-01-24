---
sidebar_position: 9
---

# Configuration Quick Reference

## Common Fields (All Agent Types)

```yaml
name: Display Name
description: Brief description
type: langgraph|strands|crewai|custom
cloud_provider: aws|openai|anthropic
port: 8XXX  # Unique port > 8000
tags:
  - tag1
  - tag2
environment:
  - KEY:value
```

## Type-Specific Fields

**LangGraph Agent:**
```yaml
model:
  model_id: ...
  cloud_provider: ...
agent_list:
  - agent_name:
      system_prompt: ...
      tools: [...]
system_prompt: ...
```

**AWS Strands Agent:**
```yaml
model:
  model_id: ...
  region_name: ...
crew_config:
  pattern: graph|swarm|sequential|agents_as_tools
  entry_agent: ...
agent_list:
  - agent_name:
      system_prompt: ...
      context: [...]
```

**CrewAI Agent:**
```yaml
model:
  model_id: ...
  cloud_provider: ...
agent_list:
  - agent_name:
      role: ...
      goal: ...
      backstory: ...
      tasks: [...]
crew_config:
  process: sequential|hierarchical
```
