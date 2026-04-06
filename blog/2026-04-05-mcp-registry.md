---
title: "Introducing the MCP Registry"
authors: [vinodkumarkp]
tags: [oai, mcp-registry, fastapi]
---

We are excited to introduce the MCP Registry, a powerful, FastAPI-based proxy server designed to manage and route requests to multiple MCP (Multi-Content-Platform) servers. It acts as a single entry point for all your MCP servers, providing centralized control and dynamic discovery.

## Key Features

*   **Dynamic Routing**: Intelligently proxies requests to the correct MCP server based on the URL path.
*   **Auto-Discovery**: Automatically discovers and registers MCP servers running on the same host within a specified port range.
*   **Centralized Configuration**: Manage all MCP server endpoints and registry settings from a single JSON configuration file.
*   **Health Checks**: Built-in endpoints to monitor the health of the registry and all registered servers.
*   **High Performance**: Built on FastAPI and `httpx` for asynchronous, high-throughput request handling.

You can find more information in the [MCP Registry documentation](/docs/development/mcp-registry).
