---
sidebar_position: 12
---

# Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Agent not found | Verify agent folder name matches config filename |
| Import errors | Check `oai_agent_core` and specific agent core imports |
| Server won't start | Check port availability in config YAML |
| Agent crashes on startup | Verify all required environment variables set |
| MCP tools not working | Verify MCP server configuration in YAML |
| Multi-agent fails | Ensure all sub-agents exist in agents directory |
| 404 on endpoints | Confirm server.py is running, not agent_http.py |
