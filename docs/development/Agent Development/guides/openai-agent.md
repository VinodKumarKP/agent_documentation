---
sidebar_position: 2
sidebar_label: "🤖 OpenAI Agent"
---

# OpenAI Agent Guide

This guide walks you through creating an agent using the **OpenAI Multi-Agent Framework**. This framework allows you to build sophisticated agent orchestrations using OpenAI's models through simple YAML configuration files.

## Prerequisites

- Python 3.11+
- `openai-agents` package installed
- OpenAI API Key

## Project Setup (Recommended)

The easiest way to get started is using the `oai-gen` CLI tool to scaffold your project:

```bash
oai-gen new agent my_openai_agent
```

When prompted, select **OpenAI** as your framework. The generator will set up the complete project structure, including the configuration, agent class, and server entry point described below.

For more detailed information on using the generator and the options available, see the [Template Generator Guide](../../Template%20Generator/overview.md).

### Generated Project Structure

When you use the `oai-gen` tool, it generates a standardized, production-ready directory structure. This ensures consistency and makes it easy to locate and manage different parts of your agent.

```text
ptr_agent_servers_my_openai_agent/
├── agentic_registry_agents/
│   ├── agents/
│   │   └── my_openai_agent/
│   │       ├── agent.py
│   │       └── server.py
│   ├── agents_config/
│   │   └── my_openai_agent.yaml      # Full configuration (Model, Tools, KB, etc.)
│   └── utils/
│       └── my_openai_agent_utils.py  # Scaffolded tool functions
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
-   **`agents/my_openai_agent/agent.py`**: This is where the core `OpenAIAgent` class is instantiated. You typically don't need to modify this file unless you are customizing the agent's fundamental behavior.
-   **`agents/my_openai_agent/server.py`**: A pre-configured FastAPI server that exposes your agent's endpoints, enabling it to be used as a microservice.
-   **`agents_config/my_openai_agent.yaml`**: The heart of your project. This YAML file is where you define everything about your agent—its model, tools, knowledge base, memory, and orchestration patterns.
-   **`global_config/`**: Contains default model parameters for different cloud providers. The settings here are automatically merged with your agent's configuration.
-   **`utils/my_openai_agent_utils.py`**: If you define custom tools, this is where you'll write the Python functions that implement their logic.
-   **`pyproject.toml`**: Managed by Poetry, this file lists all project dependencies. The generator automatically adds the required packages based on your framework and feature selections.
-   **`docker-compose.yaml`**: Allows you to run your agent and any dependent services (like a Postgres database for memory) in containers.

---

*If you prefer to set up manually, follow the steps below.*

## 1. Installation

Ensure you have the necessary package installed:

```bash
pip install openai-agents
```

## 2. Configuration

Create a YAML configuration file (e.g., `agents/agents_config/my_openai_agent.yaml`) in your agent repository.

### Basic Structure

```yaml
model:
  model_id: gpt-4o
  cloud_provider: openai

agent_list:
  - assistant:
      system_prompt: You are a helpful assistant.
```

### Multi-Agent Example (Supervisor Pattern)

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
  pattern: supervisor
  verbose: true
```

## 3. Implementation

Create your agent class in `agents/my_openai_agent/agent.py`.

```python
from oai_openai_agent_core.agents.openai_agent import OpenAIAgent
import os
import yaml

class MyOpenAIAgent(OpenAIAgent):
    def __init__(self):
        # Load configuration
        config_path = os.path.join(
            os.path.dirname(os.path.dirname(__file__)),
            "agents_config",
            "my_openai_agent.yaml"
        )
        with open(config_path, "r") as f:
            config = yaml.safe_load(f)
            
        super().__init__(
            agent_name="my_openai_agent",
            agent_config=config
        )
```

## 4. Server Setup

Create the server entry point in `agents/my_openai_agent/server.py`.

```python
from oai_agent_server.server import AgentServer
from .agent import MyOpenAIAgent

if __name__ == "__main__":
    server = AgentServer(agent_class=MyOpenAIAgent)
    server.run()
```

## Key Features

- **Orchestration Patterns**: Supports `supervisor`, `handoff`, `agent-as-tool`, and `single` agent patterns.
- **Tools**: Easily integrate Python functions and MCP servers.
- **Knowledge Base**: Built-in RAG support.
- **Memory**: Persistent conversation memory.

## Next Steps

- **Add Tools**: Define tools in the `tools` section of your YAML.
- **Configure Knowledge Base**: Add a `knowledge_base` section to connect to your documents.
- **Test**: Run your server and test with Postman or the Agent Evaluator.

For detailed configuration options, refer to the [OpenAI Framework Documentation](../../../agent-frameworks/openai/overview.md).
