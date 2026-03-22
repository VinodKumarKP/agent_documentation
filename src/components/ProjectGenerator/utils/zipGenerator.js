import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// --- Constants (equivalent of constants.py) ---
const TOKEN_PROJECT_NAME = "{{PROJECT_NAME}}";
const TOKEN_AUTHOR = "{{AUTHOR}}";
const TOKEN_EMAIL = "{{EMAIL}}";
const TOKEN_DESCRIPTION = "{{DESCRIPTION}}";
const TOKEN_TITLE = "{{PROJECT_TITLE}}";
const TOKEN_AGENT_CORE_PYPROJECT = '"{{AGENT_CORE_PYPROJECT_PLACEHOLDER}}"';
const TOKEN_AGENT_CORE_REQUIREMENTS = "{{AGENT_CORE_REQUIREMENTS_PLACEHOLDER}}";

const AGENT_CORE_DEPS = {
    langgraph: "oai-langgraph-agent-core",
    crewai: "oai-crewai-agent-core",
    strands: "oai-aws-strands-core",
    openai: "oai-openai-agent-core"
};

const AGENT_CORE_SUBDIRS = {
    langgraph: "packages/langgraph-agent-core",
    crewai: "packages/crewai-agent-core",
    strands: "packages/aws-strands-core",
    openai: "packages/openai-agent-core"
};

const VECTOR_STORE_EXTRAS = {
    chroma: "chromadb",
    postgres: "postgres",
    s3: "s3"
};

const FRAMEWORK_INFO = {
    langgraph: { core: "langgraph_core", pkg: "langgraph_agent", cls: "LangGraphAgent" },
    crewai: { core: "crewai_core", pkg: "crewai_agent", cls: "CrewAIAgent" },
    strands: { core: "aws_strands_core", pkg: "aws_strands_agent", cls: "StrandsAgent" },
    openai: { core: "openai_core", pkg: "openai_agent", cls: "OpenAIAgent" }
};

function parseEnvArray(envArray) {
    if (!envArray || envArray.length === 0) return {};
    return envArray.reduce((acc, { key, value }) => {
        if (key) {
            acc[key] = value;
        }
        return acc;
    }, {});
}

// --- Main Export ---
export async function generateZip(formData) {
    const zip = new JSZip();
    const baseProjectName = formData.projectName || 'my-oai-project';
    
    let finalZipName = baseProjectName;
    let folderName = baseProjectName;

    if (formData.templateType === 'agent') {
        folderName = `ptr_agent_servers_${baseProjectName}`;
        finalZipName = folderName;
    } else if (formData.templateType === 'mcp') {
        folderName = `ptr_mcp_servers_${baseProjectName}`;
        finalZipName = folderName;
    }

    const projectDir = zip.folder(folderName);

    try {
        if (formData.templateType === 'agent') {
            await setupAgentProject(projectDir, formData);
        } else {
            await setupMcpProject(projectDir, formData);
        }

        await renderFinalPlaceholders(projectDir, { ...formData, projectName: folderName });

        const blob = await zip.generateAsync({ type: 'blob' });
        saveAs(blob, `${finalZipName}.zip`);
    } catch (error) {
        console.error("Zip generation failed:", error);
        throw new Error(error.message || "An unexpected error occurred during zip generation.");
    }
}

