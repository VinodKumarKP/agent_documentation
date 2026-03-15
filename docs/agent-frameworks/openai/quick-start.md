---
sidebar_position: 2
sidebar_label: "🚀 Quick Start"
---

# Quick Start

There are two ways to get started: using the interactive project generator for a guided setup, or manually configuring your project.

## Option 1: Use the Project Generator (Recommended)

The `oai-gen` CLI tool scaffolds a complete, production-ready project with all the necessary configurations, including multi-agent setups, knowledge bases, and more.

### 1. Install the Generator

First, install the template generator tool:
```bash
mkdir agent_development
cd agent_development
python3.13 -m venv .venv
source .venv/bin/activate
pip install uv

uv pip install 'oai-template-generator @ git+https://github.com/Capgemini-Innersource/ptr_oai_agent_development_kit@main#subdirectory=packages/template-generator'
```

### 2. Create a New Agent Project

Run the interactive wizard to create a new agent. It will guide you through selecting the framework, orchestration pattern, models, tools, and other settings.
```bash
oai-gen new agent
```
Or provide arguments directly to skip initial prompts:

```bash
oai-gen new agent my_agent_project --author "Jane Doe" --email "jane.doe@capgemini.com"
```

The wizard will ask you to choose a framework. Select **OpenAI**. It will then generate a complete project structure, including a pre-filled YAML configuration file, ready for you to customize and run.

### Knowledge Base (RAG)
You can configure knowledge bases at both the **Global** (shared) and **Agent** levels. Supported backends:
- **Chroma**: Local vector store.
- **Postgres**: Connection placeholders for pgvector.
- **S3**: Bucket and region placeholders.

### MCP Servers
When adding MCPs to an agent, you can specify the type:
- **`stdio`**: For local command-line servers. The config will include `command`, `args`, and `env`.
- **`remote`**: For servers accessible via HTTP. The config will include `url` and `headers`.

### Guardrails
If enabled, a `guardrails` section is added to your agent config with sample validators like `competitor_check`, `DetectPII`, and `profanity_free`.

### Getting Started & Next Steps

The template generator automatically initializes a Git repository and creates a Python virtual environment (`.venv`) for you.

To get started with your new project, follow these steps:

1.  **Navigate into your project directory:**
    ```bash
    cd <your_project_name>
    ```

2.  **Activate the virtual environment:**
    ```bash
    source .venv/bin/activate
    ```
    *(On Windows, use `.venv\Scripts\activate`)*

3.  **Install `uv`, a high-performance package manager:**
    ```bash
    pip install uv
    ```

4.  **Install project dependencies using `uv`:**
    ```bash
    uv pip install -r requirements.txt
    ```

5.  **(Optional) Add More Dependencies:**
    If your project requires additional packages, add them to `pyproject.toml` and/or `requirements.txt`, then re-run the install command.

6.  **Review Your Configuration:**
    Open the generated `.../agents_config/<agent_name>.yaml` or `.../servers_config/<server_name>.yaml` file and review the settings, updating them as necessary for your specific use case.

## Option 2: Manual Setup

If you prefer to build your project from scratch, follow these steps.

### 1. Installation

```bash
pip install openai-agents
```

To install with specific optional dependencies:

```bash
# For vector store support (required for any vector DB)
pip install "openai-agents[vector-required]"

# For ChromaDB support
pip install "openai-agents[chromadb]"

# For Postgres (pgvector) support
pip install "openai-agents[postgres]"

# For S3 vector store support
pip install "openai-agents[s3]"

# For all features
pip install "openai-agents[all]"
```

### 2. Create Your Configuration File

Create a YAML file (e.g., `research_agent.yaml`):

```yaml
model:
  model_id: gpt-4o
  cloud_provider: openai

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
  pattern: supervisor  # Agents are coordinated by a supervisor
  verbose: true
```

### 3. Initialize and Run

```python
from oai_openai_agent_core.agents.openai_agent import OpenAIAgent
import yaml
import asyncio

async def main():
    # Load configuration
    with open("research_agent.yaml", "r") as f:
        config = yaml.safe_load(f)

    agent = OpenAIAgent(
        agent_name="research_crew",
        agent_config=config
    )

    # Initialize
    await agent.initialize()

    # Execute
    result = await agent.ainvoke("Research the latest trends in quantum computing")
    print(result)

if __name__ == "__main__":
    asyncio.run(main())
```
