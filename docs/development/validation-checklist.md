---
sidebar_position: 8
---

# Validation Checklist

- [ ] Configuration file created in `agents_config/`
- [ ] Agent class implemented in `agents/{name}/agent.py`
- [ ] HTTP server created in `agents/{name}/server.py`
- [ ] README.md created with documentation
- [ ] Server starts without errors
- [ ] POST /chat returns valid response
- [ ] POST /chat/stream returns streaming response
- [ ] GET /health returns OK
- [ ] GET /agent/info returns correct metadata