// --- File Fetcher ---
async function fetchFile(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to fetch template file: ${path}`);
    }
    return response.text();
}

// --- Agent Project Logic ---
async function setupAgentProject(projectDir, formData) {
    // This is a simplified file listing. A manifest file would be more robust.
    const agentFiles = [
        "agentic_registry_agents/agents/server_template/agent.template",
        "agentic_registry_agents/agents/server_template/server.template",
        "agentic_registry_agents/agents/server_template/__init__.py",
        "agentic_registry_agents/agents/__init__.py",
        "agentic_registry_agents/agents_config/template.yaml",
        "agentic_registry_agents/__init__.py",
        "pyproject.toml",
        "requirements.txt",
        "README.md",
        ".gitignore",
        "Dockerfile"
    ];

    for (const filePath of agentFiles) {
        try {
            const content = await fetchFile(`/templates/agent/${filePath}`);
            projectDir.file(filePath, content);
        } catch (e) {
            console.warn(`Skipping missing template file: ${filePath}`);
        }
    }

    const agenticRegistry = projectDir.folder("agentic_registry_agents");
    const agentsDir = agenticRegistry.folder("agents");
    const agentsConfigDir = agenticRegistry.folder("agents_config");
    const utilsDir = agenticRegistry.folder("utils");
    utilsDir.file("__init__.py", "");
    const skillsDir = agenticRegistry.folder("skills");
    skillsDir.file("__init__.py", "");
    const structuredOutputDir = agenticRegistry.folder("structured_output");
    structuredOutputDir.file("__init__.py", "");

    const serverTemplateDir = projectDir.folder("agentic_registry_agents/agents/server_template");

    for (const agentConfig of formData.agents) {
        const agentName = agentConfig.name;
        const info = FRAMEWORK_INFO[agentConfig.framework] || FRAMEWORK_INFO["langgraph"];
        const agentDir = agentsDir.folder(agentName);

        const agentTemplateContent = await serverTemplateDir.file("agent.template").async("string");
        const serverTemplateContent = await serverTemplateDir.file("server.template").async("string");
        agentDir.file("__init__.py", await serverTemplateDir.file("__init__.py").async("string"));

        const agentClassName = agentName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + "Agent";

        let finalAgentContent = agentTemplateContent
            .replace("{{core_package_name}}", info.core)
            .replace("{{agent_package_name}}", info.pkg)
            .replace("{{agent_class_name}}", info.cls)
            .replace("{{AgentName}}", agentClassName);
        agentDir.file("agent.py", finalAgentContent);

        let finalServerContent = serverTemplateContent
            .replace("{{agent_class_file_name}}", agentName)
            .replace("{{AgentName}}", agentClassName);
        agentDir.file("server.py", finalServerContent);

        // Generate full YAML and other files
        const yamlContent = generateAgentYaml(agentName, { ...agentConfig, description: formData.description || agentConfig.description });
        agentsConfigDir.file(`${agentName}.yaml`, yamlContent);

        generateAgentUtils(utilsDir, agentName, agentConfig);
        generateAgentSkills(skillsDir, agentConfig);
        generateStructuredOutputs(structuredOutputDir, agentConfig);
    }

    projectDir.remove("agentic_registry_agents/agents/server_template");
    projectDir.remove("agentic_registry_agents/agents_config/template.yaml");

    await updateAgentDependencies(projectDir, formData);
}

export function generateAgentYaml(agentName, config) {
    const yaml = [];

    // Basic Info
    yaml.push("active: true", `name: ${agentName}`, `description: |
  ${config.description || 'An AI Agent'}`, `type: ${config.framework || 'langgraph'}`, "cloud_provider: aws", `port: ${config.port || 8000}`, "");

    // Env Vars
    const envVars = parseEnvArray(config.env);
    if (Object.keys(envVars).length > 0) {
        yaml.push("env:");
        for (const [key, value] of Object.entries(envVars)) {
            yaml.push(`  ${key}: "${value}"`);
        }
        yaml.push("");
    }

    // Instructions / System Prompt
    const subAgents = config.sub_agents || [];
    const mcpServers = config.mcp_servers || [];
    const globalKb = config.global_kb || [];
    const pattern = config.pattern || 'single';
    const entryAgent = config.entry_agent;
    const globalStructuredOutputModel = config.global_structured_output_model;

    const systemPrompt = config.instructions || (subAgents.length > 1 ? 'Default supervisor prompt.' : 'Default agent prompt.');
    yaml.push(`system_prompt: |\n  ${systemPrompt}`, "");


    // --- Knowledge Base ---
    if (config.useGlobalKnowledgeBase && globalKb.length > 0) {
        yaml.push("# Global Knowledge Base Definitions", "knowledge_base:");
        yaml.push(...generateKbSection(globalKb, 2));
        yaml.push("");
    }
    
    // --- Memory ---
    if (config.useMemory && config.memory_config) {
        yaml.push("# Memory Configuration", "memory:");
        const memConfig = config.memory_config;
        const memType = memConfig.type || 'chroma';
        yaml.push(`  vector_store:`);
        yaml.push(`    type: ${memType}`);
        yaml.push(`    settings:`);
        yaml.push(`      collection_name: "${memConfig.collection_name || 'chat_memory'}"`);
        yaml.push(`      persist_directory: "./rag_db"`);
        if (memType === "postgres") {
            yaml.push(`      # db_host: your-postgres-host.com`);
        } else if (memType === "s3") {
            yaml.push(`      # bucket_name: your-bucket`);
        }
        yaml.push(`  embedding:`);
        yaml.push(`    model_id: "bedrock/amazon.titan-embed-text-v1"`);
        yaml.push(`    region_name: "us-west-2"`);
        yaml.push("");
    }

    // --- Guardrails ---
    if (config.useGuardrails) {
        yaml.push("# Guardrails Configuration", "guardrails:");
        yaml.push("  validators:");
        yaml.push("    - name: competitor_check");
        yaml.push("      full_name: guardrails/competitor_check");
        yaml.push("      parameters:");
        yaml.push('        competitors: ["Apple", "Samsung"]');
        yaml.push('      on_fail: "fix"');
        yaml.push("    - name: restrict_to_topic");
        yaml.push("      full_name: tryolabs/restricttotopic");
        yaml.push("      parameters:");
        yaml.push('        valid_topics: ["electronics", "company"]');
        yaml.push('        invalid_topics: ["politics"]');
        yaml.push("    - name: DetectPII");
        yaml.push("      class_name: DetectPII");
        yaml.push("      full_name: guardrails/detect_pii");
        yaml.push("      parameters:");
        yaml.push('        pii_entities: [ "EMAIL_ADDRESS", "PHONE_NUMBER" ]');
        yaml.push("    - name: profanity_free");
        yaml.push("      full_name: guardrails/profanity_free");
        yaml.push("  input:");
        yaml.push("    validators:");
        yaml.push("      - ref: DetectPII");
        yaml.push("      - ref: profanity_free");
        yaml.push("      - ref: restrict_to_topic");
        yaml.push("  output:");
        yaml.push("    validators:");
        yaml.push("      - ref: profanity_free");
        yaml.push("      - ref: DetectPII");
        yaml.push("      - ref: competitor_check");
        yaml.push('        on_fail: "exception" # Override on_fail for this specific use case');
        yaml.push("      - ref: restrict_to_topic");
        yaml.push('        on_fail: "exception" # Override on_fail for this specific use case');
        yaml.push("");
    }
    
    // --- Structured Output ---
    const hasGlobalStructuredOutput = !!globalStructuredOutputModel;
    const hasSubAgentStructuredOutput = subAgents.some(sub => sub.structured_output_model);
    if (hasGlobalStructuredOutput || hasSubAgentStructuredOutput) {
        yaml.push("# Structured Output Configuration", "structured_output:");
        yaml.push('  script_dir: "./structured_output"');
        yaml.push("");
    }


    // --- Agent List ---
    yaml.push("# Agent configuration", "agent_list:");
    
    let agentsToProcess;
    let isMultiAgent = subAgents.length > 0;

    if (isMultiAgent) {
        agentsToProcess = subAgents;
    } else {
        const singleAgent = { 
            name: agentName, 
            system_prompt: config.instructions,
            context: '', 
            tools: config.tool_list, 
            skills: config.skill_list,
            use_mcps: config.useMcps,
            mcp_server_names: config.mcp_server_names,
            knowledge_base_references: (config.useGlobalKnowledgeBase && globalKb.length > 0) ? globalKb.map(kb => kb.name) : []
        };
        agentsToProcess = [singleAgent];
    }
    
    for (const agent of agentsToProcess) {
        const toolList = Array.isArray(agent.tools) ? agent.tools : (agent.tools || '').split(',').map(t => t.trim()).filter(Boolean);
        const skillList = Array.isArray(agent.skills) ? agent.skills : (agent.skills || '').split(',').map(s => s.trim()).filter(Boolean);
        const mcpList = Array.isArray(agent.mcp_server_names) ? agent.mcp_server_names : (agent.mcp_server_names || '').split(',').map(m => m.trim()).filter(Boolean);

        yaml.push(`  - ${agent.name}:`);
        yaml.push(`      system_prompt: ${agent.system_prompt || config.instructions || `Prompt for ${agent.name}`}`);
        
        if (agent.structured_output_model) {
            yaml.push(`      structured_output_model: ${agent.structured_output_model}`);
        }
        if (skillList.length > 0) {
            yaml.push("      skills:", ...skillList.map(s => `        - ${s}`));
        }
        if (toolList.length > 0) {
            yaml.push("      tools:", ...toolList.map(t => `        - ${t}`));
        }
        if (agent.use_mcps && mcpList.length > 0) {
            yaml.push("      mcps:", ...mcpList.map(m => `        - ${m}`));
        }
        if (agent.context && agent.context.length > 0) {
            yaml.push("      context:", ...agent.context.split(',').map(c => `        - ${c.trim()}`));
        }
        
        if (isMultiAgent) {
            if (agent.knowledge_base && agent.knowledge_base.length > 0) {
                yaml.push("      knowledge_base:");
                yaml.push(...generateKbSection(agent.knowledge_base, 8));
            }
        } else {
            if (agent.knowledge_base_references && agent.knowledge_base_references.length > 0) {
                yaml.push("      knowledge_base:");
                agent.knowledge_base_references.forEach(kbName => {
                    yaml.push(`        - ${kbName}`);
                });
            }
        }
    }
    yaml.push("");

    // Model
    yaml.push("# Model configuration", "model:", `  model_id: ${config.model_id}`, `  region_name: ${config.region}`, "");

    // Tools
    const allTools = agentsToProcess.flatMap(sub => Array.isArray(sub.tools) ? sub.tools : (sub.tools || '').split(',').map(t => t.trim()).filter(Boolean));
    if (allTools.length > 0) {
        const utilsName = `${agentName}_utils`;
        yaml.push("# For tools configuration", "tools:", `  ${utilsName}:`, `    module: ${utilsName}`, `    base_path: ./utils`, "");
    }

    // Skills
    const allSkills = agentsToProcess.flatMap(sub => Array.isArray(sub.skills) ? sub.skills : (sub.skills || '').split(',').map(s => s.trim()).filter(Boolean));
    if (allSkills.length > 0) {
        yaml.push("# Skills configuration", "skills:", `  skill_dir: "./skills"`, "");
    }

    // MCPs
    yaml.push("# For MCP type agents", "mcps: {}");
    if (mcpServers.length > 0) {
        yaml[yaml.length - 1] = "mcps:";
        for (const srv of mcpServers) {
            yaml.push(`  ${srv.name}:`);
            if (srv.type === 'stdio') {
                yaml.push(`    command: ${srv.command || 'python'}`);
                const args = (srv.args || '').split(',').filter(arg => arg.trim()).map(arg => `"${arg.trim()}"`).join(', ');
                yaml.push(`    args: [${args}]`);
                const mcpEnvVars = parseEnvArray(srv.env);
                if (Object.keys(mcpEnvVars).length > 0) {
                    yaml.push(`    env:`);
                    for (const [key, value] of Object.entries(mcpEnvVars)) {
                        yaml.push(`      ${key}: "${value}"`);
                    }
                }
            } else {
                yaml.push(`    url: ${srv.url || ''}`);
                const headers = parseEnvArray(srv.headers);
                if (Object.keys(headers).length > 0) {
                    yaml.push(`    headers:`);
                    for (const [key, value] of Object.entries(headers)) {
                        yaml.push(`      ${key}: "${value}"`);
                    }
                }
            }
        }
    }
    yaml.push("");

    // Crew Config
    yaml.push("crew_config:", `  pattern: ${pattern}`);
    if (entryAgent) {
        yaml.push(`  entry_agent: ${entryAgent}`);
    }
    if (globalStructuredOutputModel) {
        yaml.push(`  structured_output_model: ${globalStructuredOutputModel}`);
    }
    if (config.enable_lazy_loading) {
        yaml.push(`  enable_lazy_loading: true`);
    }

    return yaml.join('\n');
}

