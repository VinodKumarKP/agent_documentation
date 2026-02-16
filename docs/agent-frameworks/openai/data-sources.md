---
sidebar_position: 8
sidebar_label: "📂 Data Sources"
---

# Data Sources

The framework supports loading data from various sources to ground your agents.

## Supported Sources

1.  **Local Files**: Load documents directly from the file system.
2.  **S3 Buckets**: Download and sync documents from AWS S3 buckets.

## Configuration Example

```yaml
knowledge_base:
  - name: "my_knowledge_base"
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
