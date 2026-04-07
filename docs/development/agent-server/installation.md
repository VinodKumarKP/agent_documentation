---
sidebar_position: 2
sidebar_label: "🚀 Installation"
---

# Installation

You can install the server directly from the source:

```bash
# For basic functionality
pip install .

# For development
pip install -e .
```

### Optional Dependencies

The server uses optional dependencies for certain features. You can install them as needed:

*   **PostgreSQL Support**: For production-grade database logging.
    ```bash
    pip install .[postgres]
    ```
*   **SQLite Support**: For lightweight, file-based database logging.
    ```bash
    pip install .[sqlite]
    ```
*   **Agent-to-Agent (A2A) Protocol**: To enable the A2A communication features.
    ```bash
    pip install .[a2a]
    ```
*   **APScheduler Support**: To enable the scheduled jobs (`/schedule`) endpoints.
    ```bash
    pip install .[scheduler]
    ```
*   **All Features**: To install all optional dependencies.
    ```bash
    pip install .[all]
    ```
