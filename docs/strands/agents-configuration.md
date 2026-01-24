---
sidebar_position: 6
---

# Agents Configuration

## Agent Properties

```yaml
agent_list:
  - agent_key:
      system_prompt: "Detailed instructions"  # Required
      context: [other_agent]  # Optional: which agents this agent can see
      tools: [tool_name]  # Optional: tools available to agent
```

## Context Mechanism

The `context` field defines which agents an agent can "see" and receive outputs from:

```yaml
agent_list:
  - researcher:
      system_prompt: You research topics.
      # No context - starts fresh
  
  - analyst:
      system_prompt: You analyze research findings.
      context:
        - researcher  # Can see researcher's output
  
  - writer:
      system_prompt: You write final reports.
      context:
        - researcher  # Can see both outputs
        - analyst
```

## System Prompt Best Practices

```yaml
# ✅ Good - Clear role and handoff instructions
system_prompt: |
  You are a research analyst who gathers information from reliable sources.
  
  Your responsibilities:
  - Search for relevant information on the given topic
  - Verify source credibility
  - Summarize key findings
  
  When you have gathered sufficient information, hand off to the analyst
  for deeper analysis.

# ❌ Bad - Vague instructions
system_prompt: You help with research.
```