function generateKbSection(kbList, indentLevel) {
    const lines = [];
    const indent = " ".repeat(indentLevel);
    for (const kb of kbList) {
        const kbType = kb.type || "chroma";
        lines.push(`${indent}- name: ${kb.name}`);
        lines.push(`${indent}  description: "${kb.description || 'A knowledge base.'}"`);
        lines.push(`${indent}  vector_store:`);
        lines.push(`${indent}    type: ${kbType}`);
        lines.push(`${indent}    settings:`);
        lines.push(`${indent}      collection_name: "${kb.name}"`);
        lines.push(`${indent}      persist_directory: "./rag_db"`);
        if (kbType === "postgres") {
            lines.push(`${indent}      # db_host: your-postgres-host.com`);
        } else if (kbType === "s3") {
            lines.push(`${indent}      # bucket_name: your-bucket`);
        }
        lines.push(`${indent}  embedding:`);
        lines.push(`${indent}    model_id: "bedrock/amazon.titan-embed-text-v1"`);
        lines.push(`${indent}    region_name: "us-west-2"`);
        lines.push(`${indent}  data_sources:`);
        lines.push(`${indent}    - path: "docs/sample.pdf"`);
    }
    return lines;
}

function generateAgentUtils(utilsDir, agentName, agentConfig) {
    const allTools = (agentConfig.sub_agents || []).flatMap(sub => Array.isArray(sub.tools) ? sub.tools : (sub.tools || '').split(',').map(t => t.trim()).filter(Boolean));
    const uniqueTools = [...new Set(allTools)];

    if (uniqueTools.length > 0) {
        const utilsFilename = `${agentName}_utils.py`;
        let utilsContent = '"""Tools utility functions."""\n\n';
        for (const tool of uniqueTools) {
            utilsContent += `def ${tool}():\n    """Dummy implementation for ${tool}."""\n    return "Executed ${tool}"\n\n`;
        }
        utilsDir.file(utilsFilename, utilsContent);
    }
}

