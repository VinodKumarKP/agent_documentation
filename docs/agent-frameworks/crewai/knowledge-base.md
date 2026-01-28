---
sidebar_position: 8
---

# Knowledge Base Integration

You can equip your agents with a custom knowledge base (RAG) to answer questions based on specific documents.

## Global Knowledge Base

A global knowledge base is automatically queried and the relevant context is appended to the user's message before it reaches the agent.

```yaml
knowledge_base:
  - settings:
      db_name: "company_policies"
      embedding_model_id: "text-embedding-3-small"
      persist_directory: "./data/chroma"
      similarity_threshold: 0.7  # Global threshold for all KBs
  - custom_knowledge_base:
      docs:
        - "./docs/hr_policy.pdf"
        - "./docs/it_policy.txt"
      # Optional: Override threshold for this specific KB
      # similarity_threshold: 0.8
      # Optional: Configure text splitting
      # text_splitter:
        # chunk_size: 1000
        # chunk_overlap: 200
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
        - custom_knowledge_base:
            db_name: "policies"
            docs: ["./docs/policy.pdf"]
```
