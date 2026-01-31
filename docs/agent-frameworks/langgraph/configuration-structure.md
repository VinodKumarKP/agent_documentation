---
sidebar_position: 5
sidebar_label: "⚙️ Configuration Structure"
---

# Configuration Structure

## Complete YAML Template

```yaml
# Model Configuration
model:
  model_id: gpt-4o
  cloud_provider: openai # openai, anthropic, aws, etc.
  params:  # Optional
    temperature: 0.7
    max_tokens: 4096

# Architecture Configuration (Optional, defaults to supervisor)
crew_config:
  pattern: supervisor # Options: supervisor, swarm, agent-as-tool

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
    env:
      KEY: "value"
  remote_server:
    url: "http://localhost:8000/sse"
    headers:
      Authorization: "Bearer token"

# Agent Definitions
agent_list:
  - agent_key:
      system_prompt: "Detailed instructions for the agent"
      context:  # Optional: agents this agent can see (for dependency tracking)
        - other_agent_key
      tools:  # Optional: tools available to this agent
        - tool_name
      knowledge_base: # Optional: assign specific KB to agent
        - custom_knowledge_base: ...

# Supervisor System Prompt (for multi-agent mode)
system_prompt: "Instructions for the supervisor agent managing the team."
```
