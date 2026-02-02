---
sidebar_position: 5
sidebar_label: "📖 API Reference"
---

# API Reference

## `RegressionRunner`

The main entry point for running tests.

```python
runner = RegressionRunner(
    agent_class=MyAgent,       # Your agent class
    project_root="/path/to/",  # Root for config resolution
    judge_model_id="gpt-4o",   # LLM model for the judge
    output_dir="reports",      # Directory for HTML reports
    max_concurrency=1          # Max concurrent scenarios
)
```

## `TestScenario`

Data class representing a single test case.

- `name`: Name of the scenario.
- `input_message`: User input to the agent.
- `expected_output`: (Optional) The expected response text.
- `evaluation_criteria`: (Optional) Instructions for the judge on how to evaluate.
- `agent_config`: Configuration dictionary for the agent.
- `metrics`: List of metrics to evaluate (e.g., `['correctness', 'safety']`).
- `agent_class`: (Optional) Python path to the agent class for this scenario.
- `agent_model_config`: (Optional) Dictionary or List of dictionaries to override the agent's model configuration.
- `judge_model_id`: (Optional) Model ID to use for the judge agent for this scenario.
