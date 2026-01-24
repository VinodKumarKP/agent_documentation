---
sidebar_position: 4
---

# Section Lookup

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
