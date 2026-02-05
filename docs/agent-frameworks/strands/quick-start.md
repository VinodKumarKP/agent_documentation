---
sidebar_position: 2
sidebar_label: "🚀 Quick Start"
---

# Quick Start

## 1. Installation

```bash
pip install strands-agents strands-agents-tools
```

To install with specific optional dependencies:

```bash
# For vector store support (required for any vector DB)
pip install "oai-aws-strands-agent-core[vector-required]"

# For ChromaDB support
pip install "oai-aws-strands-agent-core[chromadb]"

# For Postgres (pgvector) support
pip install "oai-aws-strands-agent-core[postgres]"

# For S3 vector store support
pip install "oai-aws-strands-agent-core[s3]"

# For all features
pip install "oai-aws-strands-agent-core[all]"
```

## 2. Create Your Configuration File

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

## 3. Initialize and Run

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
