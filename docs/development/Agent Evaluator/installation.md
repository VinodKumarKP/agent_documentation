---
sidebar_position: 2
sidebar_label: "🚀 Installation"
---

# Installation

```bash
pip install oai-agent-evaluator
```

To use advanced macros like `FAKER`, PDF/DOCX/PPT reading support, and external data fetching, install with the `macros` extra:

```bash
pip install "oai-agent-evaluator[macros]"
```

You can also install specific dependencies if you only need certain features:

```bash
pip install "oai-agent-evaluator[faker]"  # Only Faker support
pip install "oai-agent-evaluator[pdf]"    # Only PDF support
pip install "oai-agent-evaluator[docx]"   # Only DOCX support
pip install "oai-agent-evaluator[ppt]"    # Only PPT support
pip install "oai-agent-evaluator[excel]"  # Only Excel support
pip install "oai-agent-evaluator[ocr]"    # Only OCR support (images)
```

**Note:** The following macros have additional requirements:
- `HTTP_GET`: No additional dependencies (uses built-in `urllib`)
- `SQL_QUERY`: No additional dependencies (uses built-in `sqlite3`)
- `JSON_EXTRACT`: No additional dependencies (uses built-in `json`)
- `TEMPLATE`: No additional dependencies
- `CONCAT`, `SAMPLE`, `TRUNCATE`, `REPEAT`: No additional dependencies
- `TIMESTAMP`, `BUSINESS_DAYS_FROM`: No additional dependencies (uses built-in `datetime`)

*(Note: Adjust installation command based on your actual package publication or local path)*

## Requirements

- Python 3.11+
- `openai-agents` (or compatible library for LLM interaction)
- `pyyaml`
