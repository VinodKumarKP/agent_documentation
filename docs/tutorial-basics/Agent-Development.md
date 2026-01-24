# Agent Development Quick Start

A streamlined guide for developers to quickly build and test agents using the OAI Agent Framework.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Agent Architecture](#agent-architecture)
- [Development Guide](#development-guide)
  - [MCP Development](#mcp-development)
  - [Agent Development](#agent-development)
    - [Option 1: LangGraph Agent](#option-1-langgraph-agent)
    - [Option 2: AWS Strands Agent](#option-2-aws-strands-agent)
    - [Option 3: CrewAI Agent](#option-3-crewai-agent)
    - [Option 4: Custom Agent](#option-4-custom-agent)
- [Testing](#testing)
- [Docker Testing](#docker-testing-optional)
- [Validation Checklist](#validation-checklist)
- [Configuration Quick Reference](#configuration-quick-reference)
- [Project Structure](#project-structure)
- [Critical: Update Dependencies](#️-critical-update-dependencies)
- [Quick Troubleshooting](#quick-troubleshooting)
- [Next Steps](#next-steps)

## Benefits

- **Simplified Configuration**: Agents can be built using simple YAML files, reducing boilerplate code.
- **Unified Interface**: Consistent `BaseAgent` API across LangGraph, CrewAI, and AWS Strands.
- **Standardized Server**: Ready-to-use `oai-agent-server` with built-in chat, streaming, and observability endpoints.
- **Observability**: Integrated Langfuse tracing for debugging and performance monitoring.
- **Containerization Ready**: Includes Docker support for easy deployment.

## Prerequisites

- Python 3.11+
- Git configured with GitHub token
- Postman (for API testing)

## Setup

### 1. Create Repository
```bash
# Create from template: ptr_agent_template
# Name format: ptr_agents_{agent_name}

# Clone your new repo
git clone {your_repo_url}
cd {your_repo}
```

### 2. Environment Setup
```bash
# Create and activate virtual environment
python3.11 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
cd agentic_registry_agents
```

## Agent Architecture

Each agent consists of three required files:

| File | Location                | Purpose |
|------|-------------------------|---------|
| `{agent}.yaml` | `agents/agents_config/` | Configuration (Model, Tools, Prompts) |
| `agent.py` | `agents/{agent}/`       | Agent class implementation |
| `server.py` | `agents/{agent}/`       | HTTP server entry point |

**Key Points:**
- Agent folder name MUST match config filename.
- `agent.py` uses `os.path.basename` to auto-detect agent name.
- `server.py` uses `oai_agent_server` to automatically configure HTTP endpoints.

## Development Guide

### MCP Server Development

<details>
<summary>Click to expand MCP Server Development guide</summary>

**Use Case:** Develop custom Model Context Protocol (MCP) servers to extend agent capabilities with new tools and resources.

For detailed instructions on creating MCP servers, please refer to the dedicated guide:

[**MCP Server Development Guide**](README_MCP_Server_Development.md)

This guide covers:
- Setting up an MCP project
- Defining tools and resources
- Testing your MCP server
- Integrating MCP servers with your agents

</details>

### Agent Development

Choose the agent type that best fits your use case.

#### Option 1: LangGraph Agent

<details>
<summary>Click to expand LangGraph Agent guide</summary>

**Use Case:** Build stateful, multi-agent workflows using LangGraph and LangChain. Supports MCP tools.

#### 1. Create Configuration
Create `agentic_registry_agents/agents_config/my_langgraph_agent.yaml`:

```yaml
name: My LangGraph Agent
description: Multi-agent system using LangGraph
type: langgraph
cloud_provider: openai # or anthropic, aws
port: 8107

model:
  model_id: gpt-4o
  cloud_provider: openai

tools:
  calculator:
    module: langchain_community.tools
    class: Calculator

# Optional: MCP Servers
mcps:
  filesystem:
    command: "mcp-server-filesystem"
    args: ["/data"]

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

#### 2. Implement Agent
Create `agentic_registry_agents/agents/my_langgraph_agent/agent.py`:

```python
import os
from oai_langgraph_agent_core.agents.langgraph_agent import LangGraphAgent

class MyLangGraphAgent(LangGraphAgent):
    def __init__(self, agent_config=None, llm=None, **kwargs):
        agent_name = os.path.basename(os.path.dirname(__file__))
        kwargs.pop('agent_name', None)
        super().__init__(agent_name,
                         llm=llm,
                         agent_config=agent_config,
                         config_root=os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
                         **kwargs)
```

#### 3. Create HTTP Server
Create `agentic_registry_agents/agents/my_langgraph_agent/server.py`:

```python
import os
from oai_agent_server.main import AgentHTTPServer, main as http_main
from agentic_registry_agents.agents.my_langgraph_agent.agent import MyLangGraphAgent

def main():
    server = AgentHTTPServer(
        agent_name=os.path.basename(os.path.dirname(__file__)),
        config_root=os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
        agent=MyLangGraphAgent()
    )
    http_main(server)

if __name__ == "__main__":
    main()
```

#### 4. Create Documentation
Create `agentic_registry_agents/agents/my_langgraph_agent/README.md`

</details>

---

#### Option 2: AWS Strands Agent

<details>
<summary>Click to expand AWS Strands Agent guide</summary>

**Use Case:** Build complex agent orchestrations on AWS Bedrock using AWS Strands SDK.

#### 1. Create Configuration
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

#### 2. Implement Agent
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

#### 3. Create HTTP Server
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

#### 4. Create Documentation
Create `agentic_registry_agents/agents/my_strands_agent/README.md`

</details>

---

#### Option 3: CrewAI Agent

<details>
<summary>Click to expand CrewAI Agent guide</summary>

**Use Case:** Build multi-agent workflows using the CrewAI framework.

#### 1. Create Configuration
Create `agentic_registry_agents/agents_config/my_crewai_agent.yaml`:

```yaml
name: My CrewAI Agent
description: Multi-agent system using CrewAI
type: crewai
cloud_provider: openai
port: 8108

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
      goal: Research new AI trends
      backstory: You are an expert researcher.
      tools: [search]
      tasks:
        - description: Research the latest AI trends in 2024
          expected_output: A list of top 5 trends
  - writer:
      role: Writer
      goal: Write a blog post
      backstory: You are a tech writer.
      tasks:
        - description: Write a blog post about the trends
          expected_output: A 500-word blog post

crew_config:
  process: sequential # or hierarchical
  verbose: true
```

#### 2. Implement Agent
Create `agentic_registry_agents/agents/my_crewai_agent/agent.py`:

```python
import os
from oai_crewai_agent_core.agents.crewai_agent import CrewAIAgent

class MyCrewAIAgent(CrewAIAgent):
    def __init__(self, agent_config=None, llm=None, **kwargs):
        agent_name = os.path.basename(os.path.dirname(__file__))
        kwargs.pop('agent_name', None)
        super().__init__(agent_name,
                         llm=llm,
                         agent_config=agent_config,
                         config_root=os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
                         **kwargs)
```

#### 3. Create HTTP Server
Create `agentic_registry_agents/agents/my_crewai_agent/server.py`:

```python
import os
from oai_agent_server.main import AgentHTTPServer, main as http_main
from agentic_registry_agents.agents.my_crewai_agent.agent import MyCrewAIAgent

def main():
    server = AgentHTTPServer(
        agent_name=os.path.basename(os.path.dirname(__file__)),
        config_root=os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
        agent=MyCrewAIAgent()
    )
    http_main(server)

if __name__ == "__main__":
    main()
```

#### 4. Create Documentation
Create `agentic_registry_agents/agents/my_crewai_agent/README.md`

</details>

---

#### Option 4: Custom Agent

<details>
<summary>Click to expand Custom Agent guide</summary>

**Use Case:** Need custom logic not covered by existing base classes.

#### 1. Create Configuration
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

#### 2. Implement Agent
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

#### 3. Create HTTP Server
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

#### 4. Create Documentation
Create `agentic_registry_agents/agents/my_custom_agent/README.md`

</details>

## ⚠️ CRITICAL: Update Dependencies

**Update `pyproject.toml`:**
```toml
[project]
name = "agentic_registry_agents_{category}"  # Change {category}
authors = [{name = "{{Name of the author}}", email = "{Email address of the author}"}]
dependencies = [
    "mcp>=1.0.0",
    "python-dotenv>=1.0.0",
    "oai-agent-core",
    "oai-agent-server",
    # Add specific core libraries based on your agent type:
    # "oai-langgraph-agent-core",  # For LangGraph Agents
    # "oai-aws-strands-agent-core", # For Strands Agents
    # "oai-crewai-agent-core",      # For CrewAI Agents
]
```

**Update `requirements.txt`:**
```txt
mcp>=1.0.0
python-dotenv>=1.0.0
oai-agent-core
oai-agent-server
# Add specific core libraries based on your agent type
```

## Testing

### Start Agent Server

**Start your agent's HTTP server:**
```bash
# From project root with venv activated
make install

# Start the agent server
python agentic_registry_agents/agents/my_agent_name/server.py

# Should see: "INFO: Server starting on port {port_from_config}"
```

### Test with Postman

**Server URL:** `http://localhost:{port_from_config}`

**Available Endpoints:**
- `POST /chat` - Send message, get response
- `POST /chat/stream` - Send message, get streaming response
- `GET /health` - Health check
- `GET /agent/info` - Agent information

**Test Request (POST /chat):**
```json
{
  "message": "Your test prompt here"
}
```

### Docker Testing (Optional)

```bash
# Set GitHub token
export GITHUB_TOKEN={your_token}

# Build and start
make start-my_agent_name

# Verify
docker ps
```

## Validation Checklist

- [ ] Configuration file created in `agents_config/`
- [ ] Agent class implemented in `agents/{name}/agent.py`
- [ ] HTTP server created in `agents/{name}/server.py`
- [ ] README.md created with documentation
- [ ] Server starts without errors
- [ ] POST /chat returns valid response
- [ ] POST /chat/stream returns streaming response
- [ ] GET /health returns OK
- [ ] GET /agent/info returns correct metadata

## Configuration Quick Reference

### Common Fields (All Agent Types)

```yaml
name: Display Name
description: Brief description
type: langgraph|strands|crewai|custom
cloud_provider: aws|openai|anthropic
port: 8XXX  # Unique port > 8000
tags:
  - tag1
  - tag2
environment:
  - KEY:value
```

### Type-Specific Fields

**LangGraph Agent:**
```yaml
model:
  model_id: ...
  cloud_provider: ...
agent_list:
  - agent_name:
      system_prompt: ...
      tools: [...]
system_prompt: ...
```

**AWS Strands Agent:**
```yaml
model:
  model_id: ...
  region_name: ...
crew_config:
  pattern: graph|swarm|sequential|agents_as_tools
  entry_agent: ...
agent_list:
  - agent_name:
      system_prompt: ...
      context: [...]
```

**CrewAI Agent:**
```yaml
model:
  model_id: ...
  cloud_provider: ...
agent_list:
  - agent_name:
      role: ...
      goal: ...
      backstory: ...
      tasks: [...]
crew_config:
  process: sequential|hierarchical
```

## Project Structure

```
agentic_registry_agents/
├── agents_config/
│   └── my_agent.yaml
├── agentic_registry_agents/
│   ├── agents_config/
│   │   └── my_agent.yaml
│   └── my_agent/
│       ├── __init__.py
│       ├── README.md
│       ├── agent.py (agent implementation)
│       └── server.py (HTTP server)
└── tests/
    └── test_my_agent.py
```

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Agent not found | Verify agent folder name matches config filename |
| Import errors | Check `oai_agent_core` and specific agent core imports |
| Server won't start | Check port availability in config YAML |
| Agent crashes on startup | Verify all required environment variables set |
| MCP tools not working | Verify MCP server configuration in YAML |
| Multi-agent fails | Ensure all sub-agents exist in agents directory |
| 404 on endpoints | Confirm server.py is running, not agent_http.py |

## Next Steps

1. Complete local testing
2. Test all endpoints with Postman
3. Verify error handling
4. Submit onboarding request
5. Deploy to production

---

**Need Help?** Check the full [Agent Onboarding Instructions](Onboarding_Instructions_Agent.md) for detailed guidance.