function generateAgentSkills(skillsDir, agentConfig) {
    const allSkills = (agentConfig.sub_agents || []).flatMap(sub => Array.isArray(sub.skills) ? sub.skills : (sub.skills || '').split(',').map(s => s.trim()).filter(Boolean));
    const uniqueSkills = [...new Set(allSkills)];

    for (const skill of uniqueSkills) {
        const skillDir = skillsDir.folder(skill);
        skillDir.file("__init__.py", "");
        skillDir.file("main.py", `"""Implementation for ${skill} skill."""\n`);
    }
}

function generateStructuredOutputs(outputDir, agentConfig) {
    const models = new Set();
    if (agentConfig.global_structured_output_model) {
        models.add(agentConfig.global_structured_output_model);
    }
    (agentConfig.sub_agents || []).forEach(sub => {
        if (sub.structured_output_model) {
            models.add(sub.structured_output_model);
        }
    });

    if (models.size > 0) {
        outputDir.file("__init__.py", "");
        for (const modelName of models) {
            const fileContent = `from pydantic import BaseModel, Field\n\nclass ${modelName}(BaseModel):\n    """Define the structured output for ${modelName}."""\n    param1: str = Field(description="An example parameter.")\n`;
            outputDir.file(`${modelName.toLowerCase()}.py`, fileContent);
        }
    }
}

