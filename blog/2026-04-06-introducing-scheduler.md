---
title: "Introducing Scheduled Jobs in OAI Agent Server"
authors: [vinodkumarkp]
tags: [oai, agent-server, scheduler, fastapi, apscheduler]
---

We are thrilled to announce a major new feature in the OAI Agent Server: **Scheduled Jobs**. Powered by the robust APScheduler library, this feature allows you to create, manage, and run agent tasks on a recurring or one-time basis.

This makes it easier than ever to automate workflows, run periodic reports, or trigger agent interactions without manual intervention.

## Key Features

*   **Flexible Scheduling**: Define jobs to run at fixed intervals, specific dates, or using cron-like expressions.
*   **Persistent Jobs**: When database logging is enabled (using PostgreSQL or SQLite), your schedules are saved and will survive server restarts.
*   **Full Management API**: A comprehensive set of RESTful endpoints to control every aspect of your scheduled jobs.

## New API Endpoints

The `/schedule` endpoints provide full control over your agent's jobs:

*   **`POST /schedule`**: Create a new scheduled job.
*   **`POST /schedule/run`**: Trigger a job to run immediately.
*   **`GET /schedule`**: List all currently registered schedules.
*   **`GET /schedule/results/{job_id}`**: Retrieve the history of runs for a specific job.
*   **`PUT /schedule/{job_id}/pause`**: Temporarily pause a recurring job.
*   **`PUT /schedule/{job_id}/resume`**: Resume a paused job.
*   **`DELETE /schedule/{job_id}`**: Remove a job and all its history.

## Getting Started

To enable this feature, you need to install the server with the optional `scheduler` dependency:

```bash
pip install .[scheduler]
```

Database logging is required for persistence, so make sure it's configured in your environment.

For more details, check out the updated [API Endpoints documentation](/docs/development/agent-server/api-endpoints).
