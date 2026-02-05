---
sidebar_position: 2
sidebar_label: "🚀 Quick Start"
---

# Quick Start

## 1. Installation

```bash
pip install oai-crewai-agent-core
```

To install with specific optional dependencies:

```bash
# For vector store support (required for any vector DB)
pip install "oai-crewai-agent-core[vector-required]"

# For ChromaDB support
pip install "oai-crewai-agent-core[chromadb]"

# For Postgres (pgvector) support
pip install "oai-crewai-agent-core[postgres]"

# For S3 vector store support
pip install "oai-crewai-agent-core[s3]"

# For all features
pip install "oai-crewai-agent-core[all]"
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

## 3. Initialize and Run

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
