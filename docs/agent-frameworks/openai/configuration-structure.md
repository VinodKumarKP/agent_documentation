---
sidebar_position: 4
sidebar_label: "⚙️ Configuration Structure"
---
# Configuration Structure

## Complete YAML Template

```yaml
# Model Configuration
model:
  model_id: gpt-4o
  cloud_provider: openai
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
  - settings:
      db_name: "my_kb"
      embedding_model_id: "text-embedding-3-small"
      persist_directory: "./data/chroma"
      similarity_threshold: 0.7  # Global threshold
  - custom_knowledge_base:
      docs:
        - "./documents/policy.pdf"
        - "./documents/specs.docx"
      text_splitter_settings: # Optional: Configure text splitting
        chunk_size: 1000
        chunk_overlap: 200

# Memory Configuration (Optional)
memory:
  db_name: "memory_db"
  embedding_model_id: "text-embedding-3-small"
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
        - custom_knowledge_base: ...

# Orchestration Configuration
crew_config:
  pattern: "supervisor"  # supervisor, handoff, agent-as-tool
  verbose: true
```
