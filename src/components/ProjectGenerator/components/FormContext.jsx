import React, { createContext, useState } from 'react';

const FormContext = createContext();

const defaultAgentConfig = {
  name: 'new_agent',
  framework: 'langgraph',
  pattern: 'supervisor',
  useTools: false,
  useSkills: false,
  useMcps: false,
  enable_lazy_loading: false,
  mcp_server_names: '',
  useMemory: false,
  useGlobalKnowledgeBase: false,
  useGuardrails: false,
  tool_list: '',
  skill_list: '',
  mcp_servers: [],
  sub_agents: [],
  global_kb: [],
  memory_config: {},
  global_structured_output_model: '',
  port: 8000,
  description: 'An AI Agent',
  instructions: 'You are a helpful assistant.',
  model_id: 'anthropic.claude-3-5-sonnet-20240620-v1:0',
  region: 'us-east-1',
  entry_agent: '',
  tags: 'agent',
  prompts: [],
  env: {}
};

const defaultMcpConfig = {
    name: 'new_server',
    port: 8001,
    description: 'An MCP Server',
    class_name: 'NewServerTools',
    tags: 'mcp',
    source: '',
    env: ''
};

const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Step 1
    projectName: '',
    author: '',
    email: '',
    templateType: 'agent',

    // Agent configurations
    agents: [defaultAgentConfig],
    selectedAgentIndex: 0,

    // MCP configurations
    servers: [defaultMcpConfig],
    selectedServerIndex: 0,
  });

  // Agent Handlers
  const updateAgentConfig = (index, field, value) => {
    const newAgents = [...formData.agents];
    newAgents[index] = { ...newAgents[index], [field]: value };
    setFormData(prev => ({ ...prev, agents: newAgents }));
  };

  const addAgent = () => {
    const lastAgent = formData.agents[formData.agents.length - 1];
    const newPort = lastAgent ? lastAgent.port + 1 : 8000;
    setFormData(prev => ({
      ...prev,
      agents: [...prev.agents, { ...defaultAgentConfig, name: `new_agent_${prev.agents.length}`, port: newPort }]
    }));
  };

  const removeAgent = (index) => {
    const newAgents = formData.agents.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      agents: newAgents,
      selectedAgentIndex: Math.max(0, index - 1)
    }));
  };

  const setSelectedAgentIndex = (index) => {
    setFormData(prev => ({ ...prev, selectedAgentIndex: index }));
  };

  // MCP Handlers
  const updateMcpConfig = (index, field, value) => {
    const newServers = [...formData.servers];
    newServers[index] = { ...newServers[index], [field]: value };
    setFormData(prev => ({ ...prev, servers: newServers }));
  };

  const addMcpServer = () => {
    const lastServer = formData.servers[formData.servers.length - 1];
    const newPort = lastServer ? lastServer.port + 1 : 8001;
    setFormData(prev => ({
      ...prev,
      servers: [...prev.servers, { ...defaultMcpConfig, name: `new_server_${prev.servers.length}`, port: newPort }]
    }));
  };

  const removeMcpServer = (index) => {
    const newServers = formData.servers.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      servers: newServers,
      selectedServerIndex: Math.max(0, index - 1)
    }));
  };

  const setSelectedServerIndex = (index) => {
    setFormData(prev => ({ ...prev, selectedServerIndex: index }));
  };

  return (
    <FormContext.Provider value={{
      formData,
      setFormData,
      updateAgentConfig,
      addAgent,
      removeAgent,
      setSelectedAgentIndex,
      updateMcpConfig,
      addMcpServer,
      removeMcpServer,
      setSelectedServerIndex
    }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider, defaultAgentConfig, defaultMcpConfig };
