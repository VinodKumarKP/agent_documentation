---
sidebar_position: 1
slug: /
---

# Introduction

Welcome to the **OAI Agent Framework Documentation**. This comprehensive guide is designed to help you build, deploy, and manage intelligent AI agents using our unified framework.

## What is OAI Agent Framework?

The OAI Agent Framework is a robust, modular system that standardizes the development of AI agents across different underlying technologies. Whether you are using **LangGraph**, **CrewAI**, or **AWS Strands**, our framework provides a consistent interface and set of tools to streamline your workflow.

### Key Capabilities

*   **Unified Abstraction**: Write agents once using a standard configuration format, regardless of the backend framework.
*   **Multi-Framework Support**: First-class support for:
    *   🦜 **LangGraph**: For stateful, graph-based multi-agent workflows.
    *   🤖 **CrewAI**: For role-based, collaborative agent teams.
    *   ☁️ **AWS Strands**: For enterprise-grade agents on AWS Bedrock.
*   **Standardized Server**: A production-ready FastAPI server (`oai-agent-server`) that provides chat, streaming, and management endpoints out of the box.
*   **Extensible Tooling**: A powerful tool registry that supports custom Python tools, LangChain community tools, and **Model Context Protocol (MCP)** servers.
*   **Enterprise Features**: Built-in support for authentication, request isolation, database logging, and observability via Langfuse.

## How to Use This Documentation

This documentation is organized into several key sections to guide you through your development journey:

### 1. [Agent Development](/docs/development/quick-start)
Start here if you are building a new agent. This section covers:
*   **Quick Start**: Get your first agent running in minutes.
*   **Architecture**: Understand the structure of an agent project.
*   **Guides**: Step-by-step instructions for building LangGraph, CrewAI, and Strands agents.
*   **Testing**: How to validate and debug your agents.

### 2. [Frameworks](/docs/agent-frameworks/langgraph/overview)
Deep dive into the specific capabilities and configurations for each supported framework:
*   **LangGraph**: Learn about supervisor patterns and graph orchestration.
*   **CrewAI**: Understand roles, tasks, and process flows.
*   **AWS Strands**: Explore orchestration patterns like Graph and Swarm on Bedrock.

### 3. [Agent Core](/docs/agent-core/features)
Understand the inner workings of the `oai-agent-core` library, including:
*   The `BaseAgent` abstraction.
*   Configuration management.
*   Tool registry and MCP integration.

### 4. [Agent Server](/docs/agent-server/features)
Learn how to host and manage your agents using the `oai-agent-server`:
*   API reference and endpoints.
*   Authentication and security.
*   Deployment configurations.

### 5. [MCP Server Development](/docs/development/mcp-server/core-features)
Extend your agents' capabilities by building custom Model Context Protocol (MCP) servers to access external data and systems.

## Getting Started

Ready to build your first agent? Head over to the **[Quick Start Guide](/docs/development/quick-start)** to set up your environment and create your first project.
