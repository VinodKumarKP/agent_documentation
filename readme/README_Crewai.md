# CrewAI Multi-Agent Framework

A powerful, YAML-based configuration system for building multi-agent AI workflows with CrewAI. Build complex agent orchestrations without writing code—just configure and run.

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

The CrewAI Multi-Agent Framework enables you to create sophisticated agent orchestrations through simple YAML configuration files. Built on CrewAI, it provides a declarative way to define multi-agent systems with support for various orchestration patterns.

### What Can You Build?

- Research and analysis pipelines with agent handoffs
- Complex decision-making systems with multiple specialists
- Data processing workflows with parallel execution
- Autonomous agent systems with dynamic collaboration
- Enterprise-grade AI applications

## Quick Start

### 1. Installation

```bash
pip install oai-crewai-agent-core
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
      role: Researcher
      goal: Research topics and gather information.
      backstory: You are an expert researcher.
      tools:
        - calculator
  - analyst:
      role: Analyst
      goal: Analyze information and identify key insights.
      backstory: You are a data analyst.
      tools:
        - calculator

task_list:
  - research_task:
      description: Research the latest trends in {topic}.
      expected_output: A summary of trends.
      agent: researcher
  - analysis_task:
      description: Analyze the research findings.
      expected_output: An analysis report.
      agent: analyst
      context:
        - research_task

crew_config:
  process: sequential
```

### 3. Initialize and Run

```python
import yaml
from oai_crewai_agent_core.agents.crewai_agent import CrewAIAgent

# Load configuration
with open("research_agent.yaml", "r") as f:
    config = yaml.safe_load(f)

agent = CrewAIAgent(
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

### 🤖 CrewAI Integration
Built on the robust CrewAI ecosystem, leveraging its powerful agent orchestration capabilities.

### 🔄 Flexible Orchestration
Support for both sequential and hierarchical process patterns.

### 🛠️ Extensible Tools System
Integrate LangChain community tools, custom tools, and MCP servers seamlessly.

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
  - settings:
      db_name: "my_kb"
      embedding_model_id: "text-embedding-3-small"
      persist_directory: "./data/chroma"
      similarity_threshold: 0.7  # Global threshold
  - custom_knowledge_base:
      docs:
        - "./documents/policy.pdf"
        - "./documents/specs.docx"

# Memory Configuration (Optional)
memory:
  db_name: "memory_db"
  embedding_model_id: "text-embedding-3-small"
  persist_directory: './memory_db'
  max_recent_turns: 5
  max_relevant_turns: 3
  similarity_threshold: 0.6

# MCP Servers (Optional)
mcps:
  server_name:
    command: "server_command"
    args: ["arg1", "arg2"]
    env:
      KEY: "value"

# Agent Definitions
agent_list:
  - agent_key:
      role: "Agent Role"
      goal: "Agent Goal"
      backstory: "Agent Backstory"
      tools:  # Optional: tools available to this agent
        - tool_name
      knowledge_base: # Optional: assign specific KB to agent
        - custom_knowledge_base: ...

# Task Definitions
task_list:
  - task_key:
      description: "Task description"
      expected_output: "Expected output"
      agent: "agent_key"
      context:  # Optional: tasks this task depends on
        - other_task_key

# Crew Configuration
crew_config:
  process: "sequential" # or "hierarchical"
  verbose: true
```

## Orchestration Patterns

### 1. Sequential Process

**When to use:** Tasks need to be executed in a specific order.

```yaml
crew_config:
  process: sequential
```

### 2. Hierarchical Process

**When to use:** A manager agent delegates tasks to other agents.

```yaml
crew_config:
  process: hierarchical
  manager_llm: gpt-4o
```

## Agents Configuration

### Agent Properties

```yaml
agent_list:
  - researcher:
      role: Researcher
      goal: Conduct thorough research
      backstory: You are an experienced researcher.
      tools: [web_search]
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
  - settings:
      db_name: "company_policies"
      embedding_model_id: "text-embedding-3-small"
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
      role: Policy Expert
      goal: Answer policy questions
      backstory: You are an HR expert.
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
  embedding_model_id: "text-embedding-3-small"
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

## Dynamic Input Variables

### Variable Syntax

Use `{variable_name}` in task descriptions:

```yaml
task_list:
  - research_task:
      description: Research the topic: {topic}
      expected_output: A summary of {topic}.
      agent: researcher
```

### Providing Inputs

**Method 1: Configuration Object**
```python
result = await agent.ainvoke(
    "Research quantum computing",
    config={
        'inputs': {
            'topic': 'Quantum Computing'
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
  - researcher:
      role: Researcher
      goal: Research topics
      backstory: Expert researcher
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
      role: Researcher
      goal: Find information
      backstory: Expert researcher
      tools: [search]
  
  - writer:
      role: Writer
      goal: Write articles
      backstory: Expert writer

task_list:
  - research:
      description: Research {topic}
      expected_output: Research notes
      agent: researcher
  - write:
      description: Write article about {topic}
      expected_output: Article
      agent: writer
      context: [research]

crew_config:
  process: sequential
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
agent = CrewAIAgent(
    agent_name="my_agent",
    agent_config=config,
    session_id="user-session-123",
    user_id="user-456"
)
```

## Best Practices

1. **Clear Agent Roles**: Define specific responsibilities for each agent to avoid confusion.
2. **Tool Scoping**: Assign only necessary tools to each agent to reduce hallucination risks.
3. **Task Dependencies**: Use `context` to define dependencies between tasks.
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

### CrewAIAgent Class

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
