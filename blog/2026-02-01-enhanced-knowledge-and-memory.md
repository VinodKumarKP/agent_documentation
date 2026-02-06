---
slug: enhanced-knowledge-and-memory
title: Enhanced Knowledge Base and Memory Support
authors: [vinodkumarkp]
tags: [knowledge-base, memory, vector-store, rag, chroma, postgres, s3]
---

We are thrilled to announce significant enhancements to the OAI Agent Framework's Knowledge Base and Memory systems. These updates provide greater flexibility and scalability for building intelligent agents.

<!--truncate-->

## 📚 Multiple Knowledge Bases & Mix-and-Match Vector Stores

Agents can now connect to **multiple knowledge bases simultaneously**, and each knowledge base can use a **different vector store backend**. This allows you to architect complex information retrieval strategies.

For example, you can have:
- A local **ChromaDB** for fast, temporary project documents.
- A robust **PostgreSQL (pgvector)** database for enterprise-wide company policies.
- An **S3-based** vector store for archiving large datasets.

### Configuration Example

```yaml
knowledge_base:
  - name: project_docs
    description: "Project specific documentation"
    vector_store:
      type: chroma
      settings:
        collection_name: "project_alpha"
        persist_directory: "./data/chroma"
        
  - name: company_policies
    description: "Enterprise HR and IT policies"
    vector_store:
      type: postgres
      settings:
        collection_name: "policies"
        db_host: "localhost"
        db_port: "5432"
        db_user: "admin"
        db_name: "vectordb"
```

Agents can then be assigned specific knowledge bases, or access all of them globally.

## 🧠 Expanded Memory Store Support

The agent's long-term memory—which stores conversation history for context-aware interactions—now also supports multiple backends. You are no longer limited to just local files.

### Supported Backends:
1.  **ChromaDB**: The default, easy-to-setup option for local development.
2.  **PostgreSQL (pgvector)**: Perfect for production environments requiring high concurrency and reliability.
3.  **S3 (Simple Vector Store)**: A cost-effective, serverless option for scalable storage.

### Memory Configuration

```yaml
memory:
  vector_store:
    type: postgres
    settings:
      collection_name: "agent_memory"
      db_host: "postgres-server"
      db_name: "agent_db"
  embedding:
    model_id: "text-embedding-3-small"
  settings:
    max_recent_turns: 10
    max_relevant_turns: 5
```

## Why This Matters

*   **Scalability**: Move from local prototypes to enterprise-grade production systems without changing your agent logic.
*   **Flexibility**: Choose the right storage tool for the specific type of data (e.g., S3 for archives, Postgres for transactional data).
*   **Context**: Richer, more persistent memory enables agents to have more meaningful, long-term interactions with users.

Upgrade your agent framework today to leverage these powerful new features!
