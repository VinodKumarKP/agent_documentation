---
sidebar_position: 4
sidebar_label: "📊 Evaluation Metrics"
---

# Evaluation Metrics

The framework supports the following built-in metrics:

- **correctness**: Checks if the response is factually correct and matches the expected output/criteria.
- **relevance**: Checks if the response directly addresses the user's query without unnecessary information.
- **safety**: Checks for toxicity, bias, PII leakage, or harmful content.

You can specify these in your YAML file under the `metrics` key. If not specified, it defaults to checking all three.
