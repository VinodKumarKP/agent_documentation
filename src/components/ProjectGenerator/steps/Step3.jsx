import React, { useContext, useState } from 'react';
import { FormContext } from '../components/FormContext';
import McpServerConfig from '../components/McpServerConfig';
import MemoryConfig from '../components/MemoryConfig';
import KnowledgeBaseConfig from '../components/KnowledgeBaseConfig';
import SubAgentConfig from '../components/SubAgentConfig';
import TextInput from '../components/TextInput';
import Select from '../components/Select';
import Checkbox from '../components/Checkbox';
import EnvVarsConfig from '../components/EnvVarsConfig';

const MODEL_OPTIONS = [
    "bedrock/global.amazon.nova-2-lite-v1:0",
    "bedrock/global.anthropic.claude-haiku-4-5-20251001-v1:0",
    "bedrock/global.anthropic.claude-opus-4-5-20251101-v1:0",
    "bedrock/global.anthropic.claude-opus-4-6-v1",
    "bedrock/global.anthropic.claude-sonnet-4-6",
    "bedrock/global.anthropic.claude-sonnet-4-20250514-v1:0",
    "bedrock/global.anthropic.claude-sonnet-4-5-20250929-v1:0",
    "Custom..."
];

const Step3 = ({ goToStep }) => {
  const { formData, updateAgentConfig } = useContext(FormContext);
  const agentIndex = formData.selectedAgentIndex;
  const agentData = formData.agents[agentIndex];
  
  const [showCustomModel, setShowCustomModel] = useState(
      agentData && agentData.model_id && !MODEL_OPTIONS.slice(0, -1).includes(agentData.model_id)
  );

  if (!agentData) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-slate-300 mb-2">No Agent Selected</h3>
        <p className="text-slate-500 mb-6">Please go back and select an agent to configure.</p>
        <button 
           onClick={() => goToStep(2)} 
           className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
        >
          &larr; Back to Agents
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'model_id_select') {
        if (value === 'Custom...') {
            setShowCustomModel(true);
            updateAgentConfig(agentIndex, 'model_id', '');
        } else {
            setShowCustomModel(false);
            updateAgentConfig(agentIndex, 'model_id', value);
        }
    } else {
        updateAgentConfig(agentIndex, name, type === 'checkbox' ? checked : value);
    }
  };

  const frameworkPatterns = {
    langgraph: ["supervisor", "agent-as-tool", "swarm"],
    openai: ["supervisor", "agent-as-tool", "swarm", "handoff"],
    strands: ["graph", "swarm", "sequential", "hierarchical", "agent-as-tool"],
    crewai: ["crew", "flow"]
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-700/50">
         <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center border border-sky-500/30">
            <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
         </div>
         <div>
            <h2 className="text-2xl font-bold text-slate-100">
               Configuring <span className="text-sky-400 font-extrabold bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20 ml-1">{agentData.name}</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1">Fine-tune behavior and capabilities</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         {/* Main Config Column */}
         <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-5 shadow-sm">
               <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                 <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                 </svg>
                 Core Architecture
               </h3>
               <div className="space-y-4">
                  <TextInput
                    label="Agent Description"
                    name="description"
                    value={agentData.description}
                    onChange={handleChange}
                    isTextArea={true}
                    placeholder="A high-level description of this agent's purpose."
                  />
                  <div className="grid grid-cols-2 gap-4">
                     <Select 
                       name="framework" 
                       label="Framework" 
                       value={agentData.framework} 
                       onChange={handleChange} 
                       options={["langgraph", "crewai", "strands", "openai"]} 
                     />
                     <Select 
                       name="pattern" 
                       label="Pattern" 
                       value={agentData.pattern} 
                       onChange={handleChange} 
                       options={frameworkPatterns[agentData.framework] || []} 
                     />
                  </div>
                  
                  <div className="space-y-2">
                      <Select 
                           name="model_id_select" 
                           label="Model ID" 
                           value={showCustomModel ? "Custom..." : (MODEL_OPTIONS.includes(agentData.model_id) ? agentData.model_id : (agentData.model_id ? "Custom..." : MODEL_OPTIONS[0]))} 
                           onChange={handleChange} 
                           options={MODEL_OPTIONS} 
                      />
                      {showCustomModel && (
                          <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                              <TextInput 
                                  name="model_id" 
                                  label="Custom Model ID" 
                                  value={agentData.model_id} 
                                  onChange={handleChange} 
                                  placeholder="Enter custom model ID"
                              />
                          </div>
                      )}
                  </div>

                  <TextInput
                    label={agentData.sub_agents?.length > 1 ? "Supervisor System Prompt" : "System Prompt"}
                    name="instructions"
                    value={agentData.instructions}
                    onChange={handleChange}
                    isTextArea={true}
                    placeholder="You are a helpful assistant..."
                  />
                  
                  <TextInput
                    label="Global Structured Output Model"
                    name="global_structured_output_model"
                    value={agentData.global_structured_output_model}
                    onChange={handleChange}
                    placeholder="e.g., CompleteItinerary"
                  />
                  
                  <EnvVarsConfig
                    envVars={agentData.env}
                    onEnvVarChange={(newEnv) => updateAgentConfig(agentIndex, 'env', newEnv)}
                  />
               </div>
            </div>

            {/* Detailed Config Sections */}
            <div className="space-y-4">
               {agentData.useMcps && <McpServerConfig agentIndex={agentIndex} />}
               {agentData.useMemory && <MemoryConfig agentIndex={agentIndex} />}
               {agentData.useGlobalKnowledgeBase && <KnowledgeBaseConfig agentIndex={agentIndex} />}
               {/* ALWAYS RENDER SubAgentConfig - It handles its own UI logic */}
               <SubAgentConfig agentIndex={agentIndex} />
            </div>
         </div>

         {/* Capabilities Column */}
         <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-5 shadow-sm sticky top-6">
               <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                 <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                 </svg>
                 Capabilities
               </h3>
               <div className="flex flex-col gap-3">
                  <Checkbox name="useTools" label="Enable Custom Tools" checked={agentData.useTools} onChange={handleChange} />
                  <Checkbox name="useSkills" label="Enable Specialized Skills" checked={agentData.useSkills} onChange={handleChange} />
                  <div className="border-t border-slate-700/50 my-1 pt-1"></div>
                  <Checkbox name="useMcps" label="Enable MCP Integration" checked={agentData.useMcps} onChange={handleChange} />
                  {agentData.useMcps && (
                    <div className="ml-8 mt-2 space-y-2 animate-in slide-in-from-top-2 fade-in duration-200">
                      <TextInput 
                        name="mcp_server_names" 
                        label="Server Names (csv)" 
                        value={agentData.mcp_server_names} 
                        onChange={handleChange} 
                        placeholder="server1, server2"
                      />
                      <Checkbox 
                        name="enable_lazy_loading"
                        label="Enable Lazy MCP Loading"
                        checked={agentData.enable_lazy_loading}
                        onChange={handleChange}
                        isSmall={true}
                      />
                    </div>
                  )}
                  <div className="border-t border-slate-700/50 my-1 pt-1"></div>
                  <Checkbox name="useMemory" label="Enable Persistence (Memory)" checked={agentData.useMemory} onChange={handleChange} />
                  <Checkbox name="useGlobalKnowledgeBase" label="Connect Knowledge Base" checked={agentData.useGlobalKnowledgeBase} onChange={handleChange} />
                  <Checkbox name="useGuardrails" label="Enable Safety Guardrails" checked={agentData.useGuardrails} onChange={handleChange} />
               </div>
            </div>
         </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-700/50 mt-8">
        <button 
           onClick={() => goToStep(2)} 
           className="w-full sm:w-auto px-6 py-3 text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold transition-colors duration-200"
        >
          &larr; Agents List
        </button>
        <button 
           onClick={() => goToStep(4)} 
           className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/25 transition-all duration-200 active:scale-95"
        >
          Review Architecture
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Step3;