---
sidebar_position: 2
---

# Translate your site

Docusaurus is **i18n-ready** and can be translated easily.

## Configure i18n

Modify \`docusaurus.config.js\` to add support for the \`fr\` locale:

\`\`\`js title="docusaurus.config.js"
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
  themeConfig: {
    navbar: {
      items: [
        // ...
        {
          type: 'localeDropdown',
        },
        // ...
      ],
    },
  },
};
\`\`\`

## Translate your docs

Copy your docs to the \`i18n\` folder:

\`\`\`bash
mkdir -p i18n/fr/docusaurus-plugin-content-docs/current
cp -r docs/** i18n/fr/docusaurus-plugin-content-docs/current
\`\`\`

Translate \`i18n/fr/docusaurus-plugin-content-docs/current/intro.md\` to French.

## Start your site

Start your site in French:

\`\`\`bash
npm run start -- --locale fr
\`\`\`

Your localized site is accessible at \`http://localhost:3000/fr/\` and the \`Docs\` page at \`http://localhost:3000/fr/docs/intro\`.
