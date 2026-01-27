# AWS Strands Multi-Agent Framework

A powerful, YAML-based configuration system for building multi-agent AI workflows with AWS Strands SDK. Build complex agent orchestrations on AWS Bedrock without writing code—just configure and run.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Key Features](#key-features)
- [Configuration Structure](#configuration-structure)
- [Orchestration Patterns](#orchestration-patterns)
- [Agents Configuration](#agents-configuration)
- [Tools System](#tools-system)
- [Knowledge Base Integration](#knowledge-base-integration)
- [Memory Management](#memory-management)
- [MCP Integration](#mcp-integration)
- [Dynamic Input Variables](#dynamic-input-variables)
- [Usage Examples](#usage-examples)
- [Streaming Support](#streaming-support)
- [Observability](#observability)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

The AWS Strands Multi-Agent Framework enables you to create sophisticated agent orchestrations on AWS Bedrock through simple YAML configuration files. Built on the official AWS Strands SDK, it provides a declarative way to define multi-agent systems with support for various orchestration patterns.

### What Can You Build?

- Research and analysis pipelines with agent handoffs
- Complex decision-making systems with multiple specialists
- Data processing workflows with parallel execution
- Autonomous agent systems with dynamic collaboration
- Enterprise-grade AI applications on AWS infrastructure

## Quick Start

### 1. Installation

```bash
pip install strands-agents strands-agents-tools
```

### 2. Create Your Configuration File

Create a YAML file (e.g., `research_agent.yaml`):

```yaml
model:
  model_id: us.anthropic.claude-sonnet-4-20250514-v1:0
  region_name: us-west-2

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
  pattern: graph  # Agents autonomously hand off tasks
  entry_agent: researcher
  verbose: true
```

### 3. Initialize and Run

```python
from aws_strands_agent import StrandsAgent

# Load configuration
agent = StrandsAgent(
    agent_name="research_crew",
    agent_config=yaml.safe_load(open("research_agent.yaml"))
)

# Initialize
await agent.initialize()

# Execute
result = await agent.ainvoke("Research the latest trends in quantum computing")
print(result)
```

## Key Features

### ☁️ AWS Bedrock Integration
Built on AWS Bedrock Claude models with full support for the latest Sonnet 4 models.

### 🔄 Multiple Orchestration Patterns
Support for Graph, Swarm, Sequential, and Agents-as-Tools patterns.

### 🎯 Autonomous Agent Handoffs
Agents can intelligently hand off tasks to each other based on expertise.

### 🛠️ Extensible Tools System
Integrate Strands tools, custom tools, and MCP servers seamlessly.

### 📚 Knowledge Base Support
Easily integrate custom knowledge bases (RAG) for agents to access domain-specific information.

### 🧠 Long-Term Memory
Persistent memory store for maintaining context across sessions with semantic search capabilities.

### 🔌 MCP Server Support
Connect to Model Context Protocol servers for enhanced capabilities.

### 📊 Session Management
Built-in session tracking and output serialization for conversation continuity.

### 📈 Observability with Langfuse
Optional Langfuse integration for tracing, monitoring, and debugging.

### ⚡ Streaming Support
Real-time streaming of agent outputs and task handoffs.

## Configuration Structure

### Complete YAML Template

```yaml
# Model Configuration
model:
  model_id: us.anthropic.claude-sonnet-4-20250514-v1:0
  region_name: us-west-2
  params:  # Optional
    temperature: 0.7
    max_tokens: 4096

# Tools Definition
tools:
  tool_name:
    module: "module_name"
    class: "ToolClassName"  # Optional
    function_list:  # Optional: load specific functions
      - function_name
    base_path: "./path"  # Optional

# Knowledge Base Definition (Optional)
knowledge_base:
  - settings:
      db_name: "my_kb"
      embedding_model_id: "amazon.titan-embed-text-v1"
      persist_directory: "./data/chroma"
      similarity_threshold: 0.7  # Global threshold
  - custom_knowledge_base:
      docs:
        - "./documents/policy.pdf"
        - "./documents/specs.docx"

# Memory Configuration (Optional)
memory:
  db_name: "memory_db"
  embedding_model_id: "amazon.titan-embed-text-v1"
  persist_directory: './memory_db'
  max_recent_turns: 5
  max_relevant_turns: 3
  similarity_threshold: 0.6

# MCP Servers (Optional)
mcps:
  server_name:
    command: "server_command"
    args: ["arg1", "arg2"]

# Agent Definitions
agent_list:
  - agent_key:
      system_prompt: "Detailed instructions for the agent"
      context:  # Optional: agents this agent can see
        - other_agent_key
      tools:  # Optional: tools available to this agent
        - tool_name
      knowledge_base: # Optional: assign specific KB to agent
        - custom_knowledge_base: ...

# Orchestration Configuration
crew_config:
  pattern: "graph"  # graph, swarm, sequential, agents_as_tools
  entry_agent: "agent_key"  # Required for graph/swarm
  verbose: true
```

## Orchestration Patterns

AWS Strands supports multiple orchestration patterns for different use cases:

### 1. Graph Pattern

**When to use:** Agents need to autonomously decide which agent to hand off to based on context.

```yaml
crew_config:
  pattern: graph
  entry_agent: researcher
  verbose: true

agent_list:
  - researcher:
      system_prompt: You research topics. Hand off to analyst when you have findings.
  - analyst:
      system_prompt: You analyze data. Hand off to writer for final output.
      context:
        - researcher
  - writer:
      system_prompt: You write summaries.
      context:
        - researcher
        - analyst
```

**Flow:**
```
User Input → Researcher → Analyst → Writer → Final Output
            ↑____________↓
        (Can hand back if needed)
```

**Advantages:**
- Autonomous decision-making
- Dynamic collaboration
- Flexible handoffs
- Context-aware routing

### 2. Swarm Pattern

**When to use:** Similar to Graph but with different execution characteristics.

```yaml
crew_config:
  pattern: swarm
  entry_agent: coordinator
  verbose: true

agent_list:
  - coordinator:
      system_prompt: You coordinate tasks and delegate to specialists.
  - specialist_a:
      system_prompt: You handle type A tasks.
      context:
        - coordinator
  - specialist_b:
      system_prompt: You handle type B tasks.
      context:
        - coordinator
```

**Advantages:**
- Parallel processing capabilities
- Coordinator-worker pattern
- Efficient resource utilization

### 3. Sequential Pattern

**When to use:** Simple linear workflows where each agent processes in order.

```yaml
crew_config:
  pattern: sequential

agent_list:
  - assistant:
      system_prompt: You are a helpful assistant.
      tools:
        - calculator
        - current_time
```

**Advantages:**
- Simple and predictable
- Easy to debug
- Good for single-agent systems

### 4. Agents-as-Tools Pattern

**When to use:** One agent coordinates by using other agents as tools.

```yaml
crew_config:
  pattern: agents_as_tools
```

**Advantages:**
- Clear hierarchy
- Tool-like agent invocation
- Centralized coordination

### Pattern Comparison

| Pattern | Complexity | Autonomy | Best For |
|---------|-----------|----------|----------|
| Graph | High | High | Complex multi-agent collaboration |
| Swarm | Medium | Medium | Coordinator-worker systems |
| Sequential | Low | Low | Simple linear workflows |
| Agents-as-Tools | Medium | Medium | Hierarchical systems |

## Agents Configuration

### Agent Properties

```yaml
agent_list:
  - agent_key:
      system_prompt: "Detailed instructions"  # Required
      context: [other_agent]  # Optional: which agents this agent can see
      tools: [tool_name]  # Optional: tools available to agent
```

### Context Mechanism

The `context` field defines which agents an agent can "see" and receive outputs from:

```yaml
agent_list:
  - researcher:
      system_prompt: You research topics.
      # No context - starts fresh
  
  - analyst:
      system_prompt: You analyze research findings.
      context:
        - researcher  # Can see researcher's output
  
  - writer:
      system_prompt: You write final reports.
      context:
        - researcher  # Can see both outputs
        - analyst
```

### System Prompt Best Practices

```yaml
# ✅ Good - Clear role and handoff instructions
system_prompt: |
  You are a research analyst who gathers information from reliable sources.
  
  Your responsibilities:
  - Search for relevant information on the given topic
  - Verify source credibility
  - Summarize key findings
  
  When you have gathered sufficient information, hand off to the analyst
  for deeper analysis.

# ❌ Bad - Vague instructions
system_prompt: You help with research.
```

## Tools System

### Defining Tools

#### Load All Functions from Module

```yaml
tools:
  random_generator:
    module: random_generator
    base_path: ./../utils
```

#### Load Specific Functions

```yaml
tools:
  random_generator:
    module: random_generator
    function_list:
      - generate_random_number
      - generate_random_string
    base_path: ./../utils
```

#### Load Class-Based Tools

```yaml
tools:
  calculator:
    module: strands_tools
    class: calculator
  
  current_time:
    module: strands_tools
    class: current_time
```

### Setting Default Parameter Values

You can configure default parameter values for tool functions using the `function_params` field. This is useful for pre-configuring tools with specific settings or constraints.

#### Basic Default Parameters

```yaml
tools:
  random_generator:
    module: random_generator
    base_path: ./../utils
    function_params:
      generate_random_number:
        lower: 10
        upper: 100
      generate_random_string:
        length: 16
        charset: "alphanumeric"
```

#### Multiple Functions with Defaults

```yaml
tools:
  data_processor:
    module: data_tools
    base_path: ./tools
    function_params:
      process_data:
        max_records: 1000
        format: "json"
      validate_data:
        strict_mode: true
        schema_version: "2.0"
```

#### Combining with Specific Function Lists

```yaml
tools:
  api_client:
    module: api_tools
    function_list:
      - fetch_data
      - post_data
    base_path: ./integrations
    function_params:
      fetch_data:
        timeout: 30
        retry_count: 3
      post_data:
        timeout: 60
        verify_ssl: true
```

**How It Works:**
- Default parameters are applied when the tool is initialized
- Agents can still override these defaults when calling the function
- Useful for:
  - Setting consistent behavior across all tool calls
  - Configuring API endpoints, timeouts, or rate limits
  - Establishing validation rules or data constraints
  - Pre-setting environment-specific values

**Example Use Case:**

```yaml
tools:
  database_client:
    module: db_tools
    base_path: ./database
    function_params:
      query_data:
        connection_string: "postgresql://localhost:5432/mydb"
        pool_size: 10
        timeout: 30
      insert_data:
        batch_size: 500
        validate: true
```

### Built-in Strands Tools

```yaml
tools:
  # Math operations
  calculator:
    module: strands_tools
    class: calculator
  
  # Time utilities
  current_time:
    module: strands_tools
    class: current_time
  
  # Swarm coordination
  swarm:
    module: strands_tools
    class: swarm
```

### Custom Tools

Create a Python file with your tool:

```python
# my_tools/data_processor.py
def process_data(data: str, max_records: int = 100, format: str = "json") -> str:
    """Process and clean data.
    
    Args:
        data: Raw data to process
        max_records: Maximum number of records to process (default: 100)
        format: Output format - 'json' or 'csv' (default: 'json')
    """
    # Your implementation
    return processed_data

def analyze_data(data: str, threshold: float = 0.5) -> dict:
    """Analyze data and return insights.
    
    Args:
        data: Data to analyze
        threshold: Confidence threshold for insights (default: 0.5)
    """
    # Your implementation
    return {"insights": results}
```

Configure in YAML with default parameters:

```yaml
tools:
  data_tools:
    module: data_processor
    function_list:
      - process_data
      - analyze_data
    base_path: ./my_tools
    function_params:
      process_data:
        max_records: 500
        format: "csv"
      analyze_data:
        threshold: 0.75
```

### Assigning Tools to Agents

```yaml
agent_list:
  - analyst:
      system_prompt: You analyze data using available tools.
      tools:
        - calculator
        - data_tools
        - current_time
  
  - researcher:
      system_prompt: You research topics and generate reports.
      tools:
        - random_generator
        - current_time
```

### Tool Configuration Best Practices

1. **Use Meaningful Default Values**
   ```yaml
   # ✅ Good - Sensible defaults for production
   function_params:
     api_call:
       timeout: 30
       retry_count: 3
       backoff_factor: 2
   
   # ❌ Bad - Extreme or unrealistic defaults
   function_params:
     api_call:
       timeout: 1
       retry_count: 100
   ```

2. **Document Parameter Purposes**
   - Ensure tool functions have clear docstrings
   - Include parameter descriptions and valid ranges
   - Specify default behavior when parameters are omitted

3. **Environment-Specific Configuration**
   ```yaml
   # Development environment
   function_params:
     database_query:
       connection_string: "postgresql://localhost:5432/dev_db"
       timeout: 10
   
   # Production environment
   function_params:
     database_query:
       connection_string: "postgresql://prod-server:5432/prod_db"
       timeout: 60
   ```

4. **Security Considerations**
   - Avoid hardcoding sensitive values in YAML
   - Use environment variables for credentials
   - Set safe defaults for potentially dangerous operations
   ```yaml
   # ✅ Good - Safe defaults
   function_params:
     file_operations:
       max_file_size: 10485760  # 10MB
       allowed_extensions: [".txt", ".json", ".csv"]
   ```

## Knowledge Base Integration

You can equip your agents with a custom knowledge base (RAG) to answer questions based on specific documents.

### Global Knowledge Base

A global knowledge base is automatically queried and the relevant context is appended to the user's message before it reaches the agent.

```yaml
knowledge_base:
  - settings:
      db_name: "company_policies"
      embedding_model_id: "amazon.titan-embed-text-v1"
      persist_directory: "./data/chroma"
      similarity_threshold: 0.7  # Global threshold for all KBs
  - custom_knowledge_base:
      docs:
        - "./docs/hr_policy.pdf"
        - "./docs/it_policy.txt"
      # Optional: Override threshold for this specific KB
      # similarity_threshold: 0.8
```

### Agent-Specific Knowledge Base

You can also assign a knowledge base as a tool to a specific agent. This allows the agent to decide when to query the knowledge base.

```yaml
agent_list:
  - policy_expert:
      system_prompt: You answer questions about company policies. Use the search_knowledge_base tool.
      knowledge_base:
        - custom_knowledge_base:
            db_name: "policies"
            docs: ["./docs/policy.pdf"]
```

## Memory Management

The framework supports persistent memory to maintain context across sessions. This allows agents to recall previous interactions and provide more personalized responses.

### Memory Configuration

Add a `memory` section to your YAML configuration:

```yaml
memory:
  db_name: "memory_db"
  embedding_model_id: "amazon.titan-embed-text-v1"
  persist_directory: './memory_db'
  max_recent_turns: 5       # Number of recent turns to include
  max_relevant_turns: 3     # Number of semantically relevant past turns to include
  similarity_threshold: 0.6 # Threshold for semantic relevance (0.0 to 1.0)
```

### How It Works

1. **Storage**: Every interaction (user query + agent response) is stored in a vector database.
2. **Retrieval**: Before processing a new query, the system retrieves:
   - The most recent conversation turns (short-term memory)
   - Semantically relevant past interactions (long-term memory)
3. **Augmentation**: This context is automatically appended to the user's prompt, allowing the agent to "remember" past details.

## MCP Integration

Model Context Protocol (MCP) servers provide enhanced capabilities like filesystem access, database queries, and more.

### MCP Configuration

```yaml
mcps:
  filesystem:
    command: "mcp-server-filesystem"
    args: ["/data"]
  
  environment:
    command: "uv"
    args:
      - "run"
      - "--with"
      - "mcp-env-server"
      - "env_lookup_server"
```

### Using MCP Servers

Agents automatically get access to MCP tools defined in the configuration:

```yaml
agent_list:
  - system_agent:
      system_prompt: |
        You can access the filesystem and environment variables
        using your available tools.
      # MCP tools automatically available
```

## Dynamic Input Variables

### Variable Syntax

Use `{variable_name}` in system prompts:

```yaml
agent_list:
  - researcher:
      system_prompt: |
        Research the topic: {topic}
        Focus on {aspect} in the {industry} industry.
```

### Providing Inputs

**Method 1: Configuration Object**
```python
result = await agent.ainvoke(
    "Research quantum computing",
    config={
        'inputs': {
            'topic': 'Quantum Computing',
            'aspect': 'commercial applications',
            'industry': 'finance'
        }
    }
)
```

**Method 2: Simple Message**
```python
# System auto-detects and maps variables
result = await agent.ainvoke("Quantum Computing")
```

### Variable Detection

View detected variables:

```python
info = agent.validate_tasks()
print(info['input_variables'])
# Output: ['topic', 'aspect', 'industry']
```

## Usage Examples

### Example 1: Simple Research Agent

```yaml
model:
  model_id: us.anthropic.claude-sonnet-4-20250514-v1:0
  region_name: us-west-2

agent_list:
  - research_agent:
      system_prompt: You help with researching on a topic.

crew_config:
  pattern: sequential
```

**Usage:**
```python
agent = StrandsAgent(
    agent_name="research_agent",
    agent_config=config
)
await agent.initialize()
result = await agent.ainvoke("Tell me about AI trends")
```

### Example 2: Multi-Agent Research Pipeline

```yaml
model:
  model_id: us.anthropic.claude-sonnet-4-20250514-v1:0
  region_name: us-west-2

tools:
  calculator:
    module: strands_tools

agent_list:
  - researcher:
      system_prompt: |
        You research topics and gather information.
        Hand off to analyst when you have findings.
  
  - analyst:
      system_prompt: |
        You analyze information and identify key insights.
        Hand off to writer for final output.
      context:
        - researcher
  
  - writer:
      system_prompt: |
        You write clear, engaging summaries of analyzed information.
      context:
        - researcher
        - analyst

crew_config:
  pattern: graph
  entry_agent: researcher
  verbose: true
```

### Example 3: Tool-Enabled Assistant

```yaml
model:
  model_id: us.anthropic.claude-sonnet-4-20250514-v1:0
  region_name: us-west-2

tools:
  random_generator:
    module: random_generator
    base_path: ./../utils
  calculator:
    module: strands_tools
    class: calculator
  current_time:
    module: strands_tools
    class: current_time

agent_list:
  - assistant:
      system_prompt: |
        You are a helpful assistant that can do math, tell time,
        and generate random numbers.
      tools:
        - random_generator
        - calculator
        - current_time

crew_config:
  pattern: sequential
```

## Streaming Support

### Async Streaming

```python
async for chunk in agent.astream("Research quantum computing"):
    if chunk.get('type') == 'text_delta':
        print(chunk['content'], end='', flush=True)
    elif chunk.get('type') == 'agent_complete':
        print(f"\n[{chunk['agent']} completed]")
    elif chunk.get('type') == 'handoff':
        print(f"\n{chunk['content']}")
```

### Stream Event Types

- `text_delta`: Incremental text output
- `agent_complete`: Agent finished its task
- `handoff`: Task handed off to another agent
- `tool_use`: Tool invocation
- `status`: Status updates

### Multi-Agent Streaming

For graph and swarm patterns, streaming provides visibility into agent handoffs:

```python
async for event in agent.astream("Analyze market trends"):
    if event.get('type') == 'handoff':
        print(f"Handoff: {event['content']}")
    elif event.get('type') == 'agent_complete':
        agent_name = event.get('agent')
        output = event.get('content')
        print(f"\n{agent_name} output:\n{output}\n")
```

## Observability

### Langfuse Integration

Enable tracing by setting environment variables:

```bash
export LANGFUSE_ENABLED=true
export LANGFUSE_PUBLIC_KEY=pk-xxx
export LANGFUSE_SECRET_KEY=sk-xxx
export LANGFUSE_HOST=https://cloud.langfuse.com
```

### Session Management

```python
# Create agent with session tracking
agent = StrandsAgent(
    agent_name="my_agent",
    agent_config=config,
    session_id="user-session-123",
    user_id="user-456"
)

# Output is automatically tracked per session
result = await agent.ainvoke("Query")
```

### Session Output Files

Session outputs are automatically saved to:
```
output/{session_id}/output.jsonl
```

Each line contains:
```json
{
  "agent": "researcher",
  "type": "text_delta",
  "content": "Research findings...",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### Agent Information

Get detailed agent information:

```python
info = agent.get_agent_info()
print(info)
```

Output:
```python
{
    'agent_name': 'research_crew',
    'session_id': 'session-123',
    'initialized': True,
    'has_observability': True,
    'region': 'us-west-2',
    'model_info': {
        'model_id': 'us.anthropic.claude-sonnet-4-20250514-v1:0',
        'region': 'us-west-2'
    },
    'orchestration': {
        'pattern': 'graph',
        'agent_count': 3,
        'entry_agent': 'researcher'
    },
    'config_summary': {
        'agent_count': 3,
        'tool_count': 1,
        'agents': ['researcher', 'analyst', 'writer'],
        'tools': ['calculator']
    }
}
```

## Best Practices

### Configuration Design

1. **Clear Agent Roles**
   ```yaml
   # ✅ Good - Specific role and handoff instructions
   - researcher:
       system_prompt: |
         Research topics thoroughly using credible sources.
         When done, hand off to analyst for deeper analysis.
   
   # ❌ Bad - Vague role
   - agent1:
       system_prompt: Help with tasks.
   ```

2. **Meaningful Context**
   ```yaml
   # ✅ Good - Analyst needs researcher's output
   - analyst:
       context: [researcher]
   
   # ❌ Bad - Unnecessary context
   - analyst:
       context: [researcher, writer, coordinator]  # Too many
   ```

3. **Tool Assignment**
   ```yaml
   # ✅ Good - Only assign needed tools
   - data_analyst:
       tools: [calculator]
   
   # ❌ Bad - All agents get all tools
   tools:
     - calculator
     - file_reader
     - web_scraper
     # All agents get everything
   ```

### Security

1. **Use Environment Variables**
   ```yaml
   # ✅ Good
   model:
     model_id: us.anthropic.claude-sonnet-4-20250514-v1:0
     # AWS credentials from environment
   
   # ❌ Bad
   model:
     api_key: "hardcoded-key"  # Never do this
   ```

2. **Validate Tool Access**
   - Only assign tools that agents need
   - Use MCP servers with appropriate permissions
   - Implement proper error handling

### Performance

1. **Choose the Right Pattern**
   - Use `sequential` for simple single-agent tasks
   - Use `graph` for complex multi-agent collaboration
   - Use `swarm` for parallel processing needs

2. **Model Selection**
   ```yaml
   # For complex reasoning
   model:
     model_id: us.anthropic.claude-sonnet-4-20250514-v1:0
   
   # For faster, simpler tasks
   model:
     model_id: us.anthropic.claude-3-haiku-20240307-v1:0
   ```

3. **Session Management**
   - Use consistent session IDs for related queries
   - Clean up old session files periodically
   - Monitor session output sizes

## Troubleshooting

### Common Issues

**Issue: "Agent not initialized"**
```python
# Solution: Always call initialize() before use
await agent.initialize()
result = await agent.ainvoke("Query")
```

**Issue: "Tool not found"**
```yaml
# Problem: Tool referenced but not defined
# Solution: Define tool in tools section

tools:
  missing_tool:
    module: tool_module
```

**Issue: "Context agent not found"**
```yaml
# Problem: Context references non-existent agent
context:
  - nonexistent_agent  # Agent doesn't exist

# Solution: Verify agent key matches
agent_list:
  - actual_agent_name:  # Use this in context
      system_prompt: "..."
```

**Issue: "AWS credentials not found"**
```bash
# Solution: Configure AWS credentials
aws configure
# Or set environment variables
export AWS_ACCESS_KEY_ID=xxx
export AWS_SECRET_ACCESS_KEY=xxx
export AWS_DEFAULT_REGION=us-west-2
```

### Debugging

1. **Enable Verbose Logging**
   ```yaml
   crew_config:
     verbose: true
   ```

2. **Check Agent Information**
   ```python
   info = agent.get_agent_info()
   print(f"Initialized: {info['initialized']}")
   print(f"Pattern: {info['orchestration']['pattern']}")
   ```

3. **Validate Configuration**
   ```python
   diagnostics = agent.validate_tasks()
   print(f"Agents: {diagnostics['agents']}")
   print(f"Tools: {diagnostics['tools']}")
   print(f"Variables: {diagnostics['input_variables']}")
   ```

4. **Monitor Session Output**
   ```python
   # Check session output file
   session_file = f"output/{agent.session_id}/output.jsonl"
   with open(session_file) as f:
       for line in f:
           print(json.loads(line))
   ```

### AWS Bedrock Issues

**Issue: Model not available in region**
```yaml
# Solution: Check model availability and update region
model:
  model_id: us.anthropic.claude-sonnet-4-20250514-v1:0
  region_name: us-east-1  # Try different region
```

**Issue: Throttling errors**
```python
# Solution: Implement retry logic or request quota increase
# Contact AWS support for increased limits
```

## API Reference

### StrandsAgent Class

```python
class StrandsAgent:
    def __init__(
        agent_name: str,
        agent_config: Dict[str, Any],
        session_id: str = "default",
        user_id: str = "default",
        region_name: str = "us-west-2"
    )
    
    async def initialize() -> Any
    async def ainvoke(message: str, config: Dict = None) -> Dict
    def invoke(message: str, config: Dict = None) -> Dict
    async def astream(message: str, config: Dict = None) -> AsyncGenerator
    def validate_tasks() -> Dict[str, Any]
    def get_agent_info() -> Dict[str, Any]
```

## Additional Resources

- [AWS Strands SDK Documentation](https://docs.aws.amazon.com/bedrock/)
- [AWS Bedrock Documentation](https://docs.aws.amazon.com/bedrock/)
- [Anthropic Claude Models](https://www.anthropic.com/claude)
- [MCP Documentation](https://modelcontextprotocol.io/)

---

**Need help?** Open an issue or check AWS Bedrock support channels.