# LangGraph Multi-Agent Framework

A powerful, YAML-based configuration system for building multi-agent AI workflows with LangGraph and LangChain. Build complex agent orchestrations without writing code—just configure and run.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Key Features](#key-features)
- [Configuration Structure](#configuration-structure)
- [Orchestration Patterns](#orchestration-patterns)
- [Agents Configuration](#agents-configuration)
- [Tools System](#tools-system)
- [Knowledge Base Integration](#knowledge-base-integration)
- [MCP Integration](#mcp-integration)
- [Dynamic Input Variables](#dynamic-input-variables)
- [Usage Examples](#usage-examples)
- [Streaming Support](#streaming-support)
- [Observability](#observability)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

The LangGraph Multi-Agent Framework enables you to create sophisticated agent orchestrations through simple YAML configuration files. Built on LangGraph and LangChain, it provides a declarative way to define multi-agent systems with support for various orchestration patterns.

### What Can You Build?

- Research and analysis pipelines with agent handoffs
- Complex decision-making systems with multiple specialists
- Data processing workflows with parallel execution
- Autonomous agent systems with dynamic collaboration
- Enterprise-grade AI applications

## Prerequisites

Before running the agent, ensure you have the necessary API keys set as environment variables based on your chosen `cloud_provider`:

```bash
# For OpenAI models
export OPENAI_API_KEY="sk-..."

# For Anthropic models
export ANTHROPIC_API_KEY="sk-ant-..."

# For AWS Bedrock
export AWS_ACCESS_KEY_ID="..."
export AWS_SECRET_ACCESS_KEY="..."
export AWS_DEFAULT_REGION="us-west-2"
```

You must also install the specific LangChain provider package for the model you intend to use:

```bash
pip install langchain-openai      # If using cloud_provider: openai
pip install langchain-anthropic   # If using cloud_provider: anthropic
pip install langchain-aws         # If using cloud_provider: aws
```

## Quick Start

### 1. Installation

```bash
pip install oai-langgraph-agent-core
```

### 2. Create Your Configuration File

Create a YAML file (e.g., `research_agent.yaml`):

```yaml
model:
  model_id: gpt-4o
  cloud_provider: openai

tools:
  calculator:
    module: langchain_community.tools
    class: Calculator

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

### 3. Initialize and Run

```python
import yaml
from oai_langgraph_agent_core.agents.langgraph_agent import LangGraphAgent

# Load configuration
with open("research_agent.yaml", "r") as f:
    config = yaml.safe_load(f)

agent = LangGraphAgent(
    agent_name="research_crew",
    agent_config=config
)

# Initialize
await agent.initialize()

# Execute
result = await agent.ainvoke("Research the latest trends in quantum computing")
print(result)
```

## Key Features

### 🦜 LangChain & LangGraph Integration
Built on the robust LangChain ecosystem, leveraging LangGraph for stateful, multi-agent orchestration.

### 🔄 Flexible Orchestration
Support for both single-agent and multi-agent supervisor patterns.

### 🛠️ Extensible Tools System
Integrate LangChain community tools, custom tools, and MCP servers seamlessly.

### 📚 Knowledge Base Support
Easily integrate custom knowledge bases (RAG) for agents to access domain-specific information.

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
  model_id: gpt-4o
  cloud_provider: openai # openai, anthropic, aws, etc.
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
  - custom_knowledge_base:
      db_name: "my_kb"
      embedding_model_id: "text-embedding-3-small"
      persist_directory: "./data/chroma"
      docs:
        - "./documents/policy.pdf"
        - "./documents/specs.docx"

# MCP Servers (Optional)
mcps:
  server_name:
    command: "server_command"
    args: ["arg1", "arg2"]
    env:
      KEY: "value"
  remote_server:
    url: "http://localhost:8000/sse"
    headers:
      Authorization: "Bearer token"

# Agent Definitions
agent_list:
  - agent_key:
      system_prompt: "Detailed instructions for the agent"
      context:  # Optional: agents this agent can see (for dependency tracking)
        - other_agent_key
      tools:  # Optional: tools available to this agent
        - tool_name
      knowledge_base: # Optional: assign specific KB to agent
        - custom_knowledge_base: ...

# Supervisor System Prompt (for multi-agent mode)
system_prompt: "Instructions for the supervisor agent managing the team."
```

## Orchestration Patterns

### 1. Single Agent

**When to use:** Simple tasks requiring one specialized agent.

```yaml
agent_list:
  - researcher:
      system_prompt: You are a helpful research assistant.
      tools:
        - web_search
```

### 2. Multi-Agent Supervisor

**When to use:** Complex workflows where a supervisor delegates tasks to specialized workers.

```yaml
system_prompt: You are a supervisor. Delegate tasks to the appropriate worker.

agent_list:
  - researcher:
      system_prompt: You research topics.
  - writer:
      system_prompt: You write summaries based on research.
```

**Flow:**
```
User Input → Supervisor → (Delegates) → Worker Agent → (Returns) → Supervisor → Final Output
```

## Agents Configuration

### Agent Properties

```yaml
agent_list:
  - agent_key:
      system_prompt: "Detailed instructions"  # Required
      tools: [tool_name]  # Optional: tools available to agent
```

### System Prompt Best Practices

```yaml
# ✅ Good - Clear role and instructions
system_prompt: |
  You are a research analyst who gathers information from reliable sources.
  
  Your responsibilities:
  - Search for relevant information on the given topic
  - Verify source credibility
  - Summarize key findings

# ❌ Bad - Vague instructions
system_prompt: You help with research.
```

## Tools System

### Defining Tools

#### Load Class-Based Tools (LangChain Community)

```yaml
tools:
  web_search:
    module: langchain_community.tools
    class: DuckDuckGoSearchRun
```

#### Load Custom Module Tools

```yaml
tools:
  my_custom_tool:
    module: my_tools
    function_list:
      - my_function
    base_path: ./src
```

### Setting Default Parameter Values

You can configure default parameter values for tool functions using the `function_params` field.

```yaml
tools:
  random_generator:
    module: random_generator
    function_params:
      generate_random_number:
        lower: 10
        upper: 100
```

## Knowledge Base Integration

You can equip your agents with a custom knowledge base (RAG) to answer questions based on specific documents.

### Global Knowledge Base

A global knowledge base is automatically queried and the relevant context is appended to the user's message before it reaches the agent.

```yaml
knowledge_base:
  - custom_knowledge_base:
      db_name: "company_policies"
      embedding_model_id: "text-embedding-3-small"
      docs:
        - "./docs/hr_policy.pdf"
        - "./docs/it_policy.txt"
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

## MCP Integration

Model Context Protocol (MCP) servers provide enhanced capabilities like filesystem access, database queries, and more.

### MCP Configuration

You can configure MCP servers using either local commands or remote URLs (SSE/HTTP).

```yaml
mcps:
  # Local process
  filesystem:
    command: "mcp-server-filesystem"
    args: ["/data"]
  
  # Remote server with headers
  remote_api:
    url: "http://localhost:8080/sse"
    headers:
      X-API-Key: "${MY_API_KEY}" # Environment variables are supported
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

## Usage Examples

### Example 1: Simple Research Agent

```yaml
model:
  model_id: gpt-4o
  cloud_provider: openai

agent_list:
  - research_agent:
      system_prompt: You help with researching on a topic.
```

### Example 2: Multi-Agent Research Team

```yaml
model:
  model_id: gpt-4o
  cloud_provider: openai

tools:
  search:
    module: langchain_community.tools
    class: DuckDuckGoSearchRun

agent_list:
  - researcher:
      system_prompt: You research topics using the search tool.
      tools:
        - search
  
  - writer:
      system_prompt: You write engaging articles based on provided research.

system_prompt: You are an editor. Coordinate the research and writing process.
```

## Streaming Support

### Async Streaming

```python
async for chunk in agent.astream("Research quantum computing"):
    if 'content' in chunk:
        print(chunk['content'], end='', flush=True)
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
agent = LangGraphAgent(
    agent_name="my_agent",
    agent_config=config,
    session_id="user-session-123",
    user_id="user-456"
)
```

## Best Practices

1. **Clear Agent Roles**: Define specific responsibilities for each agent to avoid confusion.
2. **Tool Scoping**: Assign only necessary tools to each agent to reduce hallucination risks.
3. **Supervisor Prompts**: For multi-agent systems, ensure the supervisor's prompt clearly defines the workflow and delegation strategy.
4. **Security**: Use environment variables for API keys and sensitive data.

## Troubleshooting

**Issue: "Agent not initialized"**
```python
# Solution: Always call initialize() before use
await agent.initialize()
```

**Issue: "Tool not found"**
```yaml
# Problem: Tool referenced but not defined
# Solution: Define tool in tools section
tools:
  missing_tool:
    module: tool_module
```

## API Reference

### LangGraphAgent Class

```python
class LangGraphAgent:
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
