import React, { useContext, useEffect } from 'react';
import { FormContext } from './FormContext';
import TextInput from './TextInput';
import Select from './Select';
import EnvVarsConfig from './EnvVarsConfig';

const McpServerConfig = ({ agentIndex }) => {
  const { formData, updateAgentConfig } = useContext(FormContext);
  const agentData = formData.agents[agentIndex];

  // This effect synchronizes the mcp_servers array with the names entered in the TagInput
  useEffect(() => {
    if (agentData.useMcps) {
      const serverNames = Array.isArray(agentData.mcp_server_names) ? agentData.mcp_server_names : [];
      const existingMcps = agentData.mcp_servers || [];

      // Add new servers
      const newMcps = serverNames
        .filter(name => !existingMcps.some(mcp => mcp.name === name))
        .map(name => ({
          name: name,
          type: 'stdio',
          command: 'python',
          args: '',
          env: [{ key: '', value: '' }],
          url: '',
          headers: [{ key: '', value: '' }]
        }));

      // Remove servers that are no longer in the list
      const updatedMcps = existingMcps
        .filter(mcp => serverNames.includes(mcp.name))
        .concat(newMcps);

      // Only update if there's a change to avoid infinite loops
      if (JSON.stringify(updatedMcps) !== JSON.stringify(existingMcps)) {
        updateAgentConfig(agentIndex, 'mcp_servers', updatedMcps);
      }
      
    } else {
      // Clear if the main MCP checkbox is unchecked
      if (agentData.mcp_servers && agentData.mcp_servers.length > 0) {
        updateAgentConfig(agentIndex, 'mcp_servers', []);
      }
    }
  }, [agentData.useMcps, agentData.mcp_server_names, agentIndex, updateAgentConfig]);


  if (!agentData.useMcps || !agentData.mcp_servers || agentData.mcp_servers.length === 0) {
    return (
        <div className="text-center text-sm text-slate-500 italic p-4 bg-slate-900/30 rounded-lg border-dashed border-slate-700">
            Define server names in the "Capabilities" section to configure them here.
        </div>
    );
  }

  const handleMcpChange = (mcpIndex, field, value) => {
    const updatedMcps = [...(agentData.mcp_servers || [])];
    updatedMcps[mcpIndex] = { ...updatedMcps[mcpIndex], [field]: value };
    updateAgentConfig(agentIndex, 'mcp_servers', updatedMcps);
  };

  return (
    <div className="space-y-4">
      {(agentData.mcp_servers || []).map((mcp, index) => (
        <div key={mcp.name} className="p-4 border border-slate-700/50 bg-slate-900/30 rounded-xl space-y-4">
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
