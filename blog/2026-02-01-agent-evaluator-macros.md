---
slug: agent-evaluator-macros
title: Dynamic Testing with Agent Evaluator Macros
authors: [vinodkumarkp]
tags: [testing, evaluation, agents, macros, automation]
---

Testing AI agents often requires dynamic data. You might need to inject the current date, generate unique IDs, or load content from external files to create realistic test scenarios.

We are excited to introduce **Macros** for the OAI Agent Evaluator, a powerful feature that brings dynamic capabilities to your YAML test definitions.

<!--truncate-->

## What are Macros?

Macros are special placeholders in your `scenarios.yaml` file that get evaluated at runtime. They allow you to inject dynamic values into your `input_message` and `expected_output`.

Syntax: `{{ MACRO_NAME arguments }}`

## Key Macros

Here are some of the new macros you can use:

### 1. File & Image Loading
Load content directly from files, including PDFs, Word docs, and even Images (via OCR).

```yaml
input_message: "Summarize this document: {{ OPEN data/report.pdf }}"
```

For vision-capable agents, you can inject base64 encoded images:

```yaml
input_message: "Describe this image: {{ IMAGE data/screenshot.png }}"
```

### 2. Dynamic Data Generation
Generate realistic test data on the fly using Faker.

```yaml
input_message: "Create a user profile for {{ FAKER name }} who lives in {{ FAKER city }}."
```

You can even generate localized data:
```yaml
input_message: "Generate a French address: {{ FAKER_LOCALE fr_FR address }}"
```

### 3. State Management
Pass data between steps or reuse generated values using `SET` and `GET`.

```yaml
input_message: "My order ID is {{ SET order_id {{ UUID }} }}."
expected_output: "Order {{ GET order_id }} has been processed."
```

### 4. Utilities
- **Date/Time**: `{{ DATE %Y-%m-%d }}`, `{{ NOW }}`
- **Math**: `{{ CALC 5 * 10 + 2 }}`
- **Randomness**: `{{ RANDOM_CHOICE red blue green }}`, `{{ RANDOM_INT 1 100 }}`
- **Environment**: `{{ ENV API_KEY }}`

## Example Scenario

Here is how a complete scenario looks with macros:

```yaml
scenarios:
  - name: "Invoice Processing"
    description: "Test invoice extraction with dynamic dates."
    input_message: |
      Extract data from this invoice: {{ OPEN data/invoice_sample.txt }}
      Today's date is {{ DATE }}.
    expected_output: "Invoice #{{ GET invoice_id }} processed for {{ FAKER name }}."
```

## Getting Started

To use these features, ensure you have the latest version of `oai-agent-evaluator`. Some macros (like `FAKER` and `OPEN` for PDFs) require optional dependencies:

```bash
pip install "oai-agent-evaluator[macros]"
```

Check out the [documentation](../docs/development/Agent%20Evaluator/usage#macros) for the full list of available macros.