async function updateAgentDependencies(projectDir, formData) {
    const extras = new Set();
    for (const agentConfig of formData.agents) {
        if (agentConfig.useMemory || agentConfig.useGlobalKnowledgeBase) {
            extras.add("vector-required");
            if (agentConfig.memory_config?.type) extras.add(VECTOR_STORE_EXTRAS[agentConfig.memory_config.type]);
            if (agentConfig.global_kb?.[0]?.type) extras.add(VECTOR_STORE_EXTRAS[agentConfig.global_kb[0].type]);
        }
        if (agentConfig.useGuardrails) {
            extras.add("guardrails");
        }
        (agentConfig.sub_agents || []).forEach(sub => {
            if (sub.knowledge_base && sub.knowledge_base.length > 0) {
                extras.add("vector-required");
                sub.knowledge_base.forEach(kb => {
                    if(kb.type) extras.add(VECTOR_STORE_EXTRAS[kb.type]);
                });
            }
        });
    }

    // Assume framework is the same for all agents for dependency calculation
    const framework = formData.agents[0]?.framework || 'langgraph';
    const baseDep = AGENT_CORE_DEPS[framework];
    if (!baseDep) return;

    const extrasStr = Array.from(extras).sort().join(',');
    const pyprojectDep = extrasStr ? `"${baseDep}[${extrasStr}]"` : `"${baseDep}"`;
    const subdir = AGENT_CORE_SUBDIRS[framework];
    const reqDep = `${baseDep}${extrasStr ? `[${extrasStr}]` : ''} @ git+https://github.com/Capgemini-Innersource/ptr_oai_agent_development_kit.git@main#subdirectory=${subdir}`;

    const pyprojectFile = projectDir.file("pyproject.toml");
    if (pyprojectFile) {
        let content = await pyprojectFile.async("string");
        content = content.replace(TOKEN_AGENT_CORE_PYPROJECT, pyprojectDep);
        projectDir.file("pyproject.toml", content);
    }

    const reqFile = projectDir.file("requirements.txt");
    if (reqFile) {
        let content = await reqFile.async("string");
        content = content.replace(TOKEN_AGENT_CORE_REQUIREMENTS, reqDep);
        projectDir.file("requirements.txt", content);
    }
}

