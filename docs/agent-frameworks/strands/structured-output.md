---
sidebar_position: 13
sidebar_label: "📝 Structured Output"
---

# Structured Output

Ensure your agent's responses are predictable and machine-readable by defining a structured output format. This is useful when you need the agent to return data that can be programmatically processed, such as JSON with a specific schema.

## How It Works

1.  **Define a Pydantic Model**: Create a Python file containing a Pydantic model. This model defines the exact schema (fields, types, and descriptions) of the output you expect from the agent.
2.  **Configure the `structured_output` Directory**: In your main YAML configuration, specify the directory where your Pydantic models are located.
3.  **Assign the Model to an Agent**: In the `agent_list`, add the `structured_output_model` property to the desired agent and set its value to the name of your Pydantic class.

When the agent is invoked, the framework instructs the LLM to format its response according to the provided Pydantic model, ensuring the output is a valid, structured object.

## Example: Agent-Level Structured Output

**Step 1: Create a Pydantic Model**

Create a Python file (e.g., `structured_output/models.py`) and define your Pydantic model.

*Example: `structured_output/models.py`*
```python
from pydantic import BaseModel, Field

class EmailAnalysis(BaseModel):
    """
    Represents the structured analysis of an email's content.
    """
    summary: str = Field(description="A concise, one-line summary of the email's main topic.")
    requires_urgent_response: bool = Field(description="True if the email requires an immediate response.")
    sentiment: str = Field(description="The email's sentiment. Must be 'positive', 'negative', or 'neutral'.", enum=['positive', 'negative', 'neutral'])
```

**Step 2: Update Your Agent Configuration**

In your main YAML file, configure the `structured_output` directory and assign the model to your agent.

```yaml
model:
  model_id: "anthropic.claude-3-sonnet-20240229-v1:0"
  cloud_provider: "aws"

# 1. Tell the framework where your Pydantic models are located
structured_output:
  script_dir: "./structured_output"

agent_list:
  - email_analyzer:
      system_prompt: "Analyze the following email and provide a structured summary."
      # 2. Assign the Pydantic model to the agent
      structured_output_model: "EmailAnalysis"
```

Now, when the `email_analyzer` agent is invoked, its output will be a JSON object that conforms to the `EmailAnalysis` model's schema.

## Example: Supervisor-Level Structured Output

In a multi-agent supervisor pattern, you can enforce a structured output for the **final response** from the entry agent. This is useful for ensuring the overall result of the crew's work is in a consistent format.

To do this, add `structured_output_model` to the `crew_config` section.

```yaml
crew_config:
  pattern: "graph"
  entry_agent: "researcher"
  # Enforce a structured output for the final response
  structured_output_model: "FinalReport"

structured_output:
  script_dir: "./structured_output"

agent_list:
  - researcher:
      system_prompt: "You gather information. Hand off to writer."
  - writer:
      system_prompt: "You write sections of the report based on the research."
```

In this example, even though the individual agents (`researcher`, `writer`) may produce intermediate text, the framework is responsible for assembling their work into a final JSON object that matches the `FinalReport` Pydantic model.
