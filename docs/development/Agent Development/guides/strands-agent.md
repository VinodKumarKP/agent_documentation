---
sidebar_position: 4
---

# AWS Strands Agent Development

**Use Case:** Build complex agent orchestrations on AWS Bedrock using AWS Strands SDK.

## Prerequisites

- Python 3.10 or higher
- Basic understanding of YAML

## Installation

Install the package using pip:

```bash
pip install git+https://github.com/Capgemini-Innersource/ptr_oai_aws_strands_agent_core@main
```

## 1. Create Configuration
Create `agentic_registry_agents/agents_config/my_strands_agent.yaml`:

```yaml
name: My Strands Agent
description: Multi-agent system using AWS Strands
type: strands
cloud_provider: aws
port: 8106

model:
  model_id: us.anthropic.claude-sonnet-4-20250514-v1:0
  region_name: us-west-2

tools:
  calculator:
    module: strands_tools
    class: calculator

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
  pattern: graph  # Options: graph, swarm, sequential, agents_as_tools
  entry_agent: researcher
  verbose: true
```

## 2. Implement Agent
Create `agentic_registry_agents/agents/my_strands_agent/agent.py`:

```python
import os
from oai_aws_strands_agent_core.agents.aws_strands_agent import StrandsAgent

class MyStrandsAgent(StrandsAgent):
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
Create `agentic_registry_agents/agents/my_strands_agent/server.py`:

```python
import os
from oai_agent_server.main import AgentHTTPServer, main as http_main
from agentic_registry_agents.agents.my_strands_agent.agent import MyStrandsAgent

def main():
    server = AgentHTTPServer(
        agent_name=os.path.basename(os.path.dirname(__file__)),
        config_root=os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
        agent=MyStrandsAgent()
    )
    http_main(server)

if __name__ == "__main__":
    main()
```

## 4. Create Documentation
Create `agentic_registry_agents/agents/my_strands_agent/README.md`
