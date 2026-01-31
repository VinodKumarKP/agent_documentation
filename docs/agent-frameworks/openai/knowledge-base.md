---
sidebar_position: 8
---
# Knowledge Base Integration

You can equip your agents with a custom knowledge base (RAG) to answer questions based on specific documents.

## Global Knowledge Base

A global knowledge base is automatically queried and the relevant context is appended to the user's message.

```yaml
knowledge_base:
  - settings:
      db_name: "company_policies"
      embedding_model_id: "text-embedding-3-small"
      persist_directory: "./data/chroma"
  - custom_knowledge_base:
      docs:
        - "./docs/hr_policy.pdf"
```

## Agent-Specific Knowledge Base

You can also assign a knowledge base as a tool to a specific agent.

```yaml
agent_list:
  - policy_expert:
      system_prompt: You answer questions about company policies. Use the search_knowledge_base tool.
      knowledge_base:
        - custom_knowledge_base:
            db_name: "policies"
            docs: ["./docs/policy.pdf"]
```
