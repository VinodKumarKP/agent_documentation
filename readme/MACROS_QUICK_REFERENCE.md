# Complete Macros Reference Guide

Quick reference for all available macros in the OAI Agent Evaluator.

**Table of Contents:**
- [File Operations](#file-operations)
- [Text Manipulation](#text-manipulation)
- [Data Extraction & Templates](#data-extraction--templates)
- [Date & Time](#date--time)
- [Random & Generated Data](#random--generated-data)
- [Variables & Logic](#variables--logic)
- [External Data](#external-data)
- [Utilities](#utilities)
- [Combining Macros](#combining-macros)
- [Quick Reference Table](#quick-reference-table)

---

## File Operations

### OPEN - Read File Content
**Syntax:** `{{ OPEN file_path [file_type] }}`

**Purpose:** Reads content from various file types

**Supported Formats:**
- Text files (`.txt`, `.md`, `.csv`, etc.)
- PDF (`.pdf`)
- Word documents (`.docx`)
- PowerPoint (`.ppt`, `.pptx`)
- Excel (`.xls`, `.xlsx`)
- Images (`.png`, `.jpg`, etc. - via OCR)

**Examples:**
```yaml
# Auto-detect file type
input_message: "Summarize: {{ OPEN report.pdf }}"

# Explicit file type
input_message: "Read: {{ OPEN document docx }}"

# Text file
input_message: "Review: {{ OPEN data/notes.txt }}"
```

**Dependencies:** `pypdf`, `python-docx`, `python-pptx`, `pandas`, `openpyxl`, `pytesseract`, `pillow` (optional, based on file type)

---

### CONCAT - Combine Multiple Files
**Syntax:** `{{ CONCAT file1 file2 file3 ... }}`

**Purpose:** Concatenates content from multiple files, separated by `---`

**Examples:**
```yaml
# Combine reports
input_message: "Compare: {{ CONCAT reports/q1.txt reports/q2.txt reports/q3.txt }}"

# Mix file types
input_message: "{{ CONCAT notes.txt data.csv summary.pdf }}"
```

**Use Cases:**
- Multi-document analysis
- Comparing versions
- Aggregating data sources

---

### SAMPLE - Extract Sample Lines
**Syntax:** `{{ SAMPLE file_path n_lines [random] }}`

**Purpose:** Extracts n lines from a file (first N or random)

**Examples:**
```yaml
# First 10 lines
input_message: "{{ SAMPLE logs/app.log 10 }}"

# Random 20 lines
input_message: "{{ SAMPLE data/transactions.csv 20 random }}"
```

**Use Cases:**
- Large file previews
- Random sampling
- Log analysis

---

### IMAGE - Base64 Encode Image
**Syntax:** `{{ IMAGE file_path }}`

**Purpose:** Reads an image and returns Base64 encoded string (for vision models)

**Examples:**
```yaml
input_message: "Describe this image: {{ IMAGE screenshots/ui.png }}"
```

**Use Cases:**
- Vision model testing
- Image analysis scenarios
- Multimodal inputs

---

### LIST_FILES - List Directory Contents
**Syntax:** `{{ LIST_FILES directory_path [pattern] }}`

**Purpose:** Lists files in a directory, returns JSON array

**Examples:**
```yaml
# All files
input_message: "{{ LIST_FILES data/ }}"

# Filtered by pattern
input_message: "{{ LIST_FILES logs/ *.log }}"
```

**Output:** `["file1.txt", "file2.txt", "file3.txt"]`

---

## Text Manipulation

### TRUNCATE - Limit Text Length
**Syntax:** `{{ TRUNCATE text max_length [suffix] }}`

**Purpose:** Truncates text to max_length. Default suffix: `...`

**Examples:**
```yaml
# Default suffix
input_message: "{{ TRUNCATE 'Long text here' 10 }}"
# Output: "Long te..."

# Custom suffix
input_message: "{{ TRUNCATE article.txt 200 '[more]' }}"
```

**Use Cases:**
- Context window testing
- Incomplete input simulation
- Preview generation

---

### REPEAT - Duplicate Text
**Syntax:** `{{ REPEAT text count [separator] }}`

**Purpose:** Repeats text N times with optional separator

**Examples:**
```yaml
# With newline
input_message: "{{ REPEAT 'spam' 5 '\n' }}"

# With comma
input_message: "{{ REPEAT 'item' 3 ', ' }}"
# Output: "item, item, item"
```

**Use Cases:**
- Deduplication testing
- Stress testing
- Test data generation

---

### BASE64 - Encode String
**Syntax:** `{{ BASE64 string }}`

**Purpose:** Base64 encodes a string

**Examples:**
```yaml
input_message: "Encoded: {{ BASE64 'Hello World' }}"
# Output: "SGVsbG8gV29ybGQ="
```

---

### JSON_ESCAPE - Escape for JSON
**Syntax:** `{{ JSON_ESCAPE string }}`

**Purpose:** Escapes special characters for JSON inclusion

**Examples:**
```yaml
input_message: "{{ JSON_ESCAPE 'Text with \"quotes\" and \n newlines' }}"
```

---

### URL_ENCODE - URL Encode String
**Syntax:** `{{ URL_ENCODE string }}`

**Purpose:** URL encodes a string

**Examples:**
```yaml
input_message: "{{ URL_ENCODE 'hello world' }}"
# Output: "hello%20world"
```

---

### HASH - Generate Hash
**Syntax:** `{{ HASH string [algorithm] }}`

**Purpose:** Generates hash of a string

**Algorithms:** `md5` (default), `sha1`, `sha256`, `sha512`

**Examples:**
```yaml
# Default (md5)
input_message: "{{ HASH 'password' }}"

# SHA256
input_message: "{{ HASH 'data' sha256 }}"
```

---

## Data Extraction & Templates

### JSON_EXTRACT - Parse JSON Files
**Syntax:** `{{ JSON_EXTRACT file_path json_path }}`

**Purpose:** Extracts data using JSONPath syntax

**JSONPath Examples:**
- `$.users[0].name` - First user's name
- `$.data.items[*].id` - All item IDs
- `$.config.settings.theme` - Nested value

**Examples:**
```yaml
# Simple extraction
input_message: "{{ JSON_EXTRACT users.json $.users[0].email }}"

# Nested data
input_message: "{{ JSON_EXTRACT config.json $.database.host }}"

# Array wildcard
input_message: "{{ JSON_EXTRACT data.json $.items[*].id }}"
```

**Use Cases:**
- Config file parsing
- API response simulation
- Structured data testing

---

### TEMPLATE - Populate Templates
**Syntax:** `{{ TEMPLATE template_file variables_json }}`

**Purpose:** Fills template using `{variable}` syntax

**Template File (email.txt):**
```
Hello {name},

Your appointment is on {date} at {time}.

Best regards,
{sender}
```

**Usage:**
```yaml
input_message: "{{ TEMPLATE email.txt '{\"name\": \"John\", \"date\": \"2024-01-15\", \"time\": \"2pm\", \"sender\": \"Bot\"}' }}"
```

**Use Cases:**
- Consistent formatting
- Parameterized inputs
- Dynamic content

---

## Date & Time

### DATE - Current Date
**Syntax:** `{{ DATE [format] [offset_days] }}`

**Purpose:** Returns current date with optional formatting and offset

**Default Format:** `%Y-%m-%d`

**Examples:**
```yaml
# Today
input_message: "{{ DATE }}"
# Output: "2024-01-15"

# Custom format
input_message: "{{ DATE '%B %d, %Y' }}"
# Output: "January 15, 2024"

# Tomorrow
input_message: "{{ DATE '%Y-%m-%d' 1 }}"

# Week ago
input_message: "{{ DATE '%Y-%m-%d' -7 }}"
```

**Format Codes:**
- `%Y` - Year (2024)
- `%m` - Month (01-12)
- `%d` - Day (01-31)
- `%B` - Month name (January)
- `%A` - Day name (Monday)

---

### NOW - Current Timestamp
**Syntax:** `{{ NOW [format] }}`

**Purpose:** Returns current timestamp

**Default:** ISO 8601 format

**Examples:**
```yaml
# ISO format (default)
input_message: "{{ NOW }}"
# Output: "2024-01-15T14:30:00.123456"

# Custom format
input_message: "{{ NOW '%Y-%m-%d %H:%M:%S' }}"
# Output: "2024-01-15 14:30:00"
```

---

### TIMESTAMP - Unix Timestamp
**Syntax:** `{{ TIMESTAMP [offset_seconds] [format] }}`

**Purpose:** Returns Unix timestamp with optional offset and format

**Formats:**
- Default: Unix seconds
- `iso`: ISO 8601
- `ms`: Milliseconds

**Examples:**
```yaml
# Current timestamp
input_message: "{{ TIMESTAMP }}"
# Output: "1705329000"

# One hour ago
input_message: "{{ TIMESTAMP -3600 }}"

# ISO format
input_message: "{{ TIMESTAMP 0 iso }}"
# Output: "2024-01-15T14:30:00.123456"

# Milliseconds
input_message: "{{ TIMESTAMP 0 ms }}"
# Output: "1705329000123"
```

**Use Cases:**
- Log time ranges
- Event scheduling
- Timestamp queries

---

### BUSINESS_DAYS_FROM - Calculate Business Days
**Syntax:** `{{ BUSINESS_DAYS_FROM date count [format] }}`

**Purpose:** Calculates business days (excludes weekends)

**Date Formats:**
- `today` - Current date
- `YYYY-MM-DD` - Specific date

**Examples:**
```yaml
# 5 business days from today
input_message: "{{ BUSINESS_DAYS_FROM today 5 }}"

# 3 business days before date
input_message: "{{ BUSINESS_DAYS_FROM 2024-12-25 -3 }}"

# Custom output format
input_message: "{{ BUSINESS_DAYS_FROM today 10 '%B %d, %Y' }}"
# Output: "January 29, 2024"
```

**Use Cases:**
- Deadline calculations
- SLA testing
- Meeting scheduling

---

## Random & Generated Data

### UUID - Generate UUID
**Syntax:** `{{ UUID }}`

**Purpose:** Generates random UUID

**Examples:**
```yaml
input_message: "Create user with ID: {{ UUID }}"
# Output: "550e8400-e29b-41d4-a716-446655440000"
```

---

### RANDOM_INT - Random Integer
**Syntax:** `{{ RANDOM_INT min max }}`

**Purpose:** Returns random integer between min and max (inclusive)

**Examples:**
```yaml
input_message: "{{ RANDOM_INT 1 100 }}"
# Output: "42"

input_message: "User age: {{ RANDOM_INT 18 65 }}"
```

---

### RANDOM_CHOICE - Random Selection
**Syntax:** `{{ RANDOM_CHOICE item1 item2 item3 ... }}`

**Purpose:** Randomly selects one item from the list

**Examples:**
```yaml
input_message: "{{ RANDOM_CHOICE apple orange banana }}"
# Output: "orange"

input_message: "Color: {{ RANDOM_CHOICE red blue green yellow }}"
```

---

### FAKER - Generate Fake Data
**Syntax:** `{{ FAKER provider [args...] }}`

**Purpose:** Generates realistic fake data using Faker library

**Common Providers:**
- `name` - Full name
- `email` - Email address
- `address` - Street address
- `phone_number` - Phone number
- `company` - Company name
- `text` - Random text
- `date` - Random date
- `credit_card_number` - Credit card
- `user_name` - Username
- `url` - URL

**Examples:**
```yaml
input_message: "{{ FAKER name }}"
# Output: "John Smith"

input_message: "{{ FAKER email }}"
# Output: "john.smith@example.com"

input_message: "{{ FAKER address }}"
# Output: "123 Main St, Springfield, IL 62701"

input_message: "{{ FAKER phone_number }}"
# Output: "(555) 123-4567"
```

**Dependency:** `faker` package

---

### FAKER_LOCALE - Localized Fake Data
**Syntax:** `{{ FAKER_LOCALE locale provider [args...] }}`

**Purpose:** Generates fake data in specific locale

**Common Locales:**
- `en_US` - English (US)
- `en_GB` - English (UK)
- `fr_FR` - French (France)
- `de_DE` - German (Germany)
- `es_ES` - Spanish (Spain)
- `ja_JP` - Japanese
- `zh_CN` - Chinese (China)

**Examples:**
```yaml
input_message: "{{ FAKER_LOCALE fr_FR name }}"
# Output: "Jean Dupont"

input_message: "{{ FAKER_LOCALE de_DE address }}"
# Output: "Hauptstraße 123, 10115 Berlin"
```

**Dependency:** `faker` package

---

## Variables & Logic

### SET - Store Variable
**Syntax:** `{{ SET var_name value }}`

**Purpose:** Stores a value in a variable for later use

**Examples:**
```yaml
input_message: "{{ SET user_id {{ UUID }} }}"

input_message: "{{ SET count 42 }}"

# Combined with FAKER
input_message: "{{ SET username {{ FAKER user_name }} }}"
```

**Note:** Variables persist within a single scenario

---

### GET - Retrieve Variable
**Syntax:** `{{ GET var_name [default] }}`

**Purpose:** Retrieves a stored variable value

**Examples:**
```yaml
# Basic retrieval
input_message: "User ID: {{ GET user_id }}"

# With default
input_message: "Count: {{ GET count 0 }}"

# Complete example
input_message: "Create user {{ SET name {{ FAKER name }} }}"
expected_output: "User {{ GET name }} created successfully"
```

---

### IF - Conditional Logic
**Syntax:** `{{ IF condition true_value false_value }}`

**Purpose:** Returns true_value if condition is truthy, else false_value

**Truthy Values:** `true`, `yes`, `1`, `on`, non-empty strings
**Falsy Values:** `false`, `no`, `0`, `off`, empty string

**Examples:**
```yaml
# With environment variable
input_message: "{{ IF {{ ENV IS_PROD }} 'Production' 'Staging' }}"

# With GET variable
input_message: "{{ IF {{ GET enabled }} 'Active' 'Inactive' }}"

# Simple boolean
input_message: "{{ IF true 'Yes' 'No' }}"
# Output: "Yes"
```

---

### LOOP - Repeat Template
**Syntax:** `{{ LOOP count "template" [separator] }}`

**Purpose:** Repeats template N times, processing macros each iteration

**Special Variables:**
- `LOOP_INDEX` - 0-based index (0, 1, 2...)
- `LOOP_COUNT` - 1-based count (1, 2, 3...)

**Use `[[ ]]` for delayed macro evaluation**

**Examples:**
```yaml
# Basic loop
input_message: "{{ LOOP 3 'Item [[ GET LOOP_COUNT ]]' ', ' }}"
# Output: "Item 1, Item 2, Item 3"

# With FAKER
input_message: "{{ LOOP 5 'User [[ GET LOOP_COUNT ]]: [[ FAKER name ]]' '\n' }}"
# Output:
# User 1: John Smith
# User 2: Jane Doe
# User 3: Bob Wilson
# User 4: Alice Brown
# User 5: Charlie Davis

# With random data
input_message: "{{ LOOP 10 'ID: [[ UUID ]]' ', ' }}"
```

**Note:** Use single quotes in YAML for templates with nested quotes

---

## External Data

### HTTP_GET - Fetch URL Content
**Syntax:** `{{ HTTP_GET url [headers_json] }}`

**Purpose:** Fetches data from URL via HTTP GET

**Examples:**
```yaml
# Simple GET
input_message: "{{ HTTP_GET https://api.github.com/zen }}"

# With headers
input_message: "{{ HTTP_GET https://api.example.com/data '{\"Authorization\": \"Bearer token123\", \"Accept\": \"application/json\"}' }}"

# API integration
input_message: "Analyze: {{ HTTP_GET https://api.example.com/stats }}"
```

**Use Cases:**
- Live API testing
- External data integration
- Real-time scenarios

**Note:** Requires network access, 10-second timeout

---

### SQL_QUERY - Query Database
**Syntax:** `{{ SQL_QUERY db_path query }}`

**Purpose:** Queries SQLite database, returns JSON array

**Examples:**
```yaml
# Basic query
input_message: "{{ SQL_QUERY test.db 'SELECT * FROM users LIMIT 10' }}"

# Filtered query
input_message: "{{ SQL_QUERY app.db 'SELECT name FROM users WHERE active=1' }}"

# Aggregation
input_message: "{{ SQL_QUERY analytics.db 'SELECT COUNT(*) as total FROM events' }}"

# Join query
input_message: "{{ SQL_QUERY db.db 'SELECT u.name, o.total FROM users u JOIN orders o ON u.id = o.user_id' }}"
```

**Output Format:**
```json
[
  {"id": 1, "name": "Alice", "email": "alice@example.com"},
  {"id": 2, "name": "Bob", "email": "bob@example.com"}
]
```

**Use Cases:**
- Database testing
- Data-driven scenarios
- Integration testing

**Note:** Only supports SQLite databases

---

## Utilities

### PATH - Resolve Path
**Syntax:** `{{ PATH relative_path [project_root] }}`

**Purpose:** Resolves path relative to project root

**Examples:**
```yaml
# Relative to project root
input_message: "{{ PATH data/file.txt }}"
# Output: "/path/to/project/data/file.txt"

# Absolute path (returned as-is)
input_message: "{{ PATH /tmp/file.txt }}"
# Output: "/tmp/file.txt"

# Custom root
input_message: "{{ PATH config.json /opt/myapp }}"
# Output: "/opt/myapp/config.json"
```

---

### ENV - Environment Variable
**Syntax:** `{{ ENV VAR_NAME [default] }}`

**Purpose:** Returns environment variable value

**Examples:**
```yaml
# Basic
input_message: "API Key: {{ ENV API_KEY }}"

# With default
input_message: "Host: {{ ENV DB_HOST localhost }}"

# Combined with IF
input_message: "{{ IF {{ ENV DEBUG }} 'Debug mode' 'Production mode' }}"
```

---

### CALC - Evaluate Math Expression
**Syntax:** `{{ CALC expression }}`

**Purpose:** Evaluates mathematical expressions

**Examples:**
```yaml
input_message: "{{ CALC 5 * 10 }}"
# Output: "50"

input_message: "{{ CALC (100 + 50) / 2 }}"
# Output: "75"

input_message: "Total: {{ CALC 42.5 * 1.1 }}"
# Output: "46.75"
```

---

## Combining Macros

Macros can be nested and combined for powerful scenarios:

### Template with Dynamic Data
```yaml
input_message: "{{ TEMPLATE email.txt '{\"name\": \"{{ FAKER name }}\", \"date\": \"{{ DATE }}\", \"id\": \"{{ UUID }}\"}' }}"
```

### Multi-File Processing
```yaml
input_message: "{{ CONCAT {{ SAMPLE log1.txt 5 }} {{ SAMPLE log2.txt 5 }} }}"
```

### External Data Extraction
```yaml
input_message: "{{ JSON_EXTRACT {{ HTTP_GET https://api.example.com/data }} $.results[0].name }}"
```

### Loop with Multiple Generators
```yaml
input_message: "{{ LOOP 5 'User [[ GET LOOP_COUNT ]]: [[ FAKER name ]] ([[ FAKER email ]])' '\n' }}"
```

### Conditional File Reading
```yaml
input_message: "{{ IF {{ ENV USE_PROD_DATA }} '{{ OPEN prod/data.json }}' '{{ OPEN test/data.json }}' }}"
```

### Time-Based Queries
```yaml
input_message: "{{ SQL_QUERY logs.db 'SELECT * FROM events WHERE timestamp > {{ TIMESTAMP -86400 }} AND timestamp < {{ TIMESTAMP }}' }}"
```

---

## Best Practices

### Path Resolution
- All file paths are relative to `project_root` unless absolute
- Use forward slashes (`/`) for cross-platform compatibility

### Error Handling
- Macros return error messages starting with `"Error:"` on failure
- Check for errors in expected outputs when testing error scenarios

### Quoting in YAML
```yaml
# Single quotes for templates with JSON
input_message: '{{ TEMPLATE file.txt "{\"key\": \"value\"}" }}'

# Double quotes for simple strings
input_message: "{{ FAKER name }}"
```

### Nesting Evaluation
- Inner macros evaluate first (inside-out)
- Use `[[ ]]` in LOOP templates for delayed evaluation

### Performance Considerations
- Large files can slow execution
- Complex SQL queries may timeout
- HTTP_GET has 10-second timeout
- Cache results when possible using SET/GET

---

## Common Patterns

### User Registration Flow
```yaml
scenarios:
  - name: "Register User"
    input_message: "{{ SET email {{ FAKER email }} }}{{ SET name {{ FAKER name }} }}Register user {name: '{{ GET name }}', email: '{{ GET email }}'}"
    expected_output: "User {{ GET name }} registered with {{ GET email }}"
```

### Multi-Document Analysis
```yaml
input_message: "Compare Q1-Q4 reports: {{ CONCAT reports/q1.txt reports/q2.txt reports/q3.txt reports/q4.txt }}"
```

### Data Pipeline Testing
```yaml
input_message: "Process users: {{ SQL_QUERY app.db 'SELECT * FROM users WHERE created_at > {{ TIMESTAMP -604800 }}' }}"
```

### Template-Driven Testing
```yaml
input_message: "{{ LOOP 10 'Test case [[ GET LOOP_COUNT ]]: {{ TEMPLATE test_case.txt \"{\"id\": \"[[ UUID ]]\", \"data\": \"[[ FAKER text ]]\"}}' '\n\n' }}"
```

### Conditional Environment Testing
```yaml
input_message: "Connect to {{ IF {{ ENV ENVIRONMENT }} '{{ ENV PROD_DB }}' '{{ ENV DEV_DB }}' }}"
```

---

## Troubleshooting

### Common Issues

**Macro not evaluating:**
- Check syntax: `{{ MACRO_NAME args }}`
- Ensure proper spacing
- Verify macro name is correct

**File not found:**
- Check path is relative to `project_root`
- Verify file exists
- Use `PATH` macro to debug: `{{ PATH your/file.txt }}`

**JSON parsing errors:**
- Escape quotes in JSON strings
- Use single quotes for YAML values with JSON
- Validate JSON syntax

**LOOP not working:**
- Use `[[ ]]` for inner macros
- Check separator is quoted properly
- Verify template is a string literal

**Dependencies missing:**
- Install required packages: `pip install "oai-agent-evaluator[macros]"`
- Check specific package requirements in error message

---

## Quick Reference Table

| Macro | Purpose | Example |
|-------|---------|---------|
| `OPEN` | Read file | `{{ OPEN file.txt }}` |
| `CONCAT` | Combine files | `{{ CONCAT f1.txt f2.txt }}` |
| `SAMPLE` | Extract lines | `{{ SAMPLE log.txt 10 random }}` |
| `IMAGE` | Base64 image | `{{ IMAGE pic.png }}` |
| `TRUNCATE` | Limit length | `{{ TRUNCATE text 100 }}` |
| `REPEAT` | Duplicate text | `{{ REPEAT word 5 , }}` |
| `JSON_EXTRACT` | Parse JSON | `{{ JSON_EXTRACT data.json $.key }}` |
| `TEMPLATE` | Fill template | `{{ TEMPLATE file.txt {...} }}` |
| `DATE` | Current date | `{{ DATE %Y-%m-%d }}` |
| `NOW` | Timestamp | `{{ NOW }}` |
| `TIMESTAMP` | Unix time | `{{ TIMESTAMP -3600 iso }}` |
| `BUSINESS_DAYS_FROM` | Workdays | `{{ BUSINESS_DAYS_FROM today 5 }}` |
| `UUID` | Random UUID | `{{ UUID }}` |
| `RANDOM_INT` | Random number | `{{ RANDOM_INT 1 100 }}` |
| `RANDOM_CHOICE` | Random pick | `{{ RANDOM_CHOICE a b c }}` |
| `FAKER` | Fake data | `{{ FAKER name }}` |
| `FAKER_LOCALE` | Localized fake | `{{ FAKER_LOCALE fr_FR name }}` |
| `SET` | Store variable | `{{ SET key value }}` |
| `GET` | Get variable | `{{ GET key default }}` |
| `IF` | Conditional | `{{ IF cond true false }}` |
| `LOOP` | Repeat | `{{ LOOP 5 "template" , }}` |
| `HTTP_GET` | Fetch URL | `{{ HTTP_GET url }}` |
| `SQL_QUERY` | Query DB | `{{ SQL_QUERY db.db 'SELECT...' }}` |
| `PATH` | Resolve path | `{{ PATH file.txt }}` |
| `ENV` | Environment | `{{ ENV VAR default }}` |
| `CALC` | Math | `{{ CALC 5 * 10 }}` |
| `BASE64` | Encode | `{{ BASE64 text }}` |
| `JSON_ESCAPE` | Escape JSON | `{{ JSON_ESCAPE text }}` |
| `URL_ENCODE` | URL encode | `{{ URL_ENCODE text }}` |
| `HASH` | Hash string | `{{ HASH text sha256 }}` |
| `LIST_FILES` | List dir | `{{ LIST_FILES path/ *.txt }}` |
