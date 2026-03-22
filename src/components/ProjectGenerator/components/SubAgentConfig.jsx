import React, { useContext } from 'react';
import { FormContext } from './FormContext';
import TextInput from './TextInput';
import Checkbox from './Checkbox';
import Select from './Select';
import TagInput from './TagInput';

const SubAgentConfig = ({ agentIndex }) => {
  const { formData, updateAgentConfig } = useContext(FormContext);
  const agentData = formData.agents[agentIndex];
  const availableMcps = (agentData.mcp_server_names || []).map(mcp => mcp);

  const handleSubAgentChange = (subIndex, field, value) => {
    const updatedSubAgents = [...(agentData.sub_agents || [])];
    updatedSubAgents[subIndex] = { ...updatedSubAgents[subIndex], [field]: value };
    updateAgentConfig(agentIndex, 'sub_agents', updatedSubAgents);
  };
  
  const handleSubAgentCheckboxChange = (subIndex, e) => {
    const { name, checked } = e.target;
    handleSubAgentChange(subIndex, name, checked);
  };

  const handleMcpSelection = (subIndex, mcpName) => {
    const subAgent = agentData.sub_agents[subIndex];
    const currentMcps = Array.isArray(subAgent.mcp_server_names) ? subAgent.mcp_server_names : [];
    const newMcps = currentMcps.includes(mcpName)
      ? currentMcps.filter(m => m !== mcpName)
      : [...currentMcps, mcpName];
    handleSubAgentChange(subIndex, 'mcp_server_names', newMcps);
  };

  const addSubAgent = () => {
    const newSubAgent = {
      name: `sub_agent_${(agentData.sub_agents || []).length + 1}`,
      description: 'A specialized sub-agent.',
      system_prompt: 'You are a helpful sub-agent.',
      context: [],
      use_kb: false,
      kb_name: 'docs_kb',
      kb_type: 'chroma',
      structured_output_model: '',
      tools: [],
      skills: [],
      use_mcps: false,
      mcp_server_names: [],
    };
    const updatedSubAgents = [...(agentData.sub_agents || []), newSubAgent];
    updateAgentConfig(agentIndex, 'sub_agents', updatedSubAgents);
  };

  const removeSubAgent = (subIndex) => {
    const updatedSubAgents = (agentData.sub_agents || []).filter((_, i) => i !== subIndex);
    updateAgentConfig(agentIndex, 'sub_agents', updatedSubAgents);
  };

  const handleKbChange = (subIndex, kbIndex, field, value) => {
    const updatedSubAgents = [...(agentData.sub_agents || [])];
    const updatedKbs = [...(updatedSubAgents[subIndex].knowledge_base || [])];
    updatedKbs[kbIndex] = { ...updatedKbs[kbIndex], [field]: value };
    updatedSubAgents[subIndex].knowledge_base = updatedKbs;
    updateAgentConfig(agentIndex, 'sub_agents', updatedSubAgents);
  };

  const addKb = (subIndex) => {
    const updatedSubAgents = [...(agentData.sub_agents || [])];
    const kbs = updatedSubAgents[subIndex].knowledge_base || [];
    updatedSubAgents[subIndex].knowledge_base = [
      ...kbs,
      {
        name: `kb_${kbs.length + 1}`,
        description: 'New Knowledge Base',
        type: 'chroma'
      }
    ];
    updateAgentConfig(agentIndex, 'sub_agents', updatedSubAgents);
  };

  const removeKb = (subIndex, kbIndex) => {
    const updatedSubAgents = [...(agentData.sub_agents || [])];
    updatedSubAgents[subIndex].knowledge_base.splice(kbIndex, 1);
    updateAgentConfig(agentIndex, 'sub_agents', updatedSubAgents);
  };

  return (
    <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-5 shadow-sm mt-6">
      <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Sub-Agent Configuration
      </h3>
      
      <div className="space-y-6">
        {(agentData.sub_agents || []).map((sub, subIndex) => (
          <div key={subIndex} className="p-5 border border-slate-700/50 bg-slate-900/30 rounded-xl space-y-4 relative group">
            <button 
              onClick={() => removeSubAgent(subIndex)} 
              className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              title="Remove Sub-Agent"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <TextInput label="Sub-Agent Name" value={sub.name} onChange={(e) => handleSubAgentChange(subIndex, 'name', e.target.value)} placeholder="e.g. search_agent" />
               <TextInput label="Structured Output Model" value={sub.structured_output_model} onChange={(e) => handleSubAgentChange(subIndex, 'structured_output_model', e.target.value)} placeholder="e.g. FlightConfirmation" />
            </div>
            
            <TextInput label="Sub-Agent Description" value={sub.description} onChange={(e) => handleSubAgentChange(subIndex, 'description', e.target.value)} isTextArea={true} placeholder="A brief description of this sub-agent's role." />
            <TextInput label="Sub-Agent System Prompt" value={sub.system_prompt} onChange={(e) => handleSubAgentChange(subIndex, 'system_prompt', e.target.value)} isTextArea={true} placeholder="You are a specialized sub-agent..." />
            <TagInput label="Context" tags={sub.context || []} onChange={(newContext) => handleSubAgentChange(subIndex, 'context', newContext)} />

            <div className="pt-2 border-t border-slate-800">
                <Checkbox name="use_mcps" label="Enable MCPs for this Sub-Agent" checked={sub.use_mcps} onChange={(e) => handleSubAgentCheckboxChange(subIndex, e)} />
                {sub.use_mcps && (
                    <div className="ml-8 mt-2 animate-in slide-in-from-top-2 fade-in duration-200">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Available MCP Servers</label>
                        {availableMcps.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {availableMcps.map(mcpName => (
                                    <Checkbox
                                        key={mcpName}
                                        name={mcpName}
                                        label={mcpName}
                                        checked={(sub.mcp_server_names || []).includes(mcpName)}
                                        onChange={() => handleMcpSelection(subIndex, mcpName)}
                                        isPill={true}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-xs text-slate-500 italic">No MCP servers defined in the global agent configuration.</div>
                        )}
                    </div>
                )}
            </div>

            {(agentData.useTools || agentData.useSkills) && (
               <div className="space-y-4 pt-2 border-t border-slate-800">
                 {agentData.useTools && <TagInput label="Tools" tags={sub.tools || []} onChange={(newTools) => handleSubAgentChange(subIndex, 'tools', newTools)} />}
                 {agentData.useSkills && <TagInput label="Skills" tags={sub.skills || []} onChange={(newSkills) => handleSubAgentChange(subIndex, 'skills', newSkills)} />}
               </div>
            )}

            <div className="pt-4 mt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                 <h4 className="text-sm font-medium text-slate-400">Knowledge Bases for <span className="text-sky-400">{sub.name}</span></h4>
                 <button onClick={() => addKb(subIndex)} className="text-xs font-medium text-sky-400 hover:text-sky-300 flex items-center gap-1 bg-sky-500/10 px-2 py-1 rounded-md transition-colors">
                   <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                   </svg>
                   Add KB
                 </button>
              </div>

              <div className="space-y-3">
                 {(sub.knowledge_base || []).length === 0 ? (
                    <div className="text-xs text-slate-500 italic p-2 bg-slate-900/50 rounded-lg text-center border border-dashed border-slate-700">No knowledge bases configured for this sub-agent.</div>
                 ) : (
                    (sub.knowledge_base || []).map((kb, kbIndex) => (
                      <div key={kbIndex} className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 flex flex-col sm:flex-row gap-3 relative group/kb items-start sm:items-end">
                        <div className="flex-grow w-full">
                           <TextInput label="KB Name" value={kb.name} onChange={(e) => handleKbChange(subIndex, kbIndex, 'name', e.target.value)} placeholder="docs_kb" />
                        </div>
                        <div className="flex-grow w-full">
                           <Select label="Vector Store" value={kb.type} onChange={(e) => handleKbChange(subIndex, kbIndex, 'type', e.target.value)} options={['chroma', 'postgres', 's3']} />
                        </div>
                        <button 
                           onClick={() => removeKb(subIndex, kbIndex)} 
                           className="absolute -top-2 -right-2 bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700 p-1 rounded-full border border-slate-700 shadow-sm transition-colors opacity-0 group-hover/kb:opacity-100"
                        >
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                           </svg>
                        </button>
                      </div>
                    ))
                 )}
              </div>
            </div>
          </div>
        ))}
        
        <button 
           onClick={addSubAgent} 
           className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-700 hover:border-sky-500/50 hover:bg-sky-500/5 text-slate-400 hover:text-sky-400 rounded-xl font-medium transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Sub-Agent
        </button>
      </div>
    </div>
  );
};

export default SubAgentConfig;
