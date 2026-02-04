---
sidebar_position: 8
sidebar_label: "📚 Knowledge Base"
---

# Knowledge Base Integration

You can equip your agents with a custom knowledge base (RAG) to answer questions based on specific documents.

## Common Configuration

All knowledge base configurations share these common settings, which are optional and configurable:

```yaml
knowledge_base:
  - name: my_kb
    description: "Description of the knowledge base"
    # ... vector_store config ...
    
    # Optional: Configure embedding model
    embedding:
      model_id: "text-embedding-3-small"
      region_name: "us-west-2" # Optional
      
    # Optional: List of documents to index
    data_sources:
      - path: "docs/document.pdf"
      
    # Optional: Configure text splitting strategy
    text_splitter:
      type: "recursive_character"
      chunk_size: 1000
      chunk_overlap: 200
      
    # Optional: Configure retrieval parameters
    retrieval_settings:
      top_k: 5
      score_threshold: 0.7
```

## Vector Store Configuration

The framework supports multiple vector store backends. Choose the one that fits your needs.

### 1. ChromaDB (Default)
Good for local development and simple deployments.

```yaml
knowledge_base:
  - name: local_kb
    description: "Local document search"
    vector_store:
      type: chroma
      settings:
        collection_name: "my_collection"
        persist_directory: "./data/chroma"
    # ... common settings ...
```

### 2. Postgres (pgvector)
Ideal for production environments using PostgreSQL.

```yaml
knowledge_base:
  - name: postgres_kb
    description: "Enterprise document search"
    vector_store:
      type: postgres
      settings:
        collection_name: "enterprise_docs"
        # Option 1: Connection String (Not recommended for passwords)
        # connection_string: "postgresql://user:pass@localhost:5432/mydb"
        
        # Option 2: Individual Parameters (Recommended)
        db_host: "localhost"
        db_port: "5432"
        db_user: "user"
        db_name: "mydb"
        # Note: db_password should NOT be in YAML.
        # Use environment variables with DB_NAME suffix:
        # DB_HOST_MYDB, DB_PORT_MYDB, DB_USER_MYDB, DB_PASSWORD_MYDB
    # ... common settings ...
```

### 3. S3 (Simple Vector Store)
Lightweight, serverless option storing index in S3. Good for read-heavy, low-write scenarios.

```yaml
knowledge_base:
  - name: s3_kb
    description: "Cloud document search"
    vector_store:
      type: s3
      settings:
        collection_name: "cloud_docs"
        bucket_name: "my-vector-store-bucket"
        prefix: "indexes" # Optional
    # ... common settings ...
```

## Global Knowledge Base

A global knowledge base is automatically queried and the relevant context is appended to the user's message before it reaches the agent.

```yaml
knowledge_base:
  - name: company_policies
    description:  "Search company policies, HR guidelines, and internal procedures"
    vector_store:
      type: chroma
      settings:
        collection_name: "company policies"
        persist_directory: "./rag_db"
    embedding:
      model_id: "bedrock/amazon.titan-embed-text-v1"
      region_name: "us-west-2"
    data_sources:
      - path: "docs/sample_policy.pdf"
    text_splitter:
      type: "recursive_character"
      chunk_size: 1000
      chunk_overlap: 200
    retrieval_settings:
        top_k: 5
        score_threshold: 0.7
```

## Agent-Specific Knowledge Base

You can also assign a knowledge base as a tool to a specific agent. This allows the agent to decide when to query the knowledge base.

```yaml
agent_list:
  - policy_expert:
      role: Policy Expert
      goal: Answer policy questions
      backstory: You are an HR expert.
      knowledge_base:
        - name: "company_policies"
          description: "Search company policies"
          vector_store:
            type: chroma
            settings:
              collection_name: "policies"
              persist_directory: "./rag_db"
          embedding:
            model_id: "bedrock/amazon.titan-embed-text-v1"
          data_sources:
            - path: "docs/policy.pdf"
          text_splitter:
            type: "recursive_character"
            chunk_size: 1000
            chunk_overlap: 200
          retrieval_settings:
              top_k: 5
              score_threshold: 0.7
```
