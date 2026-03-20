---
sidebar_position: 12
sidebar_label: "🎯 Agent Skills"
---

# Agent Skills

Agent Skills provide a way to modularize complex behaviors, workflows, and prompts into reusable components. Think of a "skill" as a predefined set of instructions and patterns that teach an agent *how* to perform a specific kind of complex task, such as processing a file, writing a specific type of code, or conducting a specialized analysis.

Instead of writing a massive, complicated system prompt for every agent, you can write concise system prompts and attach pre-built skills.

For more detailed information, best practices, and advanced skill creation, please refer to the [Agent Skills Documentation](https://agentskills.io/skill-creation/quickstart).

## How Skills Work

1.  **Skill Directory**: You define a directory in your project that will contain your skills.
2.  **Skill Folders**: Inside this directory, each skill gets its own folder (e.g., `file-processing`).
    *   **Resources and Scripts**: You can also add additional resources, Python scripts, or data files inside the skill folder to support the skill's execution.
3.  **`SKILL.md` File**: The core of a skill is its `SKILL.md` file. This Markdown file serves as a comprehensive instruction manual for the agent. It contains:
    *   **YAML Frontmatter**: Metadata like the skill's name, description, and the names of any tools it depends on.
    *   **Purpose & Capabilities**: Plain English descriptions of what the skill does.
    *   **Execution Instructions**: Step-by-step guidance for the agent on how to use the skill.
    *   **Examples & Patterns**: Code snippets and common use cases the agent can follow or adapt.
4.  **Agent Integration**: You attach skills to specific agents in your main YAML configuration. The framework automatically reads the `SKILL.md` files and injects their contents into the agent's context, effectively teaching it the skill.

## Incorporating Skills into Your Agent

**Step 1: Set up the Skill Directory**

Create a folder to hold your skills. A common location is a `skills` folder at the root of your project or next to your agent configuration.

```bash
mkdir skills
mkdir skills/file-processing
touch skills/file-processing/SKILL.md
```

**Step 2: Create a `SKILL.md` File and Add Resources**

Write the instructions for your skill. The file *must* contain YAML frontmatter with at least the `name` and `description`. You can optionally add scripts or other resources alongside the `SKILL.md` file.

*Example: `skills/file-processing/SKILL.md`*

```markdown
---
name: file-processing
description: Process and analyze CSV, JSON, and text files.
allowed-tools:
  - shell
---

# File Processing Skill

## Purpose
Process structured data files with comprehensive capabilities for data cleaning and transformation.

## Instructions
1. Understand the user's requested analysis.
2. Use the `shell` tool to write Python scripts that read the target files (e.g., using `csv` or `json` modules) or use the provided scripts.
3. Apply the requested transformations (filtering, sorting).
4. Format the output as a Markdown table.

## Common Use Cases
### CSV Analysis
\```python
import csv
with open('data.csv', 'r') as f:
    reader = csv.DictReader(f)
    # ... process data ...
\```

## Supporting Scripts
- `scripts/process.py`: Utility functions for processing data. Use this script for complex transformations.
```

**Step 3: Update Your Agent Configuration**

In your main agent YAML file (e.g., `my_agent.yaml`), do two things:

1.  **Define the Global `skill_dir`**: Tell the framework where to find the skills.
2.  **Assign Skills to Agents**: Add the `skills` list to any agent that needs them.

```yaml
model:
  model_id: "gpt-4o"
  cloud_provider: "openai"

# 1. Tell the framework where your skills are located
skills:
  skill_dir: "./skills"

agent_list:
  - data_assistant:
      system_prompt: |
        You are a helpful assistant specialized in data tasks.
      # 2. Assign the skill to the agent
      skills:
        - file-processing
```

When the `data_assistant` agent runs, it will now have all the knowledge and instructions defined in `skills/file-processing/SKILL.md` added to its prompt.
