---
sidebar_position: 9
sidebar_label: "📚 Knowledge Base"
---

# Knowledge Base Integration

Give your agents access to custom information by setting up a knowledge base. This allows them to answer questions about specific documents or data you provide.

## How It Works

1.  **You provide documents**: Point the system to local files or S3 buckets.
2.  **Indexing**: The system reads, splits, and stores the content in a vector database, making it searchable.
3.  **Retrieval**: When a user asks a question, the system finds the most relevant information from the knowledge base.
4.  **Answering**: This information is given to the agent, who uses it to form a complete and accurate answer.

## Configuration Explained

Here’s a breakdown of the settings you can use to configure a knowledge base.

```yaml
knowledge_base:
  - name: "company_policies_kb"
    description: "Use this to answer questions about our company's HR policies and internal procedures."
    
    # --- Where to store the indexed data ---
    vector_store:
      type: "chroma"  # The database type. "chroma" is great for local use.
      settings:
        collection_name: "company_policies"
        persist_directory: "./rag_db"  # Folder to save the database on your computer.

    # --- How to understand your documents ---
    embedding:
      model_id: "bedrock/amazon.titan-embed-text-v1" # The AI model that converts text into searchable vectors.
      region_name: "us-west-2" # Required for some cloud providers like AWS.

    # --- Where to find your documents ---
    data_sources:
      - type: "file"
        path: "docs/hr_policy.pdf" # A local file.
      - type: "s3"
        bucket: "my-company-docs" # An AWS S3 bucket.
        prefix: "policies/" # A specific folder within the bucket.

    # --- How to break down your documents ---
    text_splitter:
      type: "recursive_character" # A smart way to split text while keeping sentences together.
      chunk_size: 1000 # The maximum size of each text chunk (in characters).
      chunk_overlap: 200 # How many characters to overlap between chunks to maintain context.

    # --- How to search for information ---
    retrieval_settings:
      top_k: 5 # The number of relevant chunks to retrieve for a given question.
      score_threshold: 0.7 # Only return chunks with a similarity score above this value (0.0 to 1.0).
```

## Vector Store Options

You can choose from several types of vector stores to save your indexed data.

### 1. ChromaDB (Default)
**Best for:** Local development and quick setups.
```yaml
vector_store:
  type: chroma
  settings:
    collection_name: "my_local_kb"
    persist_directory: "./data/chroma_db"
```

### 2. Postgres (using `pgvector`)
**Best for:** Production systems that already use PostgreSQL.
```yaml
vector_store:
  type: postgres
  settings:
    collection_name: "my_production_kb"
    db_host: "localhost"
    db_port: "5432"
    db_user: "myuser"
    db_name: "mydatabase"
    # IMPORTANT: Do not write your password here.
    # Set it as an environment variable: DB_PASSWORD_MYDATABASE
```

### 3. S3 (Simple, Serverless)
**Best for:** Read-heavy use cases where you want a lightweight, cloud-based solution without managing a database.
```yaml
vector_store:
  type: s3
  settings:
    collection_name: "my_s3_kb"
    bucket_name: "my-vector-data-bucket"
    prefix: "indexes/" # Optional folder inside the bucket.
```

## Two Ways to Use a Knowledge Base

### 1. Global Knowledge Base
A global knowledge base is automatically searched for every user query. The relevant context is added to the prompt before the agent sees it. This is useful for providing general context that should always be available.

```yaml
# This knowledge base will be used for all agents
knowledge_base:
  - name: "company_wide_info"
    # ... other settings ...
```

### 2. Agent-Specific Knowledge Base (as a Tool)
You can also give a knowledge base to a specific agent as a tool. This lets the agent decide *when* to search for information, which is more efficient for specialized tasks.

```yaml
agent_list:
  - policy_expert:
      system_prompt: "You are an expert on company policies. Use the 'search_company_policies_kb' tool to find information."
      knowledge_base:
        - name: "company_policies_kb"
          description: "Search for company policies and procedures."
          # ... other settings ...
```
