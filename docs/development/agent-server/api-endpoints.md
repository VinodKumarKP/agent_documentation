---
sidebar_position: 4
sidebar_label: "🔌 API Endpoints"
---
### Chat

*   **POST** `/chat`: Send a message to the agent and get a complete response.
*   **POST** `/chat/with-files`: Send a message with file uploads.
*   **POST** `/chat/stream`: Send a message and receive a streaming response (SSE).
*   **POST** `/chat/stream/with-files`: Streaming chat with file uploads.

### Scheduled Jobs

*   **POST** `/schedule`: Create a new scheduled agent job (recurring or one-time).
*   **POST** `/schedule/run`: Run an agent job immediately and stream the result.
*   **GET** `/schedule`: List all registered schedules.
*   **GET** `/schedule/results/{job_id}`: Get recent run results for a specific job.
*   **GET** `/schedule/results/{job_id}/stream`: Replay the SSE stream of a past job run.
*   **PUT** `/schedule/{job_id}/pause`: Pause a recurring schedule.
*   **PUT** `/schedule/{job_id}/resume`: Resume a paused schedule.
*   **DELETE** `/schedule/{job_id}`: Delete a schedule and its stored results.

### Agent-to-Agent (A2A)

*   **GET** `/a2a/.well-known/agent.json`: A2A Agent Card discovery.
*   **POST** `/a2a/`: JSON-RPC endpoint for A2A methods.

### Management

*   **POST** `/agent/initialize`: Re-initialize the agent.
*   **GET** `/agent/info`: Get details about the running agent.
*   **POST** `/restart`: Gracefully restart the server.
*   **POST** `/kill`: Immediately kill the server process.

### Logs

*   **GET** `/logs`: Retrieve chat logs with filtering options (session_id, user_id, date range).
*   **GET** `/logs/sessions/{session_id}`: Get logs for a specific session.
*   **GET** `/logs/stats`: Get usage statistics.
*   `GET` `/logs/stats/users`: Get usage statistics grouped by user.

### System

*   **GET** `/health`: Simple health check.
*   **GET** `/status`: Detailed server status (uptime, active requests).
*   **GET** `/prompts`: View configured prompts.
