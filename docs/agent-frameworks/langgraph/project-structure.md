---
sidebar_position: 4
sidebar_label: "📂 Project Structure"
---

# Project Structure

When you use the `oai-gen` tool to create a new LangGraph agent project, it generates a standardized, production-ready directory structure. This ensures consistency and makes it easy to locate and manage different parts of your agent.

Here is the typical structure of a generated project:

```text
ptr_agent_servers_my_project/
├── agentic_registry_agents/
│   ├── agents/
│   │   └── my_agent/
│   │       ├── agent.py
│   │       └── server.py
│   ├── agents_config/
│   │   └── my_agent.yaml      # Full configuration (Model, Tools, KB, etc.)
│   └── utils/
│       └── my_agent_utils.py  # Scaffolded tool functions
├── .gitignore
├── docker-compose.yaml          # Docker Compose file for containerization
├── Makefile
├── Dockerfile
├── pyproject.toml               # Project metadata and dependencies
├── README.md
└── tests/                       # Unit and integration tests
```

## Key Directories and Files

-   **`ptr_agent_servers_{agent_name}/`**: The main source code directory for your agent package.
-   **`agents/my_agent/agent.py`**: This is where the core `LangGraphAgent` class is instantiated. You typically don't need to modify this file unless you are customizing the agent's fundamental behavior.
-   **`agents/my_agent/server.py`**: A pre-configured FastAPI server that exposes your agent's endpoints, enabling it to be used as a microservice.
-   **`agents_config/my_agent.yaml`**: The heart of your project. This YAML file is where you define everything about your agent—its model, tools, knowledge base, memory, and orchestration patterns.
-   **`global_config/`**: Contains default model parameters for different cloud providers. The settings here are automatically merged with your agent's configuration.
-   **`utils/my_agent_utils.py`**: If you define custom tools, this is where you'll write the Python functions that implement their logic.
-   **`pyproject.toml`**: Managed by Poetry, this file lists all project dependencies. The generator automatically adds the required packages based on your framework and feature selections.
-   **`docker-compose.yaml`**: Allows you to run your agent and any dependent services (like a Postgres database for memory) in containers.
