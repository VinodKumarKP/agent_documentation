---
sidebar_position: 4
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
  - custom_knowledge_base:
      db_name: "my_kb"
      embedding_model_id: "amazon.titan-embed-text-v1"
      persist_directory: "./data/chroma"
      docs:
        - "./documents/policy.pdf"
        - "./documents/specs.docx"

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
  pattern: "graph"  # graph, swarm, sequential, agents_as_tools
  entry_agent: "agent_key"  # Required for graph/swarm
  verbose: true
```
