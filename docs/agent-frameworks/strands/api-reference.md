---
sidebar_position: 17
sidebar_label: "📖 API Reference"
---

# API Reference

## StrandsAgent Class

The main class for creating and managing AWS Strands agents.

```python
class StrandsAgent:
    def __init__(
        agent_name: str,
        agent_config: Dict[str, Any],
        session_id: str = "default",
        user_id: str = "default",
        region_name: str = "us-west-2"
    ):
        """
        Initializes the agent.
        - agent_name: A unique name for this agent instance.
        - agent_config: The dictionary loaded from your YAML configuration file.
        - session_id: An identifier for the current conversation session.
        - user_id: An identifier for the user interacting with the agent.
        - config_root: The root directory for configuration files.
        """
    
    async def initialize() -> Any:
        """
        Sets up the agent, tools, and orchestration pattern based on the YAML config.
        Must be called before invoking the agent.
        """

    async def ainvoke(message: str, config: Dict = None) -> Dict:
        """
        Asynchronously invokes the agent with a user message.
        - message: The user's input string.
        - config: A dictionary for providing dynamic inputs.
        Returns: A dictionary containing the agent's final response.
        """

    def invoke(message: str, config: Dict = None) -> Dict:
        """
        Synchronously invokes the agent.
        (See ainvoke for parameter details.)
        """

    async def astream(message: str, config: Dict = None) -> AsyncGenerator:
        """
        Streams the agent's output as it's generated.
        Yields: Chunks of the response, including text and tool calls.
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

## Additional Resources

- [AWS Strands SDK Documentation](https://docs.aws.amazon.com/bedrock/)
- [AWS Bedrock Documentation](https://docs.aws.amazon.com/bedrock/)
- [Anthropic Claude Models](https://www.anthropic.com/claude)
- [MCP Documentation](https://modelcontextprotocol.io/)

---

**Need help?** Open an issue or check AWS Bedrock support channels.
