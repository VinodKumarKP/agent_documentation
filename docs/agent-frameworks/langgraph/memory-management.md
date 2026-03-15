---
sidebar_position: 10
sidebar_label: "🧠 Memory Management"
---

# Memory Management

Enable your agents to remember past conversations and learn from interactions over time. The framework's memory management system provides both short-term and long-term memory, ensuring conversations are coherent and context-aware.

### How It Works

When memory is enabled, the system automatically saves each user query and agent response. Before the agent processes a new query, the memory system retrieves relevant history and adds it to the prompt. This gives the agent a "memory" of the conversation so far.

The retrieval process combines two types of memory:
1.  **Short-Term Memory**: The most recent turns of the conversation are always included. This keeps the immediate context fresh.
2.  **Long-Term Memory**: The system performs a semantic search over the entire conversation history to find past interactions that are most relevant to the current query. This allows the agent to recall details from much earlier in the conversation.

### Configuration Explained

To enable memory, add a `memory` section to your configuration file.

```yaml
memory:
  # --- Where to store conversation history ---
  vector_store:
    type: "chroma"  # Options: "chroma", "postgres", "s3".
    settings:
      collection_name: "chat_history_db"
      persist_directory: "./memory_db" # Folder to save the memory database.

  # --- How to understand the conversation for searching ---
  embedding:
    model_id: "bedrock/amazon.titan-embed-text-v1" # The AI model for vectorizing text.
    region_name: "us-west-2" # Optional, for cloud providers like AWS.

  # --- How to retrieve and use memory ---
  settings:
    # The number of the most recent conversation turns to always include.
    # This provides immediate, short-term context.
    max_recent_turns: 5

    # The maximum number of older, semantically relevant turns to retrieve.
    # This provides long-term memory by searching the history.
    max_relevant_turns: 3

    # The similarity score required for a past turn to be considered "relevant".
    # A lower value (e.g., 0.5) finds more, broader matches.
    # A higher value (e.g., 0.8) finds more specific, direct matches.
    similarity_threshold: 0.6
```

### Vector Store Options

The memory system uses the same vector store options as the Knowledge Base. You can choose between `chroma`, `postgres`, and `s3`. Please refer to the **Vector Store Options** section under [Knowledge Base Integration](#knowledge-base-integration) for detailed configuration examples for each type.