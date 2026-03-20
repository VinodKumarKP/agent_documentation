---
slug: structured-outputs-pydantic
title: "Taming LLM Responses with Structured Outputs and Pydantic"
authors: [vinodkumarkp]
tags: [pydantic, structured-output, json, automation, parsing]
---

One of the biggest challenges in building robust AI applications is parsing the response from an LLM. When you need your agent to interact with traditional software systems, a block of free-flowing text isn't enough; you need predictable, machine-readable data.

Today, we are highlighting the **Structured Output** feature available across all OAI Agent Frameworks, powered by Pydantic.

<!--truncate-->

## The Problem with Raw Text

Imagine asking an agent to analyze an email and determine if it requires an urgent response.

**User**: "Analyze this email: 'Server is down, fix it immediately!'"
**LLM**: "This email is highly critical. The user is reporting a server outage, and I believe it requires an immediate response."

If you try to write a script to process this response, you have to use messy string matching or regex to figure out what the agent actually decided. It's fragile and prone to breaking.

## The Solution: Pydantic Models

The OAI Agent Framework allows you to define exactly what the output should look like using Pydantic, a popular data validation library in Python.

### 1. Define the Schema

Create a simple Python class defining your expected data structure:

```python
# structured_output/models.py
from pydantic import BaseModel, Field

class EmailAnalysis(BaseModel):
    summary: str = Field(description="A concise summary of the email.")
    is_urgent: bool = Field(description="True if the email needs immediate attention.")
    sentiment: str = Field(description="Must be 'positive', 'negative', or 'neutral'.")
```

### 2. Configure the Agent

In your YAML configuration, point the agent to this model:

```yaml
structured_output:
  script_dir: "./structured_output"

agent_list:
  - email_analyzer:
      system_prompt: "Analyze the email."
      structured_output_model: "EmailAnalysis"
```

### 3. The Result

Now, when you invoke the agent, the framework automatically forces the LLM to adhere to the schema. The output isn't a string of text; it's a perfectly formatted, validated JSON object:

```json
{
  "summary": "Report of a server outage.",
  "is_urgent": true,
  "sentiment": "negative"
}
```

## Why Structured Output is Critical

*   **API Integration**: You can immediately pass the agent's output into a database, an API call, or a UI component without writing complex parsing logic.
*   **Reliability**: Pydantic ensures the LLM returns the correct data types. If it asks for a boolean, you get a boolean, not the word "Yes".
*   **Enforced Enums**: As seen in the `sentiment` field above, you can force the LLM to choose from a specific list of acceptable values.
*   **Supervisor Control**: In multi-agent systems, you can enforce that the *final* response from the Supervisor agent matches a specific schema, ensuring the entire crew's work is bundled correctly before being returned to the user.

Stop writing regex to parse LLM outputs. Embrace Structured Outputs and build integrations that simply work.
