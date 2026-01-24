---
sidebar_position: 6
---

# BaseAgent Abstract Methods

Any class inheriting from `BaseAgent` must implement the following methods:

| Method | Description | Async |
| :--- | :--- | :---: |
| `initialize()` | Initializes the agent's resources and connections. Must set `self._initialized = True`. | ✅ |
| `ainvoke(user_message, config)` | Asynchronously processes a message and returns the full response. | ✅ |
| `invoke(user_message, config)` | Synchronously processes a message and returns the full response. | ❌ |
| `astream(user_message, config)` | Asynchronously streams the response chunks. | ✅ |
| `stream(user_message, config)` | Synchronously streams the response chunks (or wraps async stream). | ✅ |
