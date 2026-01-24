---
sidebar_position: 5
---

# CrewAI Agent Development

**Use Case:** Build multi-agent workflows using the CrewAI framework.

## 1. Create Configuration
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

## 2. Implement Agent
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

## 3. Create HTTP Server
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

## 4. Create Documentation
Create `agentic_registry_agents/agents/my_crewai_agent/README.md`
