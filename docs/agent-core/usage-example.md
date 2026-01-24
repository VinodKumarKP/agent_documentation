---
sidebar_position: 5
---

# Usage Example

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