async function setupMcpProject(projectDir, formData) {
    const mcpFiles = [
        "mcp_registry_servers/servers/server.py",
        "mcp_registry_servers/servers/__init__.py",
        "mcp_registry_servers/servers_config/template_server.yaml",
        "mcp_registry_servers/server.template",
        "mcp_registry_servers/__init__.py",
        "pyproject.toml",
        "requirements.txt",
        "README.md",
        ".gitignore",
        "Dockerfile"
    ];

    for (const filePath of mcpFiles) {
        try {
            const content = await fetchFile(`/templates/mcp/${filePath}`);
            projectDir.file(filePath, content);
        } catch (e) {
            console.warn(`Skipping missing template file: ${filePath}`);
        }
    }

    const mcpRegistry = projectDir.folder("mcp_registry_servers");
    const serversDir = mcpRegistry.folder("servers");
    const serversConfigDir = mcpRegistry.folder("servers_config");
    const toolsDir = mcpRegistry.folder("tools");
    toolsDir.file("__init__.py", "");

    const serverTemplateContent = await mcpRegistry.file("server.template").async("string");

    for (const serverConfig of formData.servers) {
        const serverName = serverConfig.name;
        const serverDir = serversDir.folder(serverName);
        serverDir.file("__init__.py", "");

        const toolsClassName = serverConfig.class_name || serverName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + "Tools";
        const toolFileName = serverName;

        // Create tool file
        const toolContent = `class ${toolsClassName}:\n    def example_tool(self):\n        return "Hello from ${toolsClassName}"\n`;
        toolsDir.file(`${toolFileName}.py`, toolContent);

        // Create server file
        const serverClassName = serverName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + "Server";
        const finalServerContent = serverTemplateContent
            .replace("{server_name}", serverClassName)
            .replace("{tool_file_name}", toolFileName)
            .replace("{tools_class_name}", toolsClassName);
        serverDir.file("server.py", finalServerContent);

        // Create config yaml
        const yamlContent = generateMcpYaml({ ...serverConfig, description: formData.description || serverConfig.description });
        serversConfigDir.file(`${serverName}.yaml`, yamlContent);
    }

    projectDir.remove("mcp_registry_servers/server.template");
    projectDir.remove("mcp_registry_servers/servers_config/template_server.yaml");
}

export function generateMcpYaml(config) {
    const yaml = [];
    yaml.push(`port: ${config.port || 8001}`);
    yaml.push(`description: |\n  ${config.description || 'An MCP Server'}`);
    if (config.tags) {
        yaml.push("tags:", ...config.tags.split(',').map(t => `  - ${t.trim()}`));
    }
    if (config.source) {
        yaml.push(`source: ${config.source}`);
    }
    
    const envVars = parseEnvArray(config.env);
    if (Object.keys(envVars).length > 0) {
        yaml.push("env:");
        for (const [key, value] of Object.entries(envVars)) {
            yaml.push(`  ${key}: "${value}"`);
        }
    }

    return yaml.join('\n');
}


async function renderFinalPlaceholders(projectDir, formData) {
    const replacements = {
        [TOKEN_PROJECT_NAME]: formData.projectName,
        [TOKEN_AUTHOR]: formData.author,
        [TOKEN_EMAIL]: formData.email,
        [TOKEN_DESCRIPTION]: formData.description || `Project ${formData.projectName}`,
        [TOKEN_TITLE]: formData.projectName.replace(/_/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())
    };

    const filePromises = [];
    projectDir.forEach((relativePath, file) => {
        if (!file.dir) {
            const promise = file.async("string").then(content => {
                let updated = false;
                for (const [token, value] of Object.entries(replacements)) {
                    if (content.includes(token)) {
                        content = content.replace(new RegExp(token.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), value);
                        updated = true;
                    }
                }
                if (updated) {
                    projectDir.file(relativePath, content);
                }
            }).catch(() => { /* Ignore binary files */ });
            filePromises.push(promise);
        }
    });
    await Promise.all(filePromises);
}
