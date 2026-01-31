---
sidebar_position: 2
sidebar_label: "🚀 Quick Start"
---

# Quick Start

A streamlined guide for developers to quickly build and test MCP servers.

## Prerequisites

- Python 3.11+
- Node.js 18+ (for testing) or
- Postman or similar API client (for testing)
- Redis (Optional, required if `AUTH_ENABLED=true`)
- Git configured with GitHub token for Capgemini-Innersource
- Docker (optional, for containerized testing)

## Setup

### 1. Create Repository
```bash
# Create from template: ptr_mcp_server_template
# Name format: ptr-mcp-{server_name}

# Clone your new repo
git clone {your_repo_url}
cd {your_repo}
```

### 2. Environment Setup
```bash
# Create and activate virtual environment
python3.11 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
cd mcp_server_registry
```

## Development

### 3. Create Your Tools Class
Create `mcp_servers_registry/utils/my_server_tools.py`:

```python
class MyServerTools:
    """Your server functionality."""
    
    def process_data(self, input: str) -> dict:
        """
        Process input data.
        
        Args:
            input (str): Data to process
            
        Returns:
            dict: Processing results
        """
        return {"result": f"Processed: {input}"}
    
    def _helper_method(self):
        """Private method - won't be exposed as tool."""
        pass
```

**Key Points:**
- Public methods = MCP tools (automatically exposed)
- Private methods (prefix `_`) = not exposed
- Must include type hints and docstrings

### 4. Create Server Config
Create `mcp_servers_registry/servers_config/{{mcp_server_name}}.yaml`:

```yaml
port: 8001  # Choose unique port > 8000
description: |-
  Brief description of what your server does.
  Explain key functionality and use cases.
tags:
  - relevant_tag1
  - relevant_tag2
environment:
  - KEY1:value1
  - KEY2:value2
```

### 5. Implement Server
```bash
# Create server directory
cd mcp_servers_registry/servers/
mkdir {{mcp_server_name}}
touch {{mcp_server_name}}/__init__.py
touch {{mcp_server_name}}/README.md
```

Create `{{mcp_server_name}}/server.py`:

```python
import os
import sys

project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

file_root = os.path.dirname(os.path.abspath(__file__))
path_list = [file_root, os.path.dirname(file_root), os.path.dirname(os.path.dirname(file_root))]
for path in path_list:
    if path not in sys.path:
        sys.path.append(path)

import nest_asyncio
nest_asyncio.apply()

from mcp_registry_servers.tools.my_server_tools import MyServerTools
from oai_mcp_server_core.core.base_mcp_server import BaseMCPServer
from oai_mcp_server_core.utils.logger_utils import get_logger

logger = get_logger()

class {{MCPServerClassName}}(BaseMCPServer):
    """My MCP server implementation."""
    
    def __init__(self):
        super().__init__(self.base_directory(__file__), 
                         object_list=[MyServerTools()],
                         source_file=__file__)

def main():
    server = {{MCPServerClassName}}()
    server.main()

if __name__ == "__main__":
    main()
```

### 6. ⚠️ CRITICAL: Update Dependencies

**Update `pyproject.toml`:**
```toml
[project]
name = "mcp_registry_servers_{category}"  # Change {category}
version = "1.0.0"

dependencies = [
    "mcp>=1.0.0",
    "python-dotenv>=1.0.0",
    # Add your new dependencies here
]
```

**Update `requirements.txt`:**
```txt
mcp>=1.0.0
python-dotenv>=1.0.0
# Add your new dependencies here
```
