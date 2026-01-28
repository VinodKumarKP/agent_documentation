---
sidebar_position: 6
---

# Orchestration Patterns

## 1. Single Agent

**When to use:** Simple tasks requiring one specialized agent.

```yaml
agent_list:
  - researcher:
      system_prompt: You are a helpful research assistant.
      tools:
        - web_search
```

## 2. Multi-Agent Supervisor

**When to use:** Complex workflows where a supervisor delegates tasks to specialized workers. The supervisor maintains the state and decides the next step.

```yaml
crew_config:
  pattern: supervisor

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

## 3. Multi-Agent Swarm

**When to use:** Decentralized workflows where agents hand off tasks to each other directly. There is no central supervisor.

```yaml
crew_config:
  pattern: swarm

agent_list:
  - triage_agent:
      system_prompt: You are the first point of contact. Route the user to the correct specialist.
  - sales_agent:
      system_prompt: You handle sales inquiries.
  - support_agent:
      system_prompt: You handle technical support issues.
```

**Flow:**
```
User Input → Triage Agent → (Handoff) → Sales Agent → (Response) → User
```

## 4. Agent as Tool

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
