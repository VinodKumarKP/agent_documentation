import React, { useContext } from 'react';
import { FormContext } from '../components/FormContext';
import TextInput from '../components/TextInput';
import EnvVarsConfig from '../components/EnvVarsConfig';

const Step3_Mcp = ({ goToStep }) => {
  const { formData, updateMcpConfig } = useContext(FormContext);
  const serverIndex = formData.selectedServerIndex;
  const serverData = formData.servers[serverIndex];

  if (!serverData) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-slate-300 mb-2">No Server Selected</h3>
        <p className="text-slate-500 mb-6">Please go back and select a server to configure.</p>
        <button 
           onClick={() => goToStep(2)} 
           className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
        >
          &larr; Back to Servers
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateMcpConfig(serverIndex, name, value);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-700/50">
         <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
            <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
         </div>
         <div>
            <h2 className="text-2xl font-bold text-slate-100">
               Configuring <span className="text-indigo-400 font-extrabold bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20 ml-1">{serverData.name}</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1">Define server properties and environment</p>
         </div>
      </div>

      <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <TextInput 
              label="Port" 
              name="port" 
              value={serverData.port} 
              onChange={handleChange} 
              placeholder="8000"
           />
           <TextInput 
              label="Tools Class Name" 
              name="class_name" 
              value={serverData.class_name} 
              onChange={handleChange} 
              placeholder="e.g. WeatherTools"
           />
        </div>
        
        <TextInput 
           label="Description" 
           name="description" 
           value={serverData.description} 
           onChange={handleChange} 
           isTextArea={true} 
           placeholder="A brief description of what this server does..."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <TextInput 
              label="Tags (csv)" 
              name="tags" 
              value={serverData.tags} 
              onChange={handleChange} 
              placeholder="weather, api, utility"
           />
           <TextInput 
              label="Source URL" 
              name="source" 
              value={serverData.source} 
              onChange={handleChange} 
              placeholder="https://github.com/..."
           />
        </div>
        
        <EnvVarsConfig
          envVars={serverData.env}
          onEnvVarChange={(newEnv) => updateMcpConfig(serverIndex, 'env', newEnv)}
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-700/50 mt-8">
        <button 
           onClick={() => goToStep(2)} 
           className="w-full sm:w-auto px-6 py-3 text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold transition-colors duration-200"
        >
          &larr; Servers List
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

export default Step3_Mcp;
