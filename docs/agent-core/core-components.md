---
sidebar_position: 3
---

# Core Components

## 1. Core Abstractions (`oai_agent_core.core`)
*   **`BaseAgent`**: The abstract base class that all specific agent implementations (e.g., `LangGraphAgent`, `CrewAIAgent`) must inherit from. It handles initialization, configuration loading, and standardizes `process_request`, `invoke`, and `stream` methods.
*   **`BaseModelConfigurationManager`**: Manages LLM configurations, ensuring consistent model instantiation across different providers.
*   **`BaseToolRegistry`**: A registry for managing tools. It supports loading tools from configuration, dynamic imports, and MCP integration.
*   **`BaseKnowledgeBaseFactory`**: Abstract factory for creating knowledge base tools that agents can use to query vector stores.
*   **`BaseVectorStore`**: Abstract interface for vector database interactions.
*   **`BaseDocumentLoader`**: Abstract interface for loading and processing documents into vector stores.

## 2. Components (`oai_agent_core.components`)
*   **Configuration**: Utilities for loading and validating agent and model configurations (`ConfigManager`, `ModelConfig`).
*   **Observability**: Managers for integrating with observability platforms like Langfuse (`LangfuseObservabilityManager`).
*   **Loaders**: Implementations for document loading (e.g., `DocumentLoader`).

## 3. Processing (`oai_agent_core.processing`)
*   **`MessageFormatter`**: Handles prompt templating and variable substitution, preparing messages for agents.
*   **`OutputSerializer`**: Standardizes the output format of agent responses, ensuring consistency across different agent types.

## 4. Utilities (`oai_agent_core.utils`)
*   **`DynamicClassLoader`**: Helper for dynamically loading classes and modules at runtime.
*   **`Logger`**: Standardized logging configuration.
