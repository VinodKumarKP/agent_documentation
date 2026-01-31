---
sidebar_position: 6
sidebar_label: "🤖 Agents Configuration"
---
# Agents Configuration

## Agent Properties

```yaml
agent_list:
  - agent_key:
      system_prompt: "Detailed instructions"  # Required
      tools: [tool_name]  # Optional: tools available to agent
      mcps: # Optional: Agent specific MCP servers
         server_name: ...
```

## System Prompt Best Practices

```yaml
# ✅ Good - Clear role and instructions
system_prompt: |
  You are a research analyst who gathers information from reliable sources.
  
  Your responsibilities:
  - Search for relevant information on the given topic
  - Verify source credibility
  - Summarize key findings

# ❌ Bad - Vague instructions
system_prompt: You help with research.
```
