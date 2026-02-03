---
sidebar_position: 8
sidebar_label: "📚 Knowledge Base"
---

# Knowledge Base Integration

You can equip your agents with a custom knowledge base (RAG) to answer questions based on specific documents.

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
      system_prompt: You answer questions about company policies. Use the search_knowledge_base tool.
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
