---
slug: building-mcp-servers
title: Extending Agents with MCP Servers
authors: [vinodkumarkp]
tags: [mcp, tools, integration]
---

The **Model Context Protocol (MCP)** is changing how AI agents interact with the world. In this post, we explore how to build custom MCP servers to give your agents superpowers.

<!-- truncate -->

## What is MCP?

MCP is a standard protocol that allows AI models to interact with external data and tools in a safe and controlled way. Instead of hardcoding API integrations into your agent, you can expose them as MCP tools.

## Why Use MCP?

*   **Decoupling**: Keep your agent logic separate from your tool implementation.
*   **Reusability**: Use the same MCP server across multiple agents and even different frameworks.
*   **Security**: Run tools in isolated environments.

## Building Your First Server

Our framework makes it easy to integrate MCP servers. Here is a simple configuration snippet:

```yaml
mcps:
  filesystem:
    command: "mcp-server-filesystem"
    args: ["/data"]
```

For a deep dive, read our [MCP Server Development Guide](/docs/development/mcp-server/core-features).
