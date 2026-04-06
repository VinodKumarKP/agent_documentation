---
sidebar_position: 1
sidebar_label: "✨ Features"
---
*   **FastAPI Powered**: Built on modern, high-performance FastAPI framework.
*   **Standardized API**: RESTful endpoints for chat (`/chat`), streaming (`/chat/stream`), and agent management.
*   **Agent-to-Agent (A2A) Protocol**: Compliant with the A2A specification for interoperable agent communication.
*   **Request Isolation**: Thread-safe request handling with isolated environment variables for each request.
*   **Authentication**: Built-in API token validation using `Depends` for security.
*   **Streaming Support**: Server-Sent Events (SSE) support for real-time agent responses.
*   **File Uploads**: Support for uploading files alongside chat messages.
*   **Comprehensive Logging**: Integrated database logging (PostgreSQL) for all interactions, including token usage and latency metrics.
*   **Graceful Shutdown**: Handles server restarts and shutdowns gracefully, ensuring active requests complete.
*   **Health Checks**: Standardized `/health` and `/status` endpoints for monitoring.

## Agent-to-Agent (A2A) Support

The server implements the Agent-to-Agent (A2A) communication protocol, allowing it to interact with other compliant agents in a standardized way.

### A2A Endpoints

*   **GET** `/a2a/.well-known/agent.json`: The **Agent Card** discovery endpoint. This provides metadata about the agent, such as its capabilities and authentication requirements. This endpoint does not require authentication.
*   **POST** `/a2a/`: The main JSON-RPC 2.0 endpoint for all A2A methods.


### A2A Methods

The following JSON-RPC methods are supported:

*   `message/send`: Send a message to the agent and receive a complete response synchronously.
*   `message/stream`: Send a message to the agent and receive a stream of real-time updates.`
*   `message/sendSubscribe`: Send a message and receive a stream of real-time updates.
*   `tasks/get`: Retrieve the status and artifacts of a previously created task.
*   `tasks/cancel`: Request to cancel a running task.
*   `tasks/pushNotification/set`: Register a webhook URL to receive updates when a task's status changes.
*   `tasks/pushNotification/get`: Retrieve the current push notification configuration for a task.

### Example: Sending a Message via A2A

You can interact with the A2A endpoint using `curl`:

```bash
curl -X POST 'http://localhost:8000/a2a/' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer your_api_key' \
  -d '{
  "jsonrpc": "2.0",
  "id": "request-1",
  "method": "message/send",
  "params": {
    "id": "task-001",
    "message": {
      "role": "user",
      "parts": [{ "type": "text", "text": "Hello, what is the capital of France?" }]
    }
  }
}'
```