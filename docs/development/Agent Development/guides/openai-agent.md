---
sidebar_position: 5
---

# OpenAI Agent Development

This guide will help you get up and running with the OpenAI Multi-Agent Framework in minutes.

## Prerequisites

- Python 3.10 or higher
- Basic understanding of YAML

## Installation

Install the package using pip:

```bash
pip install git+https://github.com/Capgemini-Innersource/ptr_oai_openai_agent_core@main
```

## Your First Agent

Let's build a simple research agent that can search the web (simulated) and summarize findings.

### 1. Create the Configuration

Create a file named `research_agent.yaml`:

```yaml
model:
  model_id: gpt-4o
  cloud_provider: openai

# Define a simple tool (optional)
tools:
  calculator:
    module: math
    function_list:
      - sqrt

agent_list:
  - researcher:
      system_prompt: |
        You are a helpful research assistant. 
        Your goal is to answer the user's questions clearly and concisely.
        If you need to perform calculations, use the available tools.

crew_config:
  pattern: single
  verbose: true
```

### 2. Run the Agent

Create a Python script `run_agent.py`:

```python
import asyncio
import yaml
import os
from oai_openai_agent_core.agents.openai_agent import OpenAIAgent

# Set your OpenAI API Key
os.environ["OPENAI_API_KEY"] = "your-api-key-here"

async def main():
    # Load the configuration
    with open("research_agent.yaml", "r") as f:
        config = yaml.safe_load(f)

    # Initialize the agent
    agent = OpenAIAgent(
        agent_name="my_researcher",
        agent_config=config
    )
    await agent.initialize()

    # Run the agent
    response = await agent.ainvoke("What is the square root of 144?")
    print(f"Agent Response: {response['output']}")

if __name__ == "__main__":
    asyncio.run(main())
```

### 3. Execute

Run your script:

```bash
python run_agent.py
```

You should see output similar to:
```
Agent Response: The square root of 144 is 12.
```

## Building a Multi-Agent Team

Now let's create a more complex system with two agents: a **Researcher** and a **Writer**, using the **Handoff** pattern.

### 1. Update Configuration

Modify `research_agent.yaml`:

```yaml
model:
  model_id: gpt-4o
  cloud_provider: openai

agent_list:
  - researcher:
      system_prompt: |
        You are a researcher. Your job is to gather information on the topic provided by the user.
        Once you have enough information, hand off the task to the 'writer' agent.
        Do not write the final summary yourself.
  
  - writer:
      system_prompt: |
        You are a professional writer. 
        Receive the research data from the researcher and write a concise, engaging summary.
        This is the final output.

crew_config:
  pattern: handoff
  verbose: true
```

### 2. Run the Team

Use the same Python script as before, but change the prompt:

```python
    # ... inside main() ...
    response = await agent.ainvoke("Research the benefits of green tea and write a short blog post.")
    print(f"Final Output:\n{response['output']}")
```

### What Happened?

1. The **Researcher** agent received the request.
2. It simulated research (using its internal knowledge).
3. It recognized it needed to pass the info to the **Writer**.
4. The **Writer** received the context, wrote the blog post, and returned the final result.

## Next Steps

- **[Explore Orchestration Patterns](../../../agent-frameworks/openai/orchestration-patterns)**: Learn about Supervisor and Agent-as-Tool patterns.
- **[Add Tools](../../../agent-frameworks/openai/tools-system)**: Give your agents real capabilities like web search or database access.
- **[Configure Memory](../../../agent-frameworks/openai/memory-management)**: Enable long-term memory for your agents.
