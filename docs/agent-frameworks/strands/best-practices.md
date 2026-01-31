---
sidebar_position: 14
sidebar_label: "✅ Best Practices"
---

# Best Practices

## Configuration Design

1. **Clear Agent Roles**
   ```yaml
   # ✅ Good - Specific role and handoff instructions
   - researcher:
       system_prompt: |
         Research topics thoroughly using credible sources.
         When done, hand off to analyst for deeper analysis.
   
   # ❌ Bad - Vague role
   - agent1:
       system_prompt: Help with tasks.
   ```

2. **Meaningful Context**
   ```yaml
   # ✅ Good - Analyst needs researcher's output
   - analyst:
       context: [researcher]
   
   # ❌ Bad - Unnecessary context
   - analyst:
       context: [researcher, writer, coordinator]  # Too many
   ```

3. **Tool Assignment**
   ```yaml
   # ✅ Good - Only assign needed tools
   - data_analyst:
       tools: [calculator]
   
   # ❌ Bad - All agents get all tools
   tools:
     - calculator
     - file_reader
     - web_scraper
     # All agents get everything
   ```

## Security

1. **Use Environment Variables**
   ```yaml
   # ✅ Good
   model:
     model_id: us.anthropic.claude-sonnet-4-20250514-v1:0
     # AWS credentials from environment
   
   # ❌ Bad
   model:
     api_key: "hardcoded-key"  # Never do this
   ```

2. **Validate Tool Access**
   - Only assign tools that agents need
   - Use MCP servers with appropriate permissions
   - Implement proper error handling

## Performance

1. **Choose the Right Pattern**
   - Use `sequential` for simple single-agent tasks
   - Use `graph` for complex multi-agent collaboration
   - Use `swarm` for parallel processing needs

2. **Model Selection**
   ```yaml
   # For complex reasoning
   model:
     model_id: us.anthropic.claude-sonnet-4-20250514-v1:0
   
   # For faster, simpler tasks
   model:
     model_id: us.anthropic.claude-3-haiku-20240307-v1:0
   ```

3. **Session Management**
   - Use consistent session IDs for related queries
   - Clean up old session files periodically
   - Monitor session output sizes
