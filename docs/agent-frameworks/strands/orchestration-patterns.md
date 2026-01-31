---
sidebar_position: 5
sidebar_label: "🔄 Orchestration Patterns"
---

# Orchestration Patterns

AWS Strands supports multiple orchestration patterns for different use cases:

## 1. Graph Pattern

**When to use:** Agents need to autonomously decide which agent to hand off to based on context.

```yaml
crew_config:
  pattern: graph
  entry_agent: researcher
  verbose: true

agent_list:
  - researcher:
      system_prompt: You research topics. Hand off to analyst when you have findings.
  - analyst:
      system_prompt: You analyze data. Hand off to writer for final output.
      context:
        - researcher
  - writer:
      system_prompt: You write summaries.
      context:
        - researcher
        - analyst
```

**Flow:**
```
User Input → Researcher → Analyst → Writer → Final Output
            ↑____________↓
        (Can hand back if needed)
```

**Advantages:**
- Autonomous decision-making
- Dynamic collaboration
- Flexible handoffs
- Context-aware routing

## 2. Swarm Pattern

**When to use:** Similar to Graph but with different execution characteristics.

```yaml
crew_config:
  pattern: swarm
  entry_agent: coordinator
  verbose: true

agent_list:
  - coordinator:
      system_prompt: You coordinate tasks and delegate to specialists.
  - specialist_a:
      system_prompt: You handle type A tasks.
      context:
        - coordinator
  - specialist_b:
      system_prompt: You handle type B tasks.
      context:
        - coordinator
```

**Advantages:**
- Parallel processing capabilities
- Coordinator-worker pattern
- Efficient resource utilization

## 3. Sequential Pattern

**When to use:** Simple linear workflows where each agent processes in order.

```yaml
crew_config:
  pattern: sequential

agent_list:
  - assistant:
      system_prompt: You are a helpful assistant.
      tools:
        - calculator
        - current_time
```

**Advantages:**
- Simple and predictable
- Easy to debug
- Good for single-agent systems

## 4. Agents-as-Tools Pattern

**When to use:** One agent coordinates by using other agents as tools.

```yaml
crew_config:
  pattern: agents_as_tools
```

**Advantages:**
- Clear hierarchy
- Tool-like agent invocation
- Centralized coordination

## Pattern Comparison

| Pattern | Complexity | Autonomy | Best For |
|---------|-----------|----------|----------|
| Graph | High | High | Complex multi-agent collaboration |
| Swarm | Medium | Medium | Coordinator-worker systems |
| Sequential | Low | Low | Simple linear workflows |
| Agents-as-Tools | Medium | Medium | Hierarchical systems |
