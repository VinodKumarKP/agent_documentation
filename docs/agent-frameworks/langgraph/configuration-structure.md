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
      - type: "file"
        path: "docs/sample_policy.pdf"
      - type: "s3"
        bucket: "my-docs-bucket"
        prefix: "policies/"
    text_splitter:
      type: "recursive_character"
      chunk_size: 1000
      chunk_overlap: 200
    retrieval_settings:
        top_k: 5
        score_threshold: 0.7

# Memory Configuration (Optional)
memory:
  vector_store:
    type: chroma # Options: chroma, postgres, s3
    settings:
      collection_name: "chat_memory"
      persist_directory: "./memory_db"
  embedding:
    model_id: "bedrock/amazon.titan-embed-text-v1"
    region_name: "us-west-2"
  settings:
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

# Guardrails Configuration (Optional)
guardrails:
  enable_agent_validation: false
  custom_validators_dir: "custom_guardrails"
  validators:
    - name: competitor_check
      full_name: guardrails/competitor_check
      parameters:
        competitors: [ "Apple", "Samsung" ]
      on_fail: "fix"
    - name: json_validator
      full_name: ValidJson
      module: valid_json
      on_fail: "noop"
  input:
    validators:
      - ref: competitor_check
  output:
    validators:
      - ref: json_validator

# Agent Definitions
agent_list:
  - agent_key:
      system_prompt: "Detailed instructions for the agent"
      context:  # Optional: agents this agent can see (for dependency tracking)
        - other_agent_key
      tools:  # Optional: tools available to this agent
        - tool_name
      knowledge_base: # Optional: assign specific KB to agent
        - name: "company_policies"
          description: "Search company policies"
          vector_store: ...

# Supervisor System Prompt (for multi-agent mode)
system_prompt: "Instructions for the supervisor agent managing the team."
```
