import React, { useContext } from 'react';
import { FormContext } from './FormContext';
import Select from './Select';
import TextInput from './TextInput';

const MemoryConfig = ({ agentIndex }) => {
  const { formData, updateAgentConfig } = useContext(FormContext);
  const agentData = formData.agents[agentIndex];

  if (!agentData.useMemory) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedMemoryConfig = { ...(agentData.memory_config || {}), [name]: value };
    updateAgentConfig(agentIndex, 'memory_config', updatedMemoryConfig);
  };

  return (
    <div className="space-y-4 p-4 border border-slate-700 rounded-md">
      <h3 className="text-lg font-medium text-sky-400">Memory Configuration</h3>
      <Select
        label="Vector Store Type"
        name="type"
        value={agentData.memory_config.type || 'chroma'}
        onChange={handleChange}
        options={['chroma', 'postgres', 's3']}
      />
      <TextInput
        label="Collection Name"
        name="collection_name"
        value={agentData.memory_config.collection_name || 'chat_memory'}
        onChange={handleChange}
      />
    </div>
  );
};

export default MemoryConfig;
