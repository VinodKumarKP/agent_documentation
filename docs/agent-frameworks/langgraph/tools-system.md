---
sidebar_position: 8
---

# Tools System

## Defining Tools

### Load Class-Based Tools (LangChain Community)

```yaml
tools:
  web_search:
    module: langchain_community.tools
    class: DuckDuckGoSearchRun
```

### Load Custom Module Tools

```yaml
tools:
  my_custom_tool:
    module: my_tools
    function_list:
      - my_function
    base_path: ./src
```

## Setting Default Parameter Values

You can configure default parameter values for tool functions using the `function_params` field.

```yaml
tools:
  random_generator:
    module: random_generator
    function_params:
      generate_random_number:
        lower: 10
        upper: 100
```
