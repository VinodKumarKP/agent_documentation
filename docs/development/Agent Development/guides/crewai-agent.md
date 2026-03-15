---
sidebar_position: 1
sidebar_label: "🤖 CrewAI Agent"
---

# CrewAI Agent Guide

This guide walks you through creating an agent using the **CrewAI Multi-Agent Framework**. This framework allows you to build sophisticated agent orchestrations using CrewAI and LangChain.

## Prerequisites

- Python 3.11+
- `oai-crewai-agent-core` package installed
- Relevant API Keys (OpenAI, Anthropic, AWS, etc.)

## 1. Installation

Ensure you have the necessary package installed:

```bash
pip install oai-crewai-agent-core
```

## 2. Configuration

Create a YAML configuration file (e.g., `agents/agents_config/my_crewai_agent.yaml`) in your agent repository.

### Basic Structure (Sequential Process)

```yaml
model:
  model_id: gpt-4o
  cloud_provider: openai

tools:
  calculator:
    module: langchain_community.tools
    class: Calculator

agent_list:
  - researcher:
      role: "Researcher"
      goal: "Research topics and gather information."
      backstory: "You are an expert researcher."
      tools:
        - calculator
  - analyst:
      role: "Analyst"
      goal: "Analyze information and identify key insights."
      backstory: "You are a data analyst."

task_list:
  - research_task:
      description: "Research the latest trends in {topic}."
      expected_output: "A summary of trends."
      agent: researcher
  - analysis_task:
      description: "Analyze the research findings."
      expected_output: "An analysis report."
      agent: analyst
      context:
        - research_task

crew_config:
  process: sequential
```

## 3. Implementation

Create your agent class in `agents/my_crewai_agent/agent.py`.

```python
from oai_crewai_agent_core.agents.crewai_agent import CrewAIAgent
import os
import yaml

class MyCrewAIAgent(CrewAIAgent):
    def __init__(self):
        # Load configuration
        config_path = os.path.join(
            os.path.dirname(os.path.dirname(__file__)),
            "agents_config",
            "my_crewai_agent.yaml"
        )
        with open(config_path, "r") as f:
            config = yaml.safe_load(f)
            
        super().__init__(
            agent_name="my_crewai_agent",
            agent_config=config
        )
```

## 4. Server Setup

Create the server entry point in `agents/my_crewai_agent/server.py`.

```python
from oai_agent_server.server import AgentServer
from .agent import MyCrewAIAgent

if __name__ == "__main__":
    server = AgentServer(agent_class=MyCrewAIAgent)
    server.run()
```

## Key Features

- **Orchestration Patterns**: Supports `sequential` and `hierarchical` processes.
- **Tools**: Easily integrate LangChain tools, custom tools, and MCP servers.
- **Knowledge Base**: Built-in RAG support with Chroma, Postgres, or S3.
- **Memory**: Persistent conversation memory.

## Next Steps

- **Add Tasks**: Define tasks in the `task_list` section to guide your agents.
- **Configure Tools**: Add specific tools to agents to give them capabilities.
- **Test**: Run your server and test with Postman or the Agent Evaluator.

For detailed configuration options, refer to the [CrewAI Framework Documentation](../../../agent-frameworks/crewai/overview.md).
