---
sidebar_position: 16
sidebar_label: "📖 API Reference"
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
    async def ainvoke(message: Dict[str, Any]) -> Dict
    def invoke(message: Dict[str, Any]) -> Dict
    async def astream(message: Dict[str, Any]) -> AsyncGenerator
    def validate_tasks() -> Dict[str, Any]
    def get_agent_info() -> Dict[str, Any]
```
