---
sidebar_position: 2
sidebar_label: "OpenAI Agent"
---

# OpenAI Agent Guide

This guide walks you through creating an agent using the **OpenAI Multi-Agent Framework**. This framework allows you to build sophisticated agent orchestrations using OpenAI's models through simple YAML configuration files.

## Prerequisites

- Python 3.11+
- `openai-agents` package installed

## 1. Installation

Ensure you have the necessary package installed:

```bash
pip install git+https://github.com/Capgemini-Innersource/ptr_oai_openai_agent_core@main
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
