---
title: "Introducing the OAI Agent Registry"
authors: [vinodkumarkp]
tags: [oai, agent-registry, fastapi]
---

Today, we're excited to announce the OAI Agent Registry, a powerful, FastAPI-based proxy server designed to manage and route requests to multiple OAI (OpenAI-compatible) agent servers. It acts as a single entry point for all your agents, providing centralized control, dynamic discovery, and robust security.

## Key Features

*   **Dynamic Routing**: Intelligently proxies requests to the correct agent based on the URL path.
*   **Auto-Discovery**: Automatically discovers and registers agents running on the same host within a specified port range.
*   **Centralized Configuration**: Manage all agent endpoints and registry settings from a single JSON configuration file.
*   **Robust Security**: Secure your agents with API token authentication, including support for both standard and SAML-based tokens.
*   **Health Checks**: Built-in endpoints to monitor the health of the registry and all registered agents.
*   **Interactive API Docs**: Automatically proxies and rewrites agent OpenAPI documentation, making all agent APIs explorable through a single Swagger UI.
*   **High Performance**: Built on FastAPI and `httpx` for asynchronous, high-throughput request handling.

You can find more information in the [Agent Registry documentation](/docs/development/agent-registry).
