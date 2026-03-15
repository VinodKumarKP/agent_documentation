---
sidebar_position: 5
sidebar_label: "🛠️ Custom Agent"
---

# Custom Agent Guide

This guide explains how to build a completely custom agent while still leveraging the OAI Agent Framework's standard server, configuration, and observability features.

## Prerequisites

- Python 3.11+
- `oai-agent-core` package installed

## Project Setup (Recommended)

The easiest way to get started is using the `oai-gen` CLI tool to scaffold your project:

```bash
oai-gen new agent my_custom_agent
```

When prompted, select **Custom** as your framework. The generator will set up the complete project structure, including the configuration, base agent class, and server entry point described below.

For more detailed information on using the generator and the options available, see the [Template Generator Guide](../../Template%20Generator/overview.md).

### Generated Project Structure

When you use the `oai-gen` tool, it generates a standardized, production-ready directory structure. This ensures consistency and makes it easy to locate and manage different parts of your agent.

```text
ptr_agent_servers_my_custom_agent/
├── agentic_registry_agents/
│   ├── agents/
│   │   └── my_custom_agent/
│   │       ├── agent.py
│   │       └── server.py
│   ├── agents_config/
│   │   └── my_custom_agent.yaml      # Full configuration (Model, Tools, KB, etc.)
│   └── utils/
│       └── my_custom_agent_utils.py  # Scaffolded tool functions
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
-   **`agents/my_custom_agent/agent.py`**: This is where you implement your custom logic extending `BaseAgent`.
-   **`agents/my_custom_agent/server.py`**: A pre-configured FastAPI server that exposes your agent's endpoints, enabling it to be used as a microservice.
-   **`agents_config/my_custom_agent.yaml`**: The heart of your project. This YAML file is where you define everything about your agent.
-   **`global_config/`**: Contains default model parameters for different cloud providers. The settings here are automatically merged with your agent's configuration.
-   **`utils/my_custom_agent_utils.py`**: If you define custom tools, this is where you'll write the Python functions that implement their logic.
-   **`pyproject.toml`**: Managed by Poetry, this file lists all project dependencies. The generator automatically adds the required packages based on your framework and feature selections.
-   **`docker-compose.yaml`**: Allows you to run your agent and any dependent services (like a Postgres database for memory) in containers.

---

*If you prefer to set up manually, follow the steps below.*

## 1. Installation

Install the core library:

```bash
pip install oai-agent-core oai-agent-server
```

## 2. Configuration

Create your configuration YAML (`agents/agents_config/my_custom_agent.yaml`):

```yaml
model:
  model_id: gpt-4o
  cloud_provider: openai

my_custom_setting: "Some custom value you need"
```

## 3. Implementation

Create your agent class by inheriting from `BaseAgent`. You must implement the abstract methods.

```python
from typing import Dict, Any, Optional, AsyncGenerator
from oai_agent_core.core.base_agent import BaseAgent
import os
import yaml
import asyncio

class MyCustomAgent(BaseAgent):
    def __init__(self):
        # Load configuration
        config_path = os.path.join(
            os.path.dirname(os.path.dirname(__file__)),
            "agents_config",
            "my_custom_agent.yaml"
        )
        with open(config_path, "r") as f:
            config = yaml.safe_load(f)
            
        super().__init__(
            agent_name="my_custom_agent",
            agent_config=config,
            agent_type="custom"
        )

    async def initialize(self) -> None:
        """Initialize your custom logic here (e.g., connect to DB, setup LLM)"""
        # Access config via self.agent_config
        model_id = self.agent_config.get("model", {}).get("model_id")
        print(f"Initializing with model {model_id}")
        
        self._initialized = True

    async def ainvoke(self, user_message: str, config: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Process the message asynchronously."""
        await self._ensure_initialized()
        
        # Implement your custom agent logic here
        response = f"Echo from custom agent: {user_message}"
        
        return {
            "content": response,
            "final": True
        }

    def invoke(self, user_message: str, config: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Process the message synchronously."""
        return asyncio.run(self.ainvoke(user_message, config))

    async def astream(self, user_message: str, config: Optional[Dict[str, Any]] = None) -> AsyncGenerator[Dict[str, Any], None]:
        """Stream the response."""
        await self._ensure_initialized()
        
        # Implement your streaming logic here
        words = user_message.split()
        for word in words:
            yield {
                "type": "text_delta",
                "content": f"{word} "
            }
            await asyncio.sleep(0.1) # Simulate delay
            
        yield {"type": "final", "content": ""}
```

## 4. Server Setup

Use the standard server to expose your custom agent.

```python
from oai_agent_server.server import AgentServer
from .agent import MyCustomAgent

if __name__ == "__main__":
    server = AgentServer(agent_class=MyCustomAgent)
    server.run()
```

## Leveraging Core Features

Even though you are building a custom agent, you can still use the core components provided by `oai-agent-core`:

- **Observability**: Inheriting from `BaseAgent` gives you automatic access to Langfuse tracing (if configured in environment variables).
- **Tools Registry**: You can use `self.tool_registry` to manage tools and MCP servers.
- **Message Formatting**: Use the `MessageFormatter` utility for prompt templating.
