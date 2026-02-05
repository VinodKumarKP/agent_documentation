---
sidebar_position: 3
sidebar_label: "🚀 Quick Start"
---

# Quick Start

## 1. Installation

```bash
pip install oai-langgraph-agent-core
```

To install with specific optional dependencies:

```bash
# For vector store support (required for any vector DB)
pip install "oai-langgraph-agent-core[vector-required]"

# For ChromaDB support
pip install "oai-langgraph-agent-core[chromadb]"

# For Postgres (pgvector) support
pip install "oai-langgraph-agent-core[postgres]"

# For S3 vector store support
pip install "oai-langgraph-agent-core[s3]"

# For all features
pip install "oai-langgraph-agent-core[all]"
```

## 2. Create Your Configuration File

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

## 3. Initialize and Run

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
