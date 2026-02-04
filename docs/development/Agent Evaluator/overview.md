---
sidebar_position: 1
sidebar_label: "🔍 Overview"
---

# Overview

A flexible regression testing framework for AI Agents. This library allows you to define test scenarios in YAML and uses an LLM-as-a-Judge approach to evaluate agent responses against expected outputs or criteria.

It is designed to be framework-agnostic, allowing you to plug in any agent implementation (e.g., OpenAI, LangGraph, Bedrock) by providing the agent class.

## Features

- **Scenario-based Testing**: Define inputs, expected outputs, and agent configurations in simple YAML files.
- **LLM-as-a-Judge**: Uses a separate LLM (Judge Agent) to score responses and provide explanations, handling the semantic variability of AI outputs.
- **Multi-Metric Evaluation**: Evaluate responses across multiple dimensions like `correctness`, `relevance`, and `safety` in a single pass.
- **HTML Reporting**: Generates detailed HTML reports with pass/fail status, scores, and drill-down details.
- **Framework Agnostic**: Works with any agent class that follows a standard initialization and invocation pattern.
- **Caching**: Efficiently reuses initialized agents across multiple scenarios to speed up testing.
- **Flexible Loading**: Load scenarios from single files or entire directories.
- **CLI Tool**: Run tests directly from the command line.
- **Model Overrides**: Override model configurations and judge models directly from the scenario YAML.
- **Matrix Testing**: Run scenarios against multiple models by providing a list of model configurations.
- **Parallel Execution**: Run tests concurrently to reduce total execution time.
- **Macros**: Use dynamic values in your scenarios (e.g., dates, UUIDs, file contents) using `{{ MACRO }}` syntax.
