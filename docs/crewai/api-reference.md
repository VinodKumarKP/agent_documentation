---
sidebar_position: 16
---

# API Reference

## CrewAIAgent Class

```python
class CrewAIAgent:
    def __init__(
        agent_name: str,
        agent_config: Dict[str, Any],
        session_id: str = "default",
        user_id: str = "default",
        config_root: Optional[str] = None
    )
    
    async def initialize() -> None
    async def ainvoke(message: str, config: Dict = None) -> Dict
    def invoke(message: str, config: Dict = None) -> Dict
    async def astream(message: str, config: Dict = None) -> AsyncGenerator
    def validate_tasks() -> Dict[str, Any]
    def get_agent_info() -> Dict[str, Any]
```
