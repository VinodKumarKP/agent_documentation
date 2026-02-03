---
sidebar_position: 4
sidebar_label: "⚙️ Configuration Structure"
---

# Configuration Structure

## Complete YAML Template

```yaml
# Model Configuration
model:
  model_id: us.anthropic.claude-sonnet-4-20250514-v1:0
  region_name: us-west-2
  params:  # Optional
    temperature: 0.7
    max_tokens: 4096

# Tools Definition
tools:
  tool_name:
    module: "module_name"
    class: "ToolClassName"  # Optional
    function_list:  # Optional: load specific functions
      - function_name
    base_path: "./path"  # Optional

# Knowledge Base Definition (Optional)
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

# Memory Configuration (Optional)
memory:
  db_name: "memory_db"
  embedding_model_id: "amazon.titan-embed-text-v1"
  persist_directory: './memory_db'
  max_recent_turns: 5
  max_relevant_turns: 3
  similarity_threshold: 0.6

# MCP Servers (Optional)
mcps:
  server_name:
    command: "server_command"
    args: ["arg1", "arg2"]

# Agent Definitions
agent_list:
  - agent_key:
      system_prompt: "Detailed instructions for the agent"
      context:  # Optional: agents this agent can see
        - other_agent_key
      tools:  # Optional: tools available to this agent
        - tool_name
      knowledge_base: # Optional: assign specific KB to agent
        - name: "company_policies"
          description: "Search company policies"
          vector_store: ...

# Orchestration Configuration
crew_config:
  pattern: "graph"  # graph, swarm, sequential, agents_as_tools
  entry_agent: "agent_key"  # Required for graph/swarm
  verbose: true
```
