---
sidebar_position: 1
sidebar_label: "⭐ Core Features"
---

# Core Features

The `oai_mcp_server_core` library provides the foundational framework for building Model Context Protocol (MCP) servers. It extends `FastMCP` with enterprise capabilities including request isolation, authentication, and standardized configuration.

## 🛡️ Request Isolation
Ensures thread-safe handling of concurrent requests by isolating environment variables.
- **Context-Aware Environment**: `os.environ` is patched to be request-aware, ensuring that headers and environment variables from one request do not leak into others.
- **Header Capture**: Middleware automatically captures HTTP headers (e.g., `Authorization`, `X-Custom-Header`) and exposes them as environment variables for the request scope.

## 🔐 Authentication
- **Token Management**: Redis-based token validation with support for permanent and TTL (Time-To-Live) tokens.
- **Middleware**: `AuthenticationMiddleware` enforces security when `AUTH_ENABLED` is set to `true`.
- **Metadata**: Tokens can carry user and role information.

## ⚙️ Configuration & Tooling
- **Unified Config**: Load configurations from YAML/JSON files.
- **Logging**: Standardized rotating file and console logging via `get_logger()`.
- **Health Checks**: Built-in `/health` and `/info` endpoints for monitoring.
