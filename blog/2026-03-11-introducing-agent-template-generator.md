---
slug: introducing-agent-template-generator
title: Accelerating AI Development with the Agent Template Generator
authors: [vinodkumarkp]
tags: [development, generator, scaffolding, productivity, cli]
---

Building a production-ready AI agent from scratch involves a lot of boilerplate. You need to set up the project structure, configure your chosen framework (LangGraph, CrewAI, etc.), wire up memory stores, define tool interfaces, and ensure you have a robust API server ready to handle requests.

To eliminate this friction and get you straight to building intelligent behaviors, we are excited to introduce the **OAI Template Generator (`oai-gen`)**.

<!--truncate-->

## What is `oai-gen`?

The OAI Template Generator is a powerful, interactive CLI tool designed to instantly scaffold production-ready AI Agent and Model Context Protocol (MCP) projects. It asks you a few simple questions and generates a complete, standardized project repository tailored to your exact needs.

## Why Use the Template Generator?

### 1. Zero to Production in Minutes
Instead of spending hours reading documentation to figure out how to wire LangGraph up to a FastAPI server with Postgres memory and ChromaDB knowledge bases, `oai-gen` does it all for you in seconds.

### 2. Standardized Architecture
The generated projects follow organizational best practices. Every agent project has a consistent structure:
- `agents/`: Your core agent logic and HTTP server.
- `agents_config/`: Your declarative YAML configuration.
- `utils/`: Scaffolded Python functions for your custom tools.
- `pyproject.toml` & `Makefile`: Pre-configured dependencies and build scripts.

### 3. Interactive Framework Selection
Not sure which framework to use? The CLI guides you. You can choose between:
- **LangGraph**: For highly controllable, stateful workflows.
- **CrewAI**: For role-based, collaborative agent teams.
- **AWS Strands**: For native AWS Bedrock integrations.
- **OpenAI**: For direct, function-calling agent patterns.

It also configures the correct orchestration patterns (Supervisor, Swarm, Sequential, etc.) based on your choice.

### 4. Advanced Features Out-of-the-Box
During scaffolding, you can opt-in to advanced features:
- **Knowledge Bases**: Instantly sets up Chroma, Postgres, or S3 configurations.
- **Conversational Memory**: Configures vector-backed long-term memory.
- **Guardrails**: Adds placeholder validators for input/output sanitization.
- **MCP Servers**: Configures connections to local or remote tool servers.

## How It Works

Getting started is incredibly simple. First, install the tool via `uv`:

```bash
uv pip install 'oai-template-generator @ git+https://github.com/Capgemini-Innersource/ptr_oai_agent_development_kit@main#subdirectory=packages/template-generator'
```

Then, run the wizard:

```bash
oai-gen new agent my_awesome_agent
```

The CLI will prompt you for your author details, preferred framework, and desired features. Once complete, it initializes a Git repository, creates a virtual environment, and installs all necessary dependencies.

## Beyond Agents: MCP Servers

`oai-gen` isn't just for agents; it also scaffolds **Model Context Protocol (MCP) servers**. If you want to build a new tool suite to expose to your agents, simply run:

```bash
oai-gen new mcp my_tool_server
```

It will generate the server logic, the tool implementation classes, and the configuration files needed to instantly run an MCP server.

## Stop Writing Boilerplate

The OAI Template Generator is designed to let developers focus on what matters: the agent's logic, prompts, and tools. Stop copying and pasting boilerplate code and start building smarter agents faster.

Check out the [Template Generator Documentation](../docs/development/Template%20Generator/overview) to learn more!
