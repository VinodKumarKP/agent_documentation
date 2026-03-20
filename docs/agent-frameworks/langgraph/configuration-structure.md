---
sidebar_position: 5
sidebar_label: "⚙️ Configuration Structure"
---

# Configuration

The entire behavior of your agent is defined in a single, powerful YAML file located in `src/ptr_agent_servers_{agent_name}/agents_config/`. This declarative approach allows you to build and modify complex agent systems without writing extensive boilerplate code.

## Minimal Example

For a simple, single-agent system, your configuration can be very concise.

```yaml
# 1. Define the model
model:
  model_id: "gpt-4o"
  cloud_provider: "openai"

# 2. Define the agent
agent_list:
  - researcher:
      system_prompt: "You are a helpful research assistant."

# 3. (Optional) Define a tool
tools:
  search:
    module: "langchain_community.tools"
    class: "DuckDuckGoSearchRun"
```

## Complete YAML Template

This template shows all the possible configuration options available. You can mix and match sections based on your needs.

```yaml
# 1. Model Configuration: Defines the LLM to be used.
model:
  model_id: "gpt-4o"
  cloud_provider: "openai" # Options: openai, anthropic, aws, etc.
  params:  # Optional: Override default model parameters
    temperature: 0.7
    max_tokens: 4096

# 2. Architecture Configuration: Defines the multi-agent pattern.
crew_config:
  pattern: "supervisor" # Options: supervisor, swarm, agent-as-tool
  structured_output_model: "SupervisorOutputModel" # Optional: Pydantic model for the supervisor's final output.
  enable_lazy_loading: true # Optional: Enable lazy loading for MCP tools.

# 3. Tools Definition: A global registry of tools available to agents.
tools:
  my_tool:
    module: "my_tool_module"
    class: "MyToolClass"

# 4. Skills Definition: A global registry of skills available to agents.
skills:
  skill_dir: "./skills"

# 5. Structured Output: Defines the Pydantic models for structured responses.
structured_output:
  script_dir: "./structured_output"

# 6. Knowledge Base: Provides documents for Retrieval-Augmented Generation (RAG).
knowledge_base:
  - name: "company_docs"
    description: "Search company policies and internal procedures."
    vector_store:
      type: "chroma"
      settings:
        collection_name: "company_docs_collection"
        persist_directory: "./rag_db"
    data_sources:
      - type: "file"
        path: "docs/policy.pdf"

# 7. Memory: Enables the agent to remember past conversations.
memory:
  vector_store:
    type: "chroma"
    settings:
      collection_name: "chat_memory"
      persist_directory: "./memory_db"
  settings:
    max_recent_turns: 5
    max_relevant_turns: 3

# 8. MCP Servers: Connects to external tools via the Model Context Protocol.
mcps:
  filesystem_server:
    command: "mcp-server-filesystem"
    args: ["/data"]

# 9. Guardrails: Adds input and output validation.
guardrails:
  validators:
    - name: "profanity_check"
      full_name: "guardrails/profanity_free"
      on_fail: "fix"
  output:
    validators:
      - ref: "profanity_check"

# 10. Agent Definitions: The list of agents in the system.
agent_list:
  - researcher:
      system_prompt: "You are a research assistant."
      tools: ["my_tool"] # Assign tools from the global registry.
      skills: ["my_skill"] # Assign skills from the global registry.
      knowledge_base: ["company_docs"] # Assign a knowledge base.
      structured_output_model: "MyOutputModel" # Optional: Specify a Pydantic model for structured output.

# 11. Supervisor System Prompt: Instructions for the main supervisor agent.
system_prompt: "You are a supervisor. Your job is to manage the agents."
```
