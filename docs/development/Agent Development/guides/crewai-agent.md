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

## Project Setup (Recommended)

The easiest way to get started is using the `oai-gen` CLI tool to scaffold your project:

```bash
oai-gen new agent my_crewai_agent
```

When prompted, select **CrewAI** as your framework. The generator will set up the complete project structure, including the configuration, agent class, and server entry point described below.

### Generated Project Structure

When you use the `oai-gen` tool, it generates a standardized, production-ready directory structure. This ensures consistency and makes it easy to locate and manage different parts of your agent.

```text
ptr_agent_servers_my_crewai_agent/
├── agentic_registry_agents/
│   ├── agents/
│   │   └── my_crewai_agent/
│   │       ├── agent.py
│   │       └── server.py
│   ├── agents_config/
│   │   └── my_crewai_agent.yaml      # Full configuration (Model, Tools, KB, etc.)
│   └── utils/
│       └── my_crewai_agent_utils.py  # Scaffolded tool functions
├── .gitignore
├── docker-compose.yaml          # Docker Compose file for containerization
├── Makefile
├── Dockerfile
├── pyproject.toml               # Project metadata and dependencies
├── README.md
└── tests/                       # Unit and integration tests
```

#### Key Directories and Files

-   **`ptr_agent_servers_{agent_name}/`**: The main source code directory for your agent package.
-   **`agents/my_crewai_agent/agent.py`**: This is where the core `CrewAIAgent` class is instantiated. You typically don't need to modify this file unless you are customizing the agent's fundamental behavior.
-   **`agents/my_crewai_agent/server.py`**: A pre-configured FastAPI server that exposes your agent's endpoints, enabling it to be used as a microservice.
-   **`agents_config/my_crewai_agent.yaml`**: The heart of your project. This YAML file is where you define everything about your agent—its model, tools, knowledge base, memory, and orchestration patterns.
-   **`global_config/`**: Contains default model parameters for different cloud providers. The settings here are automatically merged with your agent's configuration.
-   **`utils/my_crewai_agent_utils.py`**: If you define custom tools, this is where you'll write the Python functions that implement their logic.
-   **`pyproject.toml`**: Managed by Poetry, this file lists all project dependencies. The generator automatically adds the required packages based on your framework and feature selections.
-   **`docker-compose.yaml`**: Allows you to run your agent and any dependent services (like a Postgres database for memory) in containers.

---

*If you prefer to set up manually, follow the steps below.*

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
