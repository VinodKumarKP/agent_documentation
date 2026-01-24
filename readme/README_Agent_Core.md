# OAI Agent Core

A robust, modular, and extensible framework for building AI agents. This core library provides the foundational building blocks for creating, managing, and orchestrating intelligent agents across different frameworks (like LangChain, CrewAI, AWS Strands) and environments.

## 📋 Table of Contents

*   [Features](#-features)
*   [Installation](#-installation)
*   [Core Components](#-core-components)
*   [Section Lookup](#-section-lookup)
*   [Usage Example](#-usage-example)
*   [BaseAgent Abstract Methods](#-baseagent-abstract-methods)
*   [Contributing](#-contributing)
*   [License](#-license)

## 🌟 Features

*   **Unified Agent Interface**: A consistent `BaseAgent` abstraction that standardizes interaction regardless of the underlying agent framework.
*   **Modular Architecture**: Decoupled components for configuration, tool management, document loading, and observability.
*   **Configuration Management**: Flexible YAML-based configuration for agents, models, and tools.
*   **Tool Registry**: Centralized management for registering and loading tools, including support for Model Context Protocol (MCP).
*   **Knowledge Base Integration**: Built-in support for vector stores and document loaders to ground agents in custom data.
*   **Observability**: Integrated tracing and monitoring (e.g., via Langfuse) for debugging and performance analysis.
*   **Extensibility**: Designed to be extended with custom agent implementations, tools, and vector stores.

## 📦 Installation

```bash
pip install oai-agent-core
```

To install with specific optional dependencies:

```bash
# For vector store support
pip install "oai-agent-core[vector]"

# For LangChain support
pip install "oai-agent-core[langchain]"

# For all features
pip install "oai-agent-core[all]"
```

## 🏗️ Core Components

### 1. Core Abstractions (`oai_agent_core.core`)
*   **`BaseAgent`**: The abstract base class that all specific agent implementations (e.g., `LangGraphAgent`, `CrewAIAgent`) must inherit from. It handles initialization, configuration loading, and standardizes `process_request`, `invoke`, and `stream` methods.
*   **`BaseModelConfigurationManager`**: Manages LLM configurations, ensuring consistent model instantiation across different providers.
*   **`BaseToolRegistry`**: A registry for managing tools. It supports loading tools from configuration, dynamic imports, and MCP integration.
*   **`BaseKnowledgeBaseFactory`**: Abstract factory for creating knowledge base tools that agents can use to query vector stores.
*   **`BaseVectorStore`**: Abstract interface for vector database interactions.
*   **`BaseDocumentLoader`**: Abstract interface for loading and processing documents into vector stores.

### 2. Components (`oai_agent_core.components`)
*   **Configuration**: Utilities for loading and validating agent and model configurations (`ConfigManager`, `ModelConfig`).
*   **Observability**: Managers for integrating with observability platforms like Langfuse (`LangfuseObservabilityManager`).
*   **Loaders**: Implementations for document loading (e.g., `DocumentLoader`).

### 3. Processing (`oai_agent_core.processing`)
*   **`MessageFormatter`**: Handles prompt templating and variable substitution, preparing messages for agents.
*   **`OutputSerializer`**: Standardizes the output format of agent responses, ensuring consistency across different agent types.

### 4. Utilities (`oai_agent_core.utils`)
*   **`DynamicClassLoader`**: Helper for dynamically loading classes and modules at runtime.
*   **`Logger`**: Standardized logging configuration.

## 🔍 Section Lookup

Quickly find the component you need:

| Component | Module Path | Description |
| :--- | :--- | :--- |
| **Agent Base** | `oai_agent_core.core.base_agent` | Abstract base class for all agents. |
| **Model Config** | `oai_agent_core.core.base_model_configuration_manager` | Manages LLM configurations. |
| **Tool Registry** | `oai_agent_core.core.base_tool_registry` | Manages and loads tools (including MCP). |
| **Knowledge Base** | `oai_agent_core.core.base_knowledge_base_factory` | Factory for creating KB tools. |
| **Vector Store** | `oai_agent_core.core.base_vector_store` | Interface for vector DBs. |
| **Doc Loader** | `oai_agent_core.core.base_document_loader` | Interface for loading documents. |
| **Config Manager** | `oai_agent_core.components.configuration.model_config` | Utilities for loading YAML configs. |
| **Observability** | `oai_agent_core.components.observability` | Integration with tracing tools (Langfuse). |
| **Formatter** | `oai_agent_core.processing.message_formatter` | Prompt templating and variable substitution. |
| **Serializer** | `oai_agent_core.processing.output_serializer` | Standardizes agent output format. |

## 🚀 Usage Example

Here's a conceptual example of how to use the core library to build a custom agent by implementing the `BaseAgent` abstract methods:

```python
from typing import Dict, Any, Optional
from oai_agent_core.core.base_agent import BaseAgent

class MyCustomAgent(BaseAgent):
    def __init__(self, agent_name: str, agent_config: Optional[Dict[str, Any]] = None, **kwargs):
        super().__init__(
            agent_name=agent_name,
            agent_config=agent_config,
            agent_type="custom",
            **kwargs
        )
        
    async def initialize(self):
        """Initialize resources (e.g., connect to DB, load models)."""
        print(f"Initializing {self.agent_name}...")
        # ... setup logic ...
        self._initialized = True
        
    async def ainvoke(self, user_message: str, config: Optional[Dict[str, Any]] = None):
        """Asynchronous invocation."""
        await self._ensure_initialized()
        # ... processing logic ...
        return {"content": f"Processed async: {user_message}", "final": True}

    def invoke(self, user_message: str, config: Optional[Dict[str, Any]] = None):
        """Synchronous invocation."""
        import asyncio
        return asyncio.run(self.ainvoke(user_message, config))
        
    async def astream(self, user_message: str, config: Optional[Dict[str, Any]] = None):
        """Asynchronous streaming."""
        await self._ensure_initialized()
        # ... streaming logic ...
        yield {"content": "Chunk 1", "final": False}
        yield {"content": "Chunk 2", "final": True}

    async def stream(self, user_message: str, config: Optional[Dict[str, Any]] = None):
        """Synchronous streaming (if supported)."""
        # Often just wraps astream or raises NotImplementedError
        async for chunk in self.astream(user_message, config):
            yield chunk

# Usage
config = {"model": {"model_id": "gpt-4"}}
agent = MyCustomAgent("my-agent", config)

# Async usage
import asyncio
async def main():
    await agent.initialize()
    response = await agent.ainvoke("Hello world")
    print(response)

if __name__ == "__main__":
    asyncio.run(main())
```

## 📋 BaseAgent Abstract Methods

Any class inheriting from `BaseAgent` must implement the following methods:

| Method | Description | Async |
| :--- | :--- | :---: |
| `initialize()` | Initializes the agent's resources and connections. Must set `self._initialized = True`. | ✅ |
| `ainvoke(user_message, config)` | Asynchronously processes a message and returns the full response. | ✅ |
| `invoke(user_message, config)` | Synchronously processes a message and returns the full response. | ❌ |
| `astream(user_message, config)` | Asynchronously streams the response chunks. | ✅ |
| `stream(user_message, config)` | Synchronously streams the response chunks (or wraps async stream). | ✅ |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
