---
sidebar_position: 2
---
# Quick Start

## 1. Installation

```bash
pip install openai-agents
```

## 2. Create Your Configuration File

Create a YAML file (e.g., `research_agent.yaml`):

```yaml
model:
  model_id: gpt-4o
  cloud_provider: openai

tools:
  calculator:
    module: strands_tools

agent_list:
  - researcher:
      system_prompt: You research topics and gather information. Hand off to analyst when you have findings.
  - analyst:
      system_prompt: You analyze information and identify key insights. Hand off to writer for final output.
      context:
        - researcher
  - writer:
      system_prompt: You write clear, engaging summaries of analyzed information.
      context:
        - researcher
        - analyst

crew_config:
  pattern: supervisor  # Agents are coordinated by a supervisor
  verbose: true
```

## 3. Initialize and Run

```python
from oai_openai_agent_core.agents.openai_agent import OpenAIAgent
import yaml
import asyncio

async def main():
    # Load configuration
    with open("research_agent.yaml", "r") as f:
        config = yaml.safe_load(f)

    agent = OpenAIAgent(
        agent_name="research_crew",
        agent_config=config
    )

    # Initialize
    await agent.initialize()

    # Execute
    result = await agent.ainvoke("Research the latest trends in quantum computing")
    print(result)

if __name__ == "__main__":
    asyncio.run(main())
```
