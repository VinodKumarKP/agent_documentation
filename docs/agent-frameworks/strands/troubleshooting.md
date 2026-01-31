---
sidebar_position: 15
sidebar_label: "🔧 Troubleshooting"
---

# Troubleshooting

## Common Issues

**Issue: "Agent not initialized"**
```python
# Solution: Always call initialize() before use
await agent.initialize()
result = await agent.ainvoke("Query")
```

**Issue: "Tool not found"**
```yaml
# Problem: Tool referenced but not defined
# Solution: Define tool in tools section

tools:
  missing_tool:
    module: tool_module
```

**Issue: "Context agent not found"**
```yaml
# Problem: Context references non-existent agent
context:
  - nonexistent_agent  # Agent doesn't exist

# Solution: Verify agent key matches
agent_list:
  - actual_agent_name:  # Use this in context
      system_prompt: "..."
```

**Issue: "AWS credentials not found"**
```bash
# Solution: Configure AWS credentials
aws configure
# Or set environment variables
export AWS_ACCESS_KEY_ID=xxx
export AWS_SECRET_ACCESS_KEY=xxx
export AWS_DEFAULT_REGION=us-west-2
```

## Debugging

1. **Enable Verbose Logging**
   ```yaml
   crew_config:
     verbose: true
   ```

2. **Check Agent Information**
   ```python
   info = agent.get_agent_info()
   print(f"Initialized: {info['initialized']}")
   print(f"Pattern: {info['orchestration']['pattern']}")
   ```

3. **Validate Configuration**
   ```python
   diagnostics = agent.validate_tasks()
   print(f"Agents: {diagnostics['agents']}")
   print(f"Tools: {diagnostics['tools']}")
   print(f"Variables: {diagnostics['input_variables']}")
   ```

4. **Monitor Session Output**
   ```python
   # Check session output file
   session_file = f"output/{agent.session_id}/output.jsonl"
   with open(session_file) as f:
       for line in f:
           print(json.loads(line))
   ```

## AWS Bedrock Issues

**Issue: Model not available in region**
```yaml
# Solution: Check model availability and update region
model:
  model_id: us.anthropic.claude-sonnet-4-20250514-v1:0
  region_name: us-east-1  # Try different region
```

**Issue: Throttling errors**
```python
# Solution: Implement retry logic or request quota increase
# Contact AWS support for increased limits
```
