---
sidebar_position: 9
sidebar_label: "🧠 Memory Management"
---
# Memory Management

The framework supports persistent memory to maintain context across sessions.

## Memory Configuration

```yaml
memory:
  db_name: "memory_db"
  embedding_model_id: "text-embedding-3-small"
  persist_directory: './memory_db'
  max_recent_turns: 5
  max_relevant_turns: 3
```
