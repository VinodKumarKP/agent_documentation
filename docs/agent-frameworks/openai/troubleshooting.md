---
sidebar_position: 16
---
# Troubleshooting

## Common Issues

**Issue: "Agent not initialized"**
```python
# Solution: Always call initialize() before use
await agent.initialize()
```

**Issue: "Tool not found"**
```yaml
# Solution: Ensure tool is defined in the 'tools' section and the module path is correct.
```

**Issue: "OpenAI API Key missing"**
```bash
# Solution: Set OPENAI_API_KEY environment variable
export OPENAI_API_KEY=sk-...
```
