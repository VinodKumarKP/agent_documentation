---
sidebar_position: 6
---

# Custom Agent Development

**Use Case:** Need custom logic not covered by existing base classes.

## Prerequisites

- Python 3.10 or higher
- Basic understanding of YAML

## Installation

Install the package using pip:

```bash
pip install git+https://github.com/Capgemini-Innersource/ptr_agent_core@main
```

## 1. Create Configuration
Create `agentic_registry_agents/agents_config/my_custom_agent.yaml`:

```yaml
name: My Custom Agent
description: Custom agent with specialized implementation
type: custom
cloud_provider: aws
port: 8104

system_prompt: |
  System prompt for the agent.

tags:
  - custom
  - specialized

environment:
  - KEY1:value1
```

## 2. Implement Agent
Create `agentic_registry_agents/agents/my_custom_agent/agent.py`:

```python
import os
from typing import Optional, Dict, Any
from oai_agent_core.core.base_agent import BaseAgent

class MyCustomAgent(BaseAgent):
    def __init__(self, agent_config: Optional[Dict[str, Any]] = None, 
                 llm: Any = None, **kwargs):
        agent_name = os.path.basename(os.path.dirname(__file__))
        kwargs.pop('agent_name', None)
        super().__init__(agent_name=agent_name, 
                         llm=llm, 
                         agent_config=agent_config, 
                         config_root=os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
                         **kwargs)
        self.agent_type = 'custom'

    async def initialize(self) -> None:
        """Initialize your custom agent."""
        # Custom initialization logic here
        self._initialized = True

    async def astream(self, user_message: str, config: Optional[Dict[str, Any]] = None):
        """Async streaming response."""
        await self._ensure_initialized()
        # Your streaming logic here
        yield {"content": "Response chunk", "final": True}

    async def ainvoke(self, user_message: str, config: Optional[Dict[str, Any]] = None):
        """Async invoke response."""
        await self._ensure_initialized()
        return {"content": "Full response", "final": True}
    
    def invoke(self, user_message: str, config: Optional[Dict[str, Any]] = None):
        """Sync invoke response."""
        import asyncio
        return asyncio.run(self.ainvoke(user_message, config))

    async def stream(self, user_message: str, config: Optional[Dict[str, Any]] = None):
        """Sync streaming response."""
        async for chunk in self.astream(user_message, config):
            yield chunk
```

## 3. Create HTTP Server
Create `agentic_registry_agents/agents/my_custom_agent/server.py`:

```python
import os
from oai_agent_server.main import AgentHTTPServer, main as http_main
from agentic_registry_agents.agents.my_custom_agent.agent import MyCustomAgent

def main():
    server = AgentHTTPServer(
        agent_name=os.path.basename(os.path.dirname(__file__)),
        config_root=os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
        agent=MyCustomAgent()
    )
    http_main(server)

if __name__ == "__main__":
    main()
```

## 4. Create Documentation
Create `agentic_registry_agents/agents/my_custom_agent/README.md`
