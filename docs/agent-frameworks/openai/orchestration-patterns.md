---
sidebar_position: 5
sidebar_label: "🔄 Orchestration Patterns"
---
# Orchestration Patterns

The framework supports multiple orchestration patterns for different use cases:

## 1. Multi-Agent Supervisor

**When to use:** A central supervisor agent delegates tasks to specialized sub-agents. The supervisor maintains the state and decides the next step.

```yaml
crew_config:
  pattern: supervisor
  verbose: true

system_prompt: You are a supervisor. Delegate tasks to the appropriate worker.

agent_list:
  - researcher:
      system_prompt: You research topics.
  - writer:
      system_prompt: You write summaries based on research.
```

**Flow:**
```
User Input → Supervisor → (Delegates) → Worker Agent → (Returns) → Supervisor → Final Output
```

## 2. Handoff Pattern

**When to use:** Agents autonomously hand off tasks to one another. There is no central supervisor.

```yaml
crew_config:
  pattern: handoff
  verbose: true

agent_list:
  - researcher:
      system_prompt: You research topics. Hand off to writer when done.
  - writer:
      system_prompt: You write summaries.
```

**Flow:**
```
User Input → Researcher → Writer → Final Output
```

## 3. Agent as Tool

**When to use:** When you want a main agent to treat other specialized agents as tools. The main agent calls the sub-agent, waits for the result, and then continues.

```yaml
crew_config:
  pattern: agent-as-tool

system_prompt: You are a helpful assistant. Use the specialized agents as tools to answer questions.

agent_list:
  - math_expert:
      system_prompt: You solve math problems.
      description: "Agent useful for solving math problems"
  - physics_expert:
      system_prompt: You explain physics concepts.
      description: "Agent useful for physics questions"
```

**Flow:**
```
User Input → Main Agent → (Calls Tool) → Sub-Agent → (Returns Result) → Main Agent → Final Output
```

## 4. Single Agent

**When to use:** Simple workflows handled by one agent.

```yaml
# No crew_config needed or pattern: single
agent_list:
  - assistant:
      system_prompt: You are a helpful assistant.
```
