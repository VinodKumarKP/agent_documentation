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
  vector_store:
    type: chroma # Options: chroma, postgres, s3
    settings:
      collection_name: "chat_memory"
      persist_directory: "./memory_db"
  embedding:
    model_id: "bedrock/amazon.titan-embed-text-v1"
  settings:
    max_recent_turns: 5
    max_relevant_turns: 3
    similarity_threshold: 0.6

# MCP Servers (Optional)
mcps:
  server_name:
    command: "server_command"
    args: ["arg1", "arg2"]

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
      context:  # Optional: agents this agent can see
        - other_agent_key
      tools:  # Optional: tools available to this agent
        - tool_name

# Orchestration Configuration
crew_config:
  pattern: "supervisor"  # supervisor, handoff, agent-as-tool
  verbose: true
```
