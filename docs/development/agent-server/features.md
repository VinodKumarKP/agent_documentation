---
sidebar_position: 1
sidebar_label: "✨ Features"
---
*   **FastAPI Powered**: Built on modern, high-performance FastAPI framework.
*   **Standardized API**: RESTful endpoints for chat (`/chat`), streaming (`/chat/stream`), and agent management.
*   **Agent-to-Agent (A2A) Protocol**: Compliant with the A2A specification for interoperable agent communication.
*   **Scheduled Jobs**: Built-in APScheduler integration for creating and managing recurring or one-time agent tasks.
*   **Request Isolation**: Thread-safe request handling with isolated environment variables for each request.
*   **Authentication**: Built-in API token validation using `Depends` for security.
*   **Streaming Support**: Server-Sent Events (SSE) support for real-time agent responses.
*   **File Uploads**: Support for uploading files alongside chat messages.
*   **Comprehensive Logging**: Integrated database logging for all interactions, including token usage, latency metrics, and scheduled job runs. Supports both PostgreSQL and SQLite.
*   **Graceful Shutdown**: Handles server restarts and shutdowns gracefully, ensuring active requests complete.
*   **Health Checks**: Standardized `/health` and `/status` endpoints for monitoring.
