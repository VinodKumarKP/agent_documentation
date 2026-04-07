---
sidebar_position: 3
sidebar_label: "▶️ Usage"
---
### Starting the Server

You can start the server using the installed command-line tool:

```bash
oai-agent-server <agent_name>
```

**Options:**

*   `agent_name`: The name of the agent configuration to load (Required).
*   `--port`, `-p`: Port to run the server on (default: 8000).
*   `--host`: Host to bind the server to (default: 0.0.0.0).
*   `--temperature`, `-t`: Override agent temperature.
*   `--max-tokens`, `-m`: Override agent max tokens.
*   `--allowed-modes`: List of allowed API modes (chat, agent, logs, health, a2a, schedule).

**Example:**

```bash
oai-agent-server my_agent --port 8080 --allowed-modes chat health schedule
```

### Environment Variables

The server respects the following environment variables:

**General:**
*   `AGENT_AUTH_ENABLED`: Set to `true` or `false` to enable/disable authentication (default: `true`).
*   `FORCE_AUTH`: Set to `true` to enforce authentication even on localhost (default: `false`).
*   `AGENT_REINITIALIZE`: If set to `true` in a request header, triggers agent re-initialization.
*   `AGENT_BASE_URL`: The public base URL for the agent, used to construct the Agent Card URL.

**Database Logging:**
*   `DB_LOGGING_ENABLED`: Set to `true` to enable database logging (default: `false`). Note: Database logging is required to persist scheduled jobs and their results.
*   `DB_TYPE`: The type of database to use (`postgres` or `sqlite`).
*   `LOGGING_DB_HOST`: Database host (for PostgreSQL).
*   `LOGGING_DB_PORT`: Database port (for PostgreSQL).
*   `LOGGING_DB_NAME`: Database name (for PostgreSQL) or path to the SQLite file.
*   `LOGGING_DB_USER`: Database user (for PostgreSQL).
*   `LOGGING_DB_PASSWORD`: Database password (for PostgreSQL).

**Redis (for Token Management):**
*   `REDIS_HOST`: Redis host (default: `localhost`).
*   `REDIS_PORT`: Redis port (default: `6379`).
