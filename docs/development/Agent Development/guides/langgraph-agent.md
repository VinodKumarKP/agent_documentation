---
sidebar_position: 4
sidebar_label: "🦜 LangGraph Agent"
---

# LangGraph Agent Guide

This guide walks you through creating an agent using the **LangGraph Multi-Agent Framework**. This framework allows you to build sophisticated agent orchestrations using LangGraph and LangChain through simple YAML configuration files.

## Prerequisites

- Python 3.11+
- `oai-langgraph-agent-core` package installed
- Relevant API Keys (OpenAI, Anthropic, AWS, etc.)

## Project Setup (Recommended)

The easiest way to get started is using the `oai-gen` CLI tool to scaffold your project:

```bash
oai-gen new agent my_langgraph_agent
```

When prompted, select **LangGraph** as your framework. The generator will set up the complete project structure, including the configuration, agent class, and server entry point described below.

For more detailed information on using the generator and the options available, see the [Template Generator Guide](../../Template%20Generator/overview.md).

### Generated Project Structure

When you use the `oai-gen` tool, it generates a standardized, production-ready directory structure. This ensures consistency and makes it easy to locate and manage different parts of your agent.

```text
ptr_agent_servers_my_langgraph_agent/
├── agentic_registry_agents/
│   ├── agents/
│   │   └── my_langgraph_agent/
│   │       ├── agent.py
│   │       └── server.py
│   ├── agents_config/
│   │   └── my_langgraph_agent.yaml      # Full configuration (Model, Tools, KB, etc.)
│   └── utils/
│       └── my_langgraph_agent_utils.py  # Scaffolded tool functions
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
-   **`agents/my_langgraph_agent/agent.py`**: This is where the core `LangGraphAgent` class is instantiated. You typically don't need to modify this file unless you are customizing the agent's fundamental behavior.
-   **`agents/my_langgraph_agent/server.py`**: A pre-configured FastAPI server that exposes your agent's endpoints, enabling it to be used as a microservice.
-   **`agents_config/my_langgraph_agent.yaml`**: The heart of your project. This YAML file is where you define everything about your agent—its model, tools, knowledge base, memory, and orchestration patterns.
-   **`global_config/`**: Contains default model parameters for different cloud providers. The settings here are automatically merged with your agent's configuration.
-   **`utils/my_langgraph_agent_utils.py`**: If you define custom tools, this is where you'll write the Python functions that implement their logic.
-   **`pyproject.toml`**: Managed by Poetry, this file lists all project dependencies. The generator automatically adds the required packages based on your framework and feature selections.
-   **`docker-compose.yaml`**: Allows you to run your agent and any dependent services (like a Postgres database for memory) in containers.

---

*If you prefer to set up manually, follow the steps below.*

## 1. Installation

Ensure you have the necessary package installed:

```bash
pip install oai-langgraph-agent-core
```

## 2. Configuration

Create a YAML configuration file (e.g., `agents/agents_config/my_langgraph_agent.yaml`) in your agent repository.

### Basic Structure (Supervisor Pattern)

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
      system_prompt: You research topics and gather information. Hand off to analyst when you have findings.
      tools:
        - calculator
  - analyst:
      system_prompt: You analyze information and identify key insights. Hand off to writer for final output.
      context:
        - researcher
  - writer:
      system_prompt: You write clear, engaging summaries of analyzed information.
      context:
        - researcher
        - analyst

system_prompt: You are a supervisor managing a team of agents.

crew_config:
  pattern: supervisor
```

## 3. Implementation

Create your agent class in `agents/my_langgraph_agent/agent.py`.

```python
from oai_langgraph_agent_core.agents.langgraph_agent import LangGraphAgent
import os
import yaml

class MyLangGraphAgent(LangGraphAgent):
    def __init__(self):
        # Load configuration
        config_path = os.path.join(
            os.path.dirname(os.path.dirname(__file__)),
            "agents_config",
            "my_langgraph_agent.yaml"
        )
        with open(config_path, "r") as f:
            config = yaml.safe_load(f)
            
        super().__init__(
            agent_name="my_langgraph_agent",
            agent_config=config
        )
```

## 4. Server Setup

Create the server entry point in `agents/my_langgraph_agent/server.py`.

```python
from oai_agent_server.server import AgentServer
from .agent import MyLangGraphAgent

if __name__ == "__main__":
    server = AgentServer(agent_class=MyLangGraphAgent)
    server.run()
```

## Key Features

- **Orchestration Patterns**: Supports `single`, `supervisor`, `swarm`, and `agent-as-tool`.
- **Tools**: Easily integrate LangChain tools, custom tools, and MCP servers.
- **Knowledge Base**: Built-in RAG support with Chroma, Postgres, or S3.
- **Memory**: Persistent conversation memory.

## Next Steps

- **Add Tools**: Define tools in the `tools` section to give your agents capabilities.
- **Test**: Run your server and test with Postman or the Agent Evaluator.

For detailed configuration options, refer to the [LangGraph Framework Documentation](../../../agent-frameworks/langgraph/overview.md).
