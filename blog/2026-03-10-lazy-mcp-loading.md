---
slug: lazy-mcp-loading
title: Optimizing Agent Performance with Lazy MCP Loading
authors: [vinodkumarkp]
tags: [performance, mcp, optimization, tools]
---

As AI agents become more capable, they often need access to an increasing number of tools. However, loading the schemas for dozens of tools from Model Context Protocol (MCP) servers at startup can significantly increase latency and token usage.

Today, we're introducing **Lazy MCP Loading** across our agent frameworks to solve this problem.

<!--truncate-->

## The Problem: Information Overload

Traditionally, when an agent initializes, it fetches the full schema (name, description, parameters) for every available tool. 

If you have 50 tools connected via MCP servers:
1.  **Startup Latency**: The agent must wait for all servers to respond.
2.  **Context Window Bloat**: All tool schemas are injected into the system prompt, consuming valuable tokens.
3.  **Cost**: You pay for these tokens on every single turn, even if the agent only uses one tool.

## The Solution: Just-in-Time Discovery

Lazy loading changes this workflow. Instead of loading everything upfront, the agent is initially given only a lightweight list of available tool names.

### How It Works

1.  **Discovery**: The agent sees a list of tool names (e.g., `["weather_tool", "stock_price", "file_reader"]`).
2.  **Intent**: When the agent decides it *might* need a tool (e.g., "I should check the weather"), it requests the schema for just that specific tool.
3.  **Schema Retrieval**: The framework fetches the full parameter details from the MCP server in real-time.
4.  **Execution**: The agent then constructs the tool call with the correct parameters.

## Enabling Lazy Loading

This feature is now available in `langgraph`, `openai`, and `strands` frameworks. Simply update your configuration:

```yaml
crew_config:
  # ... other config
  enable_lazy_loading: true
```

## Benefits

*   **Faster Startup**: Agents initialize almost instantly, regardless of how many tools are connected.
*   **Reduced Token Usage**: You only pay for the schema tokens when a tool is actually relevant.
*   **Scalability**: Connect hundreds of tools without overwhelming the LLM's context window.

Start optimizing your agents today by enabling lazy loading in your next deployment!
