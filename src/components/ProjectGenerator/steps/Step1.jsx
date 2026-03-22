import React, { useContext } from 'react';
import { FormContext } from '../components/FormContext';
import TextInput from '../components/TextInput';

const Step1 = ({ nextStep }) => {
  const { formData, setFormData } = useContext(FormContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-100 tracking-tight mb-2">Basic Project Details</h2>
        <p className="text-slate-400 text-sm">Tell us about your project and who is building it.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="col-span-1 md:col-span-2">
            <TextInput 
              name="projectName" 
              label="Project Name" 
              value={formData.projectName} 
              onChange={handleChange} 
              placeholder="e.g. ai-travel-agent" 
            />
         </div>
        <TextInput 
           name="author" 
           label="Author" 
           value={formData.author} 
           onChange={handleChange} 
           placeholder="Jane Doe"
        />
        <TextInput 
           name="email" 
           label="Email" 
           value={formData.email} 
           onChange={handleChange} 
           placeholder="jane@example.com"
        />
      </div>

      <div className="pt-4 border-t border-slate-700/50">
        <label className="block text-sm font-semibold text-slate-300 mb-4">Architecture Type</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
              formData.templateType === 'agent' 
                ? 'bg-sky-500/10 border-sky-500/50 ring-1 ring-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.15)]' 
                : 'bg-slate-900/30 border-slate-700 hover:bg-slate-800/50'
            }`}>
            <input 
              type="radio" 
              name="templateType" 
              value="agent" 
              checked={formData.templateType === 'agent'} 
              onChange={handleChange} 
              className="sr-only" 
            />
            <div className="flex flex-col ml-3">
              <span className={`font-semibold ${formData.templateType === 'agent' ? 'text-sky-400' : 'text-slate-300'}`}>Agent Architecture</span>
              <span className="text-xs text-slate-500 mt-1">Build complex multi-agent systems using LangGraph, CrewAI, etc.</span>
            </div>
            {formData.templateType === 'agent' && (
               <div className="absolute right-4 top-4 text-sky-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
               </div>
            )}
          </label>
          <label className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
              formData.templateType === 'mcp' 
                ? 'bg-indigo-500/10 border-indigo-500/50 ring-1 ring-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)]' 
                : 'bg-slate-900/30 border-slate-700 hover:bg-slate-800/50'
            }`}>
            <input 
              type="radio" 
              name="templateType" 
              value="mcp" 
              checked={formData.templateType === 'mcp'} 
              onChange={handleChange} 
              className="sr-only" 
            />
            <div className="flex flex-col ml-3">
              <span className={`font-semibold ${formData.templateType === 'mcp' ? 'text-indigo-400' : 'text-slate-300'}`}>Model Context Protocol (MCP)</span>
              <span className="text-xs text-slate-500 mt-1">Build servers that expose tools and data to AI models.</span>
            </div>
             {formData.templateType === 'mcp' && (
               <div className="absolute right-4 top-4 text-indigo-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
               </div>
            )}
          </label>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button 
           onClick={nextStep} 
           disabled={!formData.projectName.trim()}
           className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg shadow-sky-500/25 transition-all duration-200 active:scale-95"
        >
          Next Step
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Step1;
