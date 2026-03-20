---
sidebar_position: 7
sidebar_label: "📂 Data Sources"
---

# Data Sources

The `BaseKnowledgeBaseFactory` and `BaseDocumentLoader` support loading data from various sources to ground your agents.

## Supported Sources

1.  **Local Files**: Load documents directly from the file system.
2.  **S3 Buckets**: Download and sync documents from AWS S3 buckets.

## Configuration Example

You can configure data sources in your agent's YAML configuration under the `knowledge_base` section:

```yaml
knowledge_base:
  - name: "my_knowledge_base"
    description: "Company documentation and manuals."
    vector_store:
      type: "chroma"
      settings:
        collection_name: "docs_collection"
        persist_directory: "./data/chroma_db"
    embedding:
      model_id: "amazon.titan-embed-text-v1"
    
    data_sources:
      # 1. Local File Source
      - type: "file"
        path: "/path/to/local/documents/*.pdf"
        chunk_size: 1000
        chunk_overlap: 200

      # 2. S3 Bucket Source
      - type: "s3"
        bucket: "my-company-docs-bucket"
        prefix: "manuals/"  # Optional: specific folder
        # Files are downloaded to {persist_directory}/s3_bucket/{bucket_name}/...
```

## How S3 Loading Works
*   **Syncing**: The loader checks the S3 bucket for new or modified files (based on file size) compared to what has already been loaded.
*   **Downloading**: Only new/modified files are downloaded to a local cache directory.
*   **Metadata**: The `source` metadata field in the vector store is automatically updated to reflect the `s3://` URI (e.g., `s3://my-bucket/manuals/guide.pdf`) instead of the local temporary path.
