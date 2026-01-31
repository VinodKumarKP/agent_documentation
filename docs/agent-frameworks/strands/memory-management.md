---
sidebar_position: 9
sidebar_label: "🧠 Memory Management"
---

# Memory Management

The framework supports persistent memory to maintain context across sessions. This allows agents to recall previous interactions and provide more personalized responses.

## Memory Configuration

Add a `memory` section to your YAML configuration:

```yaml
memory:
  db_name: "memory_db"
  embedding_model_id: "amazon.titan-embed-text-v1"
  persist_directory: './memory_db'
  max_recent_turns: 5       # Number of recent turns to include
  max_relevant_turns: 3     # Number of semantically relevant past turns to include
  similarity_threshold: 0.6 # Threshold for semantic relevance (0.0 to 1.0)
```

## How It Works

1. **Storage**: Every interaction (user query + agent response) is stored in a vector database.
2. **Retrieval**: Before processing a new query, the system retrieves:
   - The most recent conversation turns (short-term memory)
   - Semantically relevant past interactions (long-term memory)
3. **Augmentation**: This context is automatically appended to the user's prompt, allowing the agent to "remember" past details.
