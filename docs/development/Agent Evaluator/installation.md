---
sidebar_position: 2
sidebar_label: "🚀 Installation"
---

# Installation

```bash
pip install oai-agent-evaluator
```

To use advanced macros like `FAKER` and PDF/DOCX/PPT reading support, install with the `macros` extra:

```bash
pip install "oai-agent-evaluator[macros]"
```

You can also install specific dependencies if you only need certain features:

```bash
pip install "oai-agent-evaluator[faker]"  # Only Faker support
pip install "oai-agent-evaluator[pdf]"    # Only PDF support
pip install "oai-agent-evaluator[docx]"   # Only DOCX support
pip install "oai-agent-evaluator[ppt]"    # Only PPT support
pip install "oai-agent-evaluator[ocr]"    # Only OCR support (images)
```

*(Note: Adjust installation command based on your actual package publication or local path)*

## Requirements

- Python 3.11+
- `openai-agents` (or compatible library for LLM interaction)
- `pyyaml`
