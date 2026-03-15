---
sidebar_position: 11
sidebar_label: "💡 Usage Examples"
---

# Usage Examples

## Example 1: Simple Research Agent

```yaml
model:
  model_id: gpt-4o
  cloud_provider: openai

agent_list:
  - researcher:
      role: "Researcher"
      goal: "Research topics"
      backstory: "Expert researcher"

task_list:
  - research_task:
      description: "Research the topic: {topic}"
      expected_output: "A summary of the topic."
      agent: "researcher"
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
      role: "Researcher"
      goal: "Find information"
      backstory: "Expert researcher"
      tools: [search]
  
  - writer:
      role: "Writer"
      goal: "Write articles"
      backstory: "Expert writer"

task_list:
  - research:
      description: "Research {topic}"
      expected_output: "Research notes"
      agent: "researcher"
  - write:
      description: "Write an engaging article about {topic} based on the research."
      expected_output: "A 500-word article."
      agent: "writer"
      context: [research]

crew_config:
  process: sequential
```
