---
sidebar_position: 7
sidebar_label: "🛠️ Tools System"
---
# Tools System

## Defining Tools

### Load All Functions from Module

```yaml
tools:
  random_generator:
    module: random_generator
    base_path: ./../utils
```

### Load Specific Functions

```yaml
tools:
  random_generator:
    module: random_generator
    function_list:
      - generate_random_number
      - generate_random_string
    base_path: ./../utils
```

## Setting Default Parameter Values

You can configure default parameter values for tool functions using the `function_params` field.

```yaml
tools:
  random_generator:
    module: random_generator
    base_path: ./../utils
    function_params:
      generate_random_number:
        lower: 10
        upper: 100
```

## Custom Tools

Create a Python file with your tool:

```python
# my_tools/data_processor.py
def process_data(data: str, max_records: int = 100) -> str:
    """Process and clean data.
    
    Args:
        data: Raw data to process
        max_records: Maximum number of records to process (default: 100)
    """
    # Your implementation
    return processed_data
```

Configure in YAML:

```yaml
tools:
  data_tools:
    module: data_processor
    function_list:
      - process_data
    base_path: ./my_tools
```
