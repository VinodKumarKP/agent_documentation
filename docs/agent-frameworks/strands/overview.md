---
sidebar_position: 1
sidebar_label: "🔍 Overview"
---

# Overview

The AWS Strands Multi-Agent Framework enables you to create sophisticated agent orchestrations on AWS Bedrock through simple YAML configuration files. Built on the official AWS Strands SDK, it provides a declarative way to define multi-agent systems with support for various orchestration patterns.

## High-Level Architecture

The framework operates on a simple principle: your YAML configuration is the single source of truth that defines the entire system. The `StrandsAgent` class reads this configuration and dynamically constructs the agent or team of agents at runtime.

```mermaid
    graph TD
        A[YAML Config<br>] --> B(StrandsAgent<br>Framework Core);
        B --> C{Orchestrator & Agents};
        C --> D[Tools, Skills, KB, Memory];
```

## What Can You Build?

- Research and analysis pipelines with agent handoffs
- Complex decision-making systems with multiple specialists
- Data processing workflows with parallel execution
- Autonomous agent systems with dynamic collaboration
- Enterprise-grade AI applications on AWS infrastructure
