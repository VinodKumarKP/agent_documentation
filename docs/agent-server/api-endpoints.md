---
sidebar_position: 4
---

# API Endpoints

## Chat

*   **POST** `/chat`: Send a message to the agent and get a complete response.
*   **POST** `/chat/with-files`: Send a message with file uploads.
*   **POST** `/chat/stream`: Send a message and receive a streaming response (SSE).
*   **POST** `/chat/stream/with-files`: Streaming chat with file uploads.

## Management

*   **POST** `/agent/initialize`: Re-initialize the agent.
*   **GET** `/agent/info`: Get details about the running agent.
*   **POST** `/restart`: Gracefully restart the server.
*   **POST** `/kill`: Immediately kill the server process.

## Logs

*   **GET** `/logs`: Retrieve chat logs with filtering options (session_id, user_id, date range).
*   **GET** `/logs/sessions/{session_id}`: Get logs for a specific session.
*   **GET** `/logs/stats`: Get usage statistics.
*   **GET** `/logs/stats/users`: Get usage statistics grouped by user.

## System

*   **GET** `/health`: Simple health check.
*   **GET** `/status`: Detailed server status (uptime, active requests).
*   **GET** `/prompts`: View configured prompts.
