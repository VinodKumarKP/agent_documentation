---
sidebar_position: 4
sidebar_label: "⚙️ Configuration Structure"
---

# Configuration

The entire behavior of your agent is defined in a single, powerful YAML file located in `src/ptr_agent_servers_{agent_name}/agents_config/`. This declarative approach allows you to build and modify complex agent systems without writing extensive boilerplate code.

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

# 2. Crew Configuration: Defines the multi-agent process.
crew_config:
  process: "sequential" # or "hierarchical"
  manager_llm: "gpt-4o" # Optional: Specify a different model for the manager in hierarchical mode.

# 3. Tools Definition: A global registry of tools available to agents.
tools:
  my_tool:
    module: "my_tool_module"
    class: "MyToolClass"

# 4. Knowledge Base: Provides documents for Retrieval-Augmented Generation (RAG).
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

# 5. Memory: Enables the agent to remember past conversations.
memory:
  vector_store:
    type: "chroma"
    settings:
      collection_name: "chat_memory"
      persist_directory: "./memory_db"
  settings:
    max_recent_turns: 5
    max_relevant_turns: 3

# 6. MCP Servers: Connects to external tools via the Model Context Protocol.
mcps:
  filesystem_server:
    command: "mcp-server-filesystem"
    args: ["/data"]

# 7. Guardrails: Adds input and output validation.
guardrails:
  validators:
    - name: "profanity_check"
      full_name: "guardrails/profanity_free"
      on_fail: "fix"
  output:
    validators:
      - ref: "profanity_check"

# 8. Agent Definitions: The list of agents in the system.
agent_list:
  - researcher:
      role: "Researcher"
      goal: "To find the most relevant and up-to-date information."
      backstory: "An expert in web scraping and data collection."
      tools: ["my_tool"] # Assign tools from the global registry.
      knowledge_base: ["company_docs"] # Assign a knowledge base.

# 9. Task Definitions: The list of tasks to be executed by the agents.
task_list:
  - research_task:
      description: "Research the impact of AI on the job market."
      expected_output: "A detailed report summarizing the key findings."
      agent: "researcher"
      context: [] # Optional: List of other task keys this task depends on.
```
