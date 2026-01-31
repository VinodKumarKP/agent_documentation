---
sidebar_position: 2
sidebar_label: "📋 Prerequisites"
---

# Prerequisites

Before running the agent, ensure you have the necessary API keys set as environment variables based on your chosen `cloud_provider`:

```bash
# For OpenAI models
export OPENAI_API_KEY="sk-..."

# For Anthropic models
export ANTHROPIC_API_KEY="sk-ant-..."

# For AWS Bedrock
export AWS_ACCESS_KEY_ID="..."
export AWS_SECRET_ACCESS_KEY="..."
export AWS_DEFAULT_REGION="us-west-2"
```

You must also install the specific LangChain provider package for the model you intend to use:

```bash
pip install langchain-openai      # If using cloud_provider: openai
pip install langchain-anthropic   # If using cloud_provider: anthropic
pip install langchain-aws         # If using cloud_provider: aws
```
