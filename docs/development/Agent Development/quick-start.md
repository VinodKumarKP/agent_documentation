---
sidebar_position: 1
sidebar_label: "🚀 Quick Start"
slug: /development/quick-start
---

# Quick Start

A streamlined guide for developers to quickly build and test agents using the OAI Agent Framework.

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

There are two ways to get started: using the interactive project generator for a guided setup, or manually configuring your project.

### Option 1: Use the Project Generator (Recommended)

The `oai-gen` CLI tool scaffolds a complete, production-ready project with all the necessary configurations, including multi-agent setups, knowledge bases, and more.

#### 1. Install the Generator

First, install the template generator tool:
```bash
mkdir agent_development
cd agent_development
python3.13 -m venv .venv
source .venv/bin/activate
pip install uv

uv pip install 'oai-template-generator @ git+https://github.com/Capgemini-Innersource/ptr_oai_agent_development_kit@main#subdirectory=packages/template-generator'
```

#### 2. Create a New Agent Project

Run the interactive wizard to create a new agent. It will guide you through selecting the framework, orchestration pattern, models, tools, and other settings.
```bash
oai-gen new agent
```
Or provide arguments directly to skip initial prompts:

```bash
oai-gen new agent my_agent_project --author "Jane Doe" --email "jane.doe@capgemini.com"
```

The wizard will ask you to choose a framework. It will then generate a complete project structure, including a pre-filled YAML configuration file, ready for you to customize and run.

#### 3. Getting Started & Next Steps

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

### Option 2: Manual Setup

If you prefer to build your project from scratch, follow these steps.

#### 1. Create Repository
```bash
# Create from template: ptr_agent_template
# Name format: ptr_agents_{agent_name}

# Clone your new repo
git clone {your_repo_url}
cd {your_repo}
```

#### 2. Environment Setup
```bash
# Create and activate virtual environment
python3.11 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
cd agentic_registry_agents
```
