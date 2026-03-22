import React, { useContext, useEffect } from 'react';
import { FormContext } from './FormContext';
import TextInput from './TextInput';
import Select from './Select';
import EnvVarsConfig from './EnvVarsConfig';

const McpServerConfig = ({ agentIndex }) => {
  const { formData, updateAgentConfig } = useContext(FormContext);
  const agentData = formData.agents[agentIndex];

  // Initialize MCP server configs based on names from Step 2
  useEffect(() => {
    if (agentData.useMcps) {
      const serverNames = (agentData.mcp_server_names || '').split(',').map(s => s.trim()).filter(Boolean);
      const existingNames = (agentData.mcp_servers || []).map(m => m.name);

      if (serverNames.length > 0 && serverNames.join(',') !== existingNames.join(',')) {
        const initialMcps = serverNames.map(name => ({
          name: name,
          type: 'stdio',
          command: 'python',
          args: '',
          env: [{ key: '', value: '' }],
          url: '',
          headers: [{ key: '', value: '' }]
        }));
        updateAgentConfig(agentIndex, 'mcp_servers', initialMcps);
      }
    } else {
        // Clear if checkbox is unchecked
        if (agentData.mcp_servers && agentData.mcp_servers.length > 0) {
            updateAgentConfig(agentIndex, 'mcp_servers', []);
        }
    }
  }, [agentData.useMcps, agentData.mcp_server_names, agentIndex, updateAgentConfig]);

  if (!agentData.useMcps) return null;

  const handleMcpChange = (mcpIndex, field, value) => {
    const updatedMcps = [...(agentData.mcp_servers || [])];
    updatedMcps[mcpIndex] = { ...updatedMcps[mcpIndex], [field]: value };
    updateAgentConfig(agentIndex, 'mcp_servers', updatedMcps);
  };

  return (
    <div className="space-y-4">
      {(agentData.mcp_servers || []).map((mcp, index) => (
        <div key={index} className="p-4 border border-slate-700/50 bg-slate-900/30 rounded-xl space-y-4">
          <p className="font-semibold text-slate-200 text-lg">{mcp.name}</p>
          <Select
            label="Type"
            value={mcp.type}
            onChange={(e) => handleMcpChange(index, 'type', e.target.value)}
            options={['stdio', 'remote']}
          />
          {mcp.type === 'stdio' ? (
            <div className="space-y-4">
              <TextInput label="Command" value={mcp.command} onChange={(e) => handleMcpChange(index, 'command', e.target.value)} />
              <TextInput label="Args (comma-separated)" value={mcp.args} onChange={(e) => handleMcpChange(index, 'args', e.target.value)} />
              <EnvVarsConfig
                envVars={mcp.env}
                onEnvVarChange={(newEnv) => handleMcpChange(index, 'env', newEnv)}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <TextInput label="URL" value={mcp.url} onChange={(e) => handleMcpChange(index, 'url', e.target.value)} />
              <EnvVarsConfig
                envVars={mcp.headers}
                onEnvVarChange={(newHeaders) => handleMcpChange(index, 'headers', newHeaders)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default McpServerConfig;
