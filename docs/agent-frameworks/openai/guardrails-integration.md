---
sidebar_position: 11
sidebar_label: "🛡️ Guardrails Integration"
---

# Guardrails Integration

Guardrails are essential for creating safe and reliable AI agents. They allow you to validate, structure, and sanitize the inputs and outputs of your agents, ensuring they behave as expected. This framework integrates with [Guardrails AI](https://www.guardrailsai.com/) to provide powerful and flexible validation capabilities.

## How It Works
1.  **Define Validators**: You define a list of validators in your YAML configuration. These can be pre-built validators from the Guardrails Hub or your own custom ones.
2.  **Apply to Input/Output**: You specify which validators to apply to the user's input and which to apply to the agent's final output.
3.  **Automatic Enforcement**: The framework automatically runs the specified validators at the appropriate stages and takes action based on the outcome.

## Configuration Explained

Here is a detailed breakdown of the `guardrails` section in your YAML file.

```yaml
guardrails:
  # --- General Settings ---
  # If true, an LLM call is used to decide if the output is valid.
  # This is slower but more flexible than structured validation.
  enable_agent_validation: false 

  # The directory where you store your custom validator Python files.
  custom_validators_dir: "custom_guardrails"

  # --- Validator Definitions ---
  # This is a registry of all validators you want to use in your application.
  validators:
    # Example 1: A pre-built validator from the Guardrails Hub
    - name: "profanity_check"
      full_name: "guardrails/profanity_free"
      on_fail: "fix" # If profanity is detected, try to fix it.

    # Example 2: A validator with parameters
    - name: "competitor_check"
      full_name: "guardrails/competitor_check"
      on_fail: "filter" # If a competitor is mentioned, filter it out.
      parameters:
        competitors: ["Acme Corp", "Global Tech"]

    # Example 3: A custom validator you created
    - name: "internal_code_check"
      full_name: "InternalCodeValidator" # The class name of your validator
      module: "internal_code_validator" # The Python filename (internal_code_validator.py)
      on_fail: "exception" # If an internal code is found, raise an error.

  # --- Applying Validators ---
  # Define which validators to run on the user's input.
  input:
    validators:
      - ref: "profanity_check"

  # Define which validators to run on the agent's final output.
  output:
    validators:
      - ref: "profanity_check"
      - ref: "competitor_check"
      - ref: "internal_code_check"
```

## Key Settings Explained

-   `enable_agent_validation`: Set this to `true` if you want to use another LLM call to validate an output. This is useful for complex, nuanced validation that can't be easily defined by rules, but it is slower and costs more.
-   `custom_validators_dir`: The folder where you will place your custom Python files for validators that are not from the Guardrails Hub.
-   `validators`: This is where you define each validator you plan to use.
    -   `name`: A short, unique name you give to the validator for easy reference.
    -   `full_name`: For Guardrails Hub validators, this is the official path (e.g., `guardrails/profanity_free`). For custom validators, this is the name of the Python class.
    -   `module`: (For custom validators only) The name of the Python file (without `.py`) in your `custom_validators_dir`.
    -   `on_fail`: What to do if the validation fails. Common options include:
        -   `fix`: Ask the LLM to correct the output.
        -   `filter`: Remove the invalid parts of the output.
        -   `reask`: Ask the user or agent for a new output.
        -   `noop`: Do nothing and allow the invalid output.
        -   `exception`: Stop execution and raise an error.
    -   `parameters`: A dictionary of key-value pairs to pass to the validator (e.g., a list of competitors to check for).
-   `input` / `output`: These sections define which of your named validators to apply. You use `ref` to refer to a validator you defined in the `validators` list.

> **Note**: The system automatically tries to download and install any required validators from the Guardrails AI Hub. If you add a new validator and it doesn't work immediately, a restart of the agent may be required.
