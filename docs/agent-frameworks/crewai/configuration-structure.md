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
  cloud_provider: openai # openai, anthropic, aws, etc.
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
    env:
      KEY: "value"

# Agent Definitions
agent_list:
  - agent_key:
      role: "Agent Role"
      goal: "Agent Goal"
      backstory: "Agent Backstory"
      tools:  # Optional: tools available to this agent
        - tool_name
      knowledge_base: # Optional: assign specific KB to agent
        - custom_knowledge_base: ...

# Task Definitions
task_list:
  - task_key:
      description: "Task description"
      expected_output: "Expected output"
      agent: "agent_key"
      context:  # Optional: tasks this task depends on
        - other_task_key

# Crew Configuration
crew_config:
  process: "sequential" # or "hierarchical"
  verbose: true
```
