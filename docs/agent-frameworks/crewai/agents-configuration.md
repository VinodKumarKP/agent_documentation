---
sidebar_position: 6
sidebar_label: "🤖 Agents Configuration"
---

# Agents and Tasks

In CrewAI, the system is defined by **Agents** (the workers) and **Tasks** (the work to be done).

## Agent Properties

Each agent is defined by its role, goal, and backstory, which helps the LLM understand its purpose.

```yaml
agent_list:
  - researcher:
      role: "Expert Research Analyst"
      goal: "Uncover cutting-edge developments in AI and data science."
      backstory: "You are a renowned researcher with a knack for finding hidden gems of information."
      tools: [web_search] # Assign specific tools to this agent.
```

## Task Properties

Each task defines a unit of work, what is expected as an output, and which agent should perform it.

```yaml
task_list:
  - research_task:
      description: "Investigate the latest advancements in AI for financial forecasting."
      expected_output: "A comprehensive report with at least 5 key findings and their potential impact."
      agent: "researcher"
      context: [] # This task has no dependencies.

  - writing_task:
      description: "Write a blog post based on the research findings."
      expected_output: "An engaging 500-word blog post."
      agent: "writer"
      context: [research_task] # This task depends on the output of the research_task.
```
