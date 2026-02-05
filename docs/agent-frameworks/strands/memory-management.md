---
sidebar_position: 9
sidebar_label: "🧠 Memory Management"
---

# Memory Management

The framework supports persistent memory to maintain context across sessions. This allows agents to recall previous interactions and provide more personalized responses.

## Memory Configuration

Add a `memory` section to your YAML configuration. The vector store is configurable (Chroma, Postgres, S3). Please refer to the respective vector store configuration sections above for details on settings.

```yaml
memory:
  vector_store:
    type: chroma # Options: chroma, postgres, s3
    settings:
      collection_name: "chat_memory"
      persist_directory: "./memory_db"
      # For Postgres:
      # db_host: "localhost"
      # db_port: "5432"
      # db_user: "user"
      # db_name: "mydb"
      # For S3:
      # bucket_name: "my-bucket"
  embedding:
    model_id: "bedrock/amazon.titan-embed-text-v1"
    region_name: "us-west-2"
  settings:
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
