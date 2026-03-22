import React, { useContext } from 'react';
import { FormContext } from './FormContext';
import Select from './Select';
import TextInput from './TextInput';

const KnowledgeBaseConfig = ({ agentIndex }) => {
  const { formData, updateAgentConfig } = useContext(FormContext);
  const agentData = formData.agents[agentIndex];

  if (!agentData.useGlobalKnowledgeBase) return null;

  const handleGlobalKbChange = (e) => {
    const { name, value } = e.target;
    // Assuming only one global KB for simplicity in this UI
    const updatedKb = { ...(agentData.global_kb[0] || {}), [name]: value };
    updateAgentConfig(agentIndex, 'global_kb', [updatedKb]);
  };

  // Initialize if needed
  if (agentData.global_kb.length === 0) {
      updateAgentConfig(agentIndex, 'global_kb', [{ name: 'global_kb', description: 'Global document search', type: 'chroma' }]);
  }

  return (
    <div className="space-y-4 p-4 border border-slate-700 rounded-md">
      <h3 className="text-lg font-medium text-sky-400">Global Knowledge Base Configuration</h3>
      {(agentData.global_kb || []).map((kb, index) => (
        <div key={index} className="space-y-3">
          <TextInput label="KB Name" name="name" value={kb.name} onChange={handleGlobalKbChange} />
          <TextInput label="Description" name="description" value={kb.description} onChange={handleGlobalKbChange} />
          <Select
            label="Vector Store Type"
            name="type"
            value={kb.type}
            onChange={handleGlobalKbChange}
            options={['chroma', 'postgres', 's3']}
          />
        </div>
      ))}
    </div>
  );
};

export default KnowledgeBaseConfig;
