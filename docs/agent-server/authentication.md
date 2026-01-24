---
sidebar_position: 5
---

# Authentication

When authentication is enabled, requests must include a valid API token in one of the following headers:
*   `api-token`
*   `api_token`
*   `x-api-key`
*   `Authorization: Bearer <token>`

Tokens are managed via the `TokenManager` utility (backed by Redis).
