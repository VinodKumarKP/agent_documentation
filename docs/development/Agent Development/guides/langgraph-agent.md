---
sidebar_position: 3
---

# LangGraph Agent Development

**Use Case:** Build stateful, multi-agent workflows using LangGraph and LangChain. Supports MCP tools.

## Prerequisites

- Python 3.10 or higher
- Basic understanding of YAML

## Installation

Install the package using pip:

```bash
pip install git+https://github.com/Capgemini-Innersource/ptr_oai_langgraph_agent_core@main
```

## 1. Create Configuration
Create `agentic_registry_agents/agents_config/my_langgraph_agent.yaml`:

```yaml
name: My LangGraph Agent
description: Multi-agent system using LangGraph
type: langgraph
cloud_provider: openai # or anthropic, aws
port: 8107

model:
  model_id: gpt-4o
  cloud_provider: openai

tools:
  calculator:
    module: langchain_community.tools
    class: Calculator

# Optional: MCP Servers
mcps:
  filesystem:
    command: "mcp-server-filesystem"
    args: ["/data"]

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
```

## 2. Implement Agent
Create `agentic_registry_agents/agents/my_langgraph_agent/agent.py`:

```python
import os
from oai_langgraph_agent_core.agents.langgraph_agent import LangGraphAgent

class MyLangGraphAgent(LangGraphAgent):
    def __init__(self, agent_config=None, llm=None, **kwargs):
        agent_name = os.path.basename(os.path.dirname(__file__))
        kwargs.pop('agent_name', None)
        super().__init__(agent_name,
                         llm=llm,
                         agent_config=agent_config,
                         config_root=os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
                         **kwargs)
```

## 3. Create HTTP Server
Create `agentic_registry_agents/agents/my_langgraph_agent/server.py`:

```python
import os
from oai_agent_server.main import AgentHTTPServer, main as http_main
from agentic_registry_agents.agents.my_langgraph_agent.agent import MyLangGraphAgent

def main():
    server = AgentHTTPServer(
        agent_name=os.path.basename(os.path.dirname(__file__)),
        config_root=os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
        agent=MyLangGraphAgent()
    )
    http_main(server)

if __name__ == "__main__":
    main()
```

## 4. Create Documentation
Create `agentic_registry_agents/agents/my_langgraph_agent/README.md`
