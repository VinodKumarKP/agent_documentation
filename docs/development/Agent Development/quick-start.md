---
sidebar_position: 1
sidebar_label: "🚀 Quick Start"
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
