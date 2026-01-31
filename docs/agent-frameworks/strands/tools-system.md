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

### Load Class-Based Tools

```yaml
tools:
  calculator:
    module: strands_tools
    class: calculator
  
  current_time:
    module: strands_tools
    class: current_time
```

## Setting Default Parameter Values

You can configure default parameter values for tool functions using the `function_params` field. This is useful for pre-configuring tools with specific settings or constraints.

### Basic Default Parameters

```yaml
tools:
  random_generator:
    module: random_generator
    base_path: ./../utils
    function_params:
      generate_random_number:
        lower: 10
        upper: 100
      generate_random_string:
        length: 16
        charset: "alphanumeric"
```

### Multiple Functions with Defaults

```yaml
tools:
  data_processor:
    module: data_tools
    base_path: ./tools
    function_params:
      process_data:
        max_records: 1000
        format: "json"
      validate_data:
        strict_mode: true
        schema_version: "2.0"
```

### Combining with Specific Function Lists

```yaml
tools:
  api_client:
    module: api_tools
    function_list:
      - fetch_data
      - post_data
    base_path: ./integrations
    function_params:
      fetch_data:
        timeout: 30
        retry_count: 3
      post_data:
        timeout: 60
        verify_ssl: true
```

**How It Works:**
- Default parameters are applied when the tool is initialized
- Agents can still override these defaults when calling the function
- Useful for:
  - Setting consistent behavior across all tool calls
  - Configuring API endpoints, timeouts, or rate limits
  - Establishing validation rules or data constraints
  - Pre-setting environment-specific values

**Example Use Case:**

```yaml
tools:
  database_client:
    module: db_tools
    base_path: ./database
    function_params:
      query_data:
        connection_string: "postgresql://localhost:5432/mydb"
        pool_size: 10
        timeout: 30
      insert_data:
        batch_size: 500
        validate: true
```

## Built-in Strands Tools

```yaml
tools:
  # Math operations
  calculator:
    module: strands_tools
    class: calculator
  
  # Time utilities
  current_time:
    module: strands_tools
    class: current_time
  
  # Swarm coordination
  swarm:
    module: strands_tools
    class: swarm
```

## Custom Tools

Create a Python file with your tool:

```python
# my_tools/data_processor.py
def process_data(data: str, max_records: int = 100, format: str = "json") -> str:
    """Process and clean data.
    
    Args:
        data: Raw data to process
        max_records: Maximum number of records to process (default: 100)
        format: Output format - 'json' or 'csv' (default: 'json')
    """
    # Your implementation
    return processed_data

def analyze_data(data: str, threshold: float = 0.5) -> dict:
    """Analyze data and return insights.
    
    Args:
        data: Data to analyze
        threshold: Confidence threshold for insights (default: 0.5)
    """
    # Your implementation
    return {"insights": results}
```

Configure in YAML with default parameters:

```yaml
tools:
  data_tools:
    module: data_processor
    function_list:
      - process_data
      - analyze_data
    base_path: ./my_tools
    function_params:
      process_data:
        max_records: 500
        format: "csv"
      analyze_data:
        threshold: 0.75
```

## Assigning Tools to Agents

```yaml
agent_list:
  - analyst:
      system_prompt: You analyze data using available tools.
      tools:
        - calculator
        - data_tools
        - current_time
  
  - researcher:
      system_prompt: You research topics and generate reports.
      tools:
        - random_generator
        - current_time
```

## Tool Configuration Best Practices

1. **Use Meaningful Default Values**
   ```yaml
   # ✅ Good - Sensible defaults for production
   function_params:
     api_call:
       timeout: 30
       retry_count: 3
       backoff_factor: 2
   
   # ❌ Bad - Extreme or unrealistic defaults
   function_params:
     api_call:
       timeout: 1
       retry_count: 100
   ```

2. **Document Parameter Purposes**
   - Ensure tool functions have clear docstrings
   - Include parameter descriptions and valid ranges
   - Specify default behavior when parameters are omitted

3. **Environment-Specific Configuration**
   ```yaml
   # Development environment
   function_params:
     database_query:
       connection_string: "postgresql://localhost:5432/dev_db"
       timeout: 10
   
   # Production environment
   function_params:
     database_query:
       connection_string: "postgresql://prod-server:5432/prod_db"
       timeout: 60
   ```

4. **Security Considerations**
   - Avoid hardcoding sensitive values in YAML
   - Use environment variables for credentials
   - Set safe defaults for potentially dangerous operations
   ```yaml
   # ✅ Good - Safe defaults
   function_params:
     file_operations:
       max_file_size: 10485760  # 10MB
       allowed_extensions: [".txt", ".json", ".csv"]
   ```
