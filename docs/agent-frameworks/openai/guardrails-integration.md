---
sidebar_position: 11
sidebar_label: "🛡️ Guardrails Integration"
---

# Guardrails Integration

The framework supports integrating guardrails to validate and sanitize both input and output. You can use built-in validators from [guardrails.ai](https://www.guardrailsai.com/) or define your own custom validators.

## Configuration Example

```yaml
guardrails:
  enable_agent_validation: false # Optional: Use an agent to validate (default: false)
  custom_validators_dir: "custom_guardrails" # Directory for custom validator implementations
  validators:
    - name: competitor_check
      full_name: guardrails/competitor_check
      parameters:
        competitors: [ "Apple", "Samsung" ]
      on_fail: "fix"

    - name: json_validator
      full_name: ValidJson
      module: valid_json
      on_fail: "noop"
      instruction: Response should be a valid json # Optional instruction
  input:
    validators:
      - ref: competitor_check
      - ref: json_validator
  output:
    validators:
      - ref: competitor_check
      - ref: json_validator
```

## Key Features

- **Input & Output Validation**: Apply different or same sets of validators to user inputs and agent outputs.
- **Guardrails.ai Support**: Easily use any validator from the [Guardrails Hub](https://hub.guardrailsai.com/).
- **Custom Validators**: Implement your own validation logic by providing a `custom_validators_dir`.
- **Flexible Failure Handling**: Configure `on_fail` actions like `fix`, `noop`, `reask`, `filter`, `refrain`, or `exception`.

> **Note**: The Guardrails Manager (`oai_agent_core/components/guardrails/guardrails_manager.py`) attempts to automatically install required validators from the Guardrails AI Hub. In rare cases, a validator might be installed but not immediately recognized by the agent. If you encounter issues with newly added hub validators, please restart the agent.
