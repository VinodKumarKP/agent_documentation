---
sidebar_position: 1
---

# Create a Document

Documents are **groups of pages** connected through:

- a **sidebar**
- **previous/next navigation**
- **versioning**

## Create your first Doc

Create a file at \`docs/hello.md\`:

\`\`\`md title="docs/hello.md"
# Hello

This is my **first Docusaurus document**!
\`\`\`

## Configure the Sidebar

Docusaurus automatically **creates a sidebar** from the \`docs\` folder.

Add metadata to customize the sidebar label and position:

\`\`\`md title="docs/hello.md"
---
sidebar_label: 'Hi!'
sidebar_position: 3
---

# Hello

This is my **first Docusaurus document**!
\`\`\`

## Docs Structure

The \`docs\` folder structure looks like this:

\`\`\`text
docs/
├── intro.md
├── tutorial-basics/
│   ├── _category_.json
│   ├── congradulations.md
│   ├── create-a-blog-post.md
│   ├── create-a-document.md
│   ├── create-a-page.md
│   ├── deploy-your-site.md
│   ├── markdown-features.md
│   └── translate-your-site.md
├── tutorial-extras/
│   ├── _category_.json
│   ├── manage-docs-versions.md
│   └── translate-your-site.md
└── hello.md
\`\`\`
