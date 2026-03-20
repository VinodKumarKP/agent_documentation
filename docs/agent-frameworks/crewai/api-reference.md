---
sidebar_position: 17
sidebar_label: "📖 API Reference"
---

# API Reference

## CrewAIAgent Class

The main class for creating and managing CrewAI agents.

```python
class CrewAIAgent:
    def __init__(
        agent_name: str,
        agent_config: Dict[str, Any],
        session_id: str = "default",
        user_id: str = "default",
        config_root: Optional[str] = None
    ):
        """
        Initializes the agent.
        - agent_name: A unique name for this agent instance.
        - agent_config: The dictionary loaded from your YAML configuration file.
        - session_id: An identifier for the current conversation session.
        - user_id: An identifier for the user interacting with the agent.
        - config_root: The root directory for configuration files.
        """
    
    async def initialize() -> None:
        """
        Sets up the agent, tools, and orchestration pattern based on the YAML config.
        Must be called before invoking the agent.
        """

    async def ainvoke(message: Dict[str, Any]) -> Dict:
        """
        Asynchronously invokes the agent with a dictionary of inputs.
        - message: A dictionary where keys match the {variables} in your task descriptions.
        Returns: A dictionary containing the agent's final response.
        """

    def invoke(message: Dict[str, Any]) -> Dict:
        """
        Synchronously invokes the agent.
        (See ainvoke for parameter details.)
        """

    async def astream(message: Dict[str, Any]) -> AsyncGenerator:
        """
        Streams the agent's output as it's generated.
        Yields: Chunks of the response.
        """

    def validate_tasks() -> Dict[str, Any]:
        """
        Analyzes the configuration to identify agents, tools, and input variables.
        Returns: A dictionary with details about the configured tasks.
        """

    def get_agent_info() -> Dict[str, Any]:
        """
        Retrieves summary information about the agent's current state and configuration.
        Returns: A dictionary containing agent metadata.
        """
```
