---
sidebar_position: 8
sidebar_label: "📂 Data Sources"
---

# Data Sources

The framework supports loading data from various sources to ground your agents.

## Supported Sources

1.  **Local Files**: Load documents directly from the file system.
2.  **S3 Buckets**: Download and sync documents from AWS S3 buckets.
3.  **LangChain Document Loaders**: Use any document loader from the LangChain ecosystem.

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
        
      # 3. LangChain Document Loader
      - type: "langchain"
        loader: "WebBaseLoader"
        module: "langchain_community.document_loaders"
        args:
          - "https://blog.langchain.dev/announcing-langsmith/"
```

## LangChain Document Loaders

You can leverage the vast ecosystem of LangChain's document loaders to pull in data from almost any source.

To use a LangChain loader:
1.  Set the `type` to `langchain`.
2.  Specify the `loader` class name.
3.  Provide the `module` where the loader class is located.
4.  Use `args` to pass the required arguments to the loader's constructor.

You can find a full list of available loaders and their required arguments in the official [LangChain Document Loaders documentation](https://python.langchain.com/docs/integrations/document_loaders/).
