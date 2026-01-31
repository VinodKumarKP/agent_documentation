---
sidebar_position: 5
sidebar_label: "🔄 Orchestration Patterns"
---

# Orchestration Patterns

## 1. Sequential Process

**When to use:** Tasks need to be executed in a specific order.

```yaml
crew_config:
  process: sequential
```

## 2. Hierarchical Process

**When to use:** A manager agent delegates tasks to other agents.

```yaml
crew_config:
  process: hierarchical
  manager_llm: gpt-4o
```
