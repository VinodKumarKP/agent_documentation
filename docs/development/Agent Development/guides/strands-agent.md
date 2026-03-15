---
sidebar_position: 3
sidebar_label: "☁️ AWS Strands Agent"
---

# AWS Strands Agent Guide

This guide walks you through creating an agent using the **AWS Strands Multi-Agent Framework**. This framework allows you to build sophisticated agent orchestrations on AWS Bedrock using simple YAML configuration files.

## Prerequisites

- Python 3.11+
- `strands-agents` and `strands-agents-tools` packages installed
- AWS Credentials configured with access to Bedrock

## Project Setup (Recommended)

The easiest way to get started is using the `oai-gen` CLI tool to scaffold your project:

```bash
oai-gen new agent my_strands_agent
```

When prompted, select **Strands** as your framework. The generator will set up the complete project structure, including the configuration, agent class, and server entry point described below.

### Generated Project Structure

When you use the `oai-gen` tool, it generates a standardized, production-ready directory structure. This ensures consistency and makes it easy to locate and manage different parts of your agent.

```text
ptr_agent_servers_my_strands_agent/
├── agentic_registry_agents/
│   ├── agents/
│   │   └── my_strands_agent/
│   │       ├── agent.py
│   │       └── server.py
│   ├── agents_config/
│   │   └── my_strands_agent.yaml      # Full configuration (Model, Tools, KB, etc.)
│   └── utils/
│       └── my_strands_agent_utils.py  # Scaffolded tool functions
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
-   **`agents/my_strands_agent/agent.py`**: This is where the core `StrandsAgent` class is instantiated. You typically don't need to modify this file unless you are customizing the agent's fundamental behavior.
-   **`agents/my_strands_agent/server.py`**: A pre-configured FastAPI server that exposes your agent's endpoints, enabling it to be used as a microservice.
-   **`agents_config/my_strands_agent.yaml`**: The heart of your project. This YAML file is where you define everything about your agent—its model, tools, knowledge base, memory, and orchestration patterns.
-   **`global_config/`**: Contains default model parameters for different cloud providers. The settings here are automatically merged with your agent's configuration.
-   **`utils/my_strands_agent_utils.py`**: If you define custom tools, this is where you'll write the Python functions that implement their logic.
-   **`pyproject.toml`**: Managed by Poetry, this file lists all project dependencies. The generator automatically adds the required packages based on your framework and feature selections.
-   **`docker-compose.yaml`**: Allows you to run your agent and any dependent services (like a Postgres database for memory) in containers.

---

*If you prefer to set up manually, follow the steps below.*

## 1. Installation

Ensure you have the necessary packages installed:

```bash
pip install strands-agents strands-agents-tools
```

## 2. Configuration

Create a YAML configuration file (e.g., `agents/agents_config/my_strands_agent.yaml`) in your agent repository.

### Basic Structure (Sequential Pattern)

```yaml
model:
  model_id: us.anthropic.claude-sonnet-4-20250514-v1:0
  region_name: us-west-2

agent_list:
  - assistant:
      system_prompt: You are a helpful assistant on AWS Bedrock.

crew_config:
  pattern: sequential
```

### Multi-Agent Example (Graph Pattern)

```yaml
model:
  model_id: us.anthropic.claude-sonnet-4-20250514-v1:0
  region_name: us-west-2

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
  pattern: graph
  entry_agent: researcher
  verbose: true
```

## 3. Implementation

Create your agent class in `agents/my_strands_agent/agent.py`.

```python
from aws_strands_agent import StrandsAgent
import os
import yaml

class MyStrandsAgent(StrandsAgent):
    def __init__(self):
        # Load configuration
        config_path = os.path.join(
            os.path.dirname(os.path.dirname(__file__)),
            "agents_config",
            "my_strands_agent.yaml"
        )
        with open(config_path, "r") as f:
            config = yaml.safe_load(f)
            
        super().__init__(
            agent_name="my_strands_agent",
            agent_config=config
        )
```

## 4. Server Setup

Create the server entry point in `agents/my_strands_agent/server.py`.

```python
from oai_agent_server.server import AgentServer
from .agent import MyStrandsAgent

if __name__ == "__main__":
    server = AgentServer(agent_class=MyStrandsAgent)
    server.run()
```

## Key Features

- **Orchestration Patterns**: Supports `graph`, `swarm`, `sequential`, and `agents_as_tools`.
- **Tools**: Integrate standard Python functions and MCP servers.
- **Knowledge Base**: Built-in RAG support.
- **Memory**: Persistent conversation memory.

## Next Steps

- **Add Tools**: Define tools in the `tools` section of your YAML.
- **Configure Knowledge Base**: Add a `knowledge_base` section to connect to your documents.
- **Test**: Run your server and test with Postman or the Agent Evaluator.

For detailed configuration options, refer to the [AWS Strands Framework Documentation](../../../agent-frameworks/strands/overview.md).
