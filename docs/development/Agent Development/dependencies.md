---
sidebar_position: 11
sidebar_label: "📦 Dependencies"
---

# ⚠️ CRITICAL: Update Dependencies

**Update `pyproject.toml`:**
```toml
[project]
name = "agentic_registry_agents_{category}"  # Change {category}
authors = [{name = "{{Name of the author}}", email = "{Email address of the author}"}]
dependencies = [
    "mcp>=1.0.0",
    "python-dotenv>=1.0.0",
    "oai-agent-core",
    "oai-agent-server",
    # Add specific core libraries based on your agent type:
    # "oai-langgraph-agent-core",  # For LangGraph Agents
    # "oai-aws-strands-agent-core", # For Strands Agents
    # "oai-crewai-agent-core",      # For CrewAI Agents
]
```

**Update `requirements.txt`:**
```txt
mcp>=1.0.0
python-dotenv>=1.0.0
oai-agent-core
oai-agent-server
# Add specific core libraries based on your agent type
```
