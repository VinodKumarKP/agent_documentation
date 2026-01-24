---
sidebar_position: 12
---

# Usage Examples

## Example 1: Simple Research Agent

```yaml
model:
  model_id: gpt-4o
  cloud_provider: openai

agent_list:
  - research_agent:
      system_prompt: You help with researching on a topic.
```

## Example 2: Multi-Agent Research Team

```yaml
model:
  model_id: gpt-4o
  cloud_provider: openai

tools:
  search:
    module: langchain_community.tools
    class: DuckDuckGoSearchRun

agent_list:
  - researcher:
      system_prompt: You research topics using the search tool.
      tools:
        - search
  
  - writer:
      system_prompt: You write engaging articles based on provided research.

system_prompt: You are an editor. Coordinate the research and writing process.
```
