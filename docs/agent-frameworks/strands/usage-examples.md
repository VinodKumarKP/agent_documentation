---
sidebar_position: 11
sidebar_label: "💡 Usage Examples"
---

# Usage Examples

## Example 1: Simple Research Agent

```yaml
model:
  model_id: us.anthropic.claude-sonnet-4-20250514-v1:0
  region_name: us-west-2

agent_list:
  - research_agent:
      system_prompt: You help with researching on a topic.

crew_config:
  pattern: sequential
```

**Usage:**
```python
agent = StrandsAgent(
    agent_name="research_agent",
    agent_config=config
)
await agent.initialize()
result = await agent.ainvoke("Tell me about AI trends")
```

## Example 2: Multi-Agent Research Pipeline

```yaml
model:
  model_id: us.anthropic.claude-sonnet-4-20250514-v1:0
  region_name: us-west-2

tools:
  calculator:
    module: strands_tools

agent_list:
  - researcher:
      system_prompt: |
        You research topics and gather information.
        Hand off to analyst when you have findings.
  
  - analyst:
      system_prompt: |
        You analyze information and identify key insights.
        Hand off to writer for final output.
      context:
        - researcher
  
  - writer:
      system_prompt: |
        You write clear, engaging summaries of analyzed information.
      context:
        - researcher
        - analyst

crew_config:
  pattern: graph
  entry_agent: researcher
  verbose: true
```

## Example 3: Tool-Enabled Assistant

```yaml
model:
  model_id: us.anthropic.claude-sonnet-4-20250514-v1:0
  region_name: us-west-2

tools:
  random_generator:
    module: random_generator
    base_path: ./../utils
  calculator:
    module: strands_tools
    class: calculator
  current_time:
    module: strands_tools
    class: current_time

agent_list:
  - assistant:
      system_prompt: |
        You are a helpful assistant that can do math, tell time,
        and generate random numbers.
      tools:
        - random_generator
        - calculator
        - current_time

crew_config:
  pattern: sequential
```
