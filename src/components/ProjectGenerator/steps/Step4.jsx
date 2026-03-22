import React, { useContext, useState, useEffect } from 'react';
import { FormContext } from '../components/FormContext';
import { generateZip, generateAgentYaml, generateMcpYaml } from '../utils/zipGenerator';

const Step4 = ({ prevStep }) => {
  const { formData } = useContext(FormContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [yamlPreviews, setYamlPreviews] = useState([]);

  useEffect(() => {
    let previews = [];
    if (formData.templateType === 'agent') {
      previews = formData.agents.map(agentConfig => {
        const yaml = generateAgentYaml(agentConfig.name, { ...formData, ...agentConfig });
        return { name: agentConfig.name, yaml };
      });
    } else { // MCP
      previews = formData.servers.map(serverConfig => {
        const yaml = generateMcpYaml(serverConfig);
        return { name: serverConfig.name, yaml };
      });
    }
    setYamlPreviews(previews);
  }, [formData]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await generateZip(formData);
    } catch (err) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
         <h2 className="text-2xl font-bold text-slate-100 tracking-tight mb-2">Review & Generate</h2>
         <p className="text-slate-400 text-sm">Review your architecture configuration before generating the project files.</p>
      </div>

      <div className="space-y-6">
         <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
               <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
               </svg>
               Project Overview
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
               <div>
                  <span className="block text-slate-500 mb-1">Project Name</span>
                  <span className="font-semibold text-slate-200">{formData.projectName || 'Not specified'}</span>
               </div>
               <div>
                  <span className="block text-slate-500 mb-1">Architecture Type</span>
                  <span className="font-semibold text-slate-200 uppercase">{formData.templateType}</span>
               </div>
               <div>
                  <span className="block text-slate-500 mb-1">Author</span>
                  <span className="text-slate-300">{formData.author || '-'}</span>
               </div>
               <div>
                  <span className="block text-slate-500 mb-1">Components</span>
                  <span className="text-slate-300">
                     {formData.templateType === 'agent' 
                        ? `${formData.agents.length} Agent(s)` 
                        : `${formData.servers.length} Server(s)`}
                  </span>
               </div>
            </div>
         </div>

         <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
               <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
               </svg>
               Configuration Previews (YAML)
            </h3>
            <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
               {yamlPreviews.map((preview, index) => (
                 <div key={index} className="bg-slate-950 rounded-xl overflow-hidden border border-slate-700/50">
                   <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                     <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        {preview.name}.yaml
                     </span>
                     <span className="text-xs text-slate-500 uppercase">{formData.templateType}</span>
                   </div>
                   <div className="p-4 overflow-x-auto">
                     <pre className="text-xs text-sky-200/80 font-mono leading-relaxed">
                       {preview.yaml}
                     </pre>
                   </div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {error && (
         <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-start gap-3 animate-in fade-in zoom-in duration-300">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm">{error}</div>
         </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-700/50 mt-8">
        <button 
           onClick={prevStep} 
           className="w-full sm:w-auto px-6 py-3 text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold transition-colors duration-200" 
           disabled={isLoading}
        >
          &larr; Back to Configure
        </button>
        <button 
           onClick={handleGenerate} 
           className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-sky-500/25 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" 
           disabled={isLoading || !formData.projectName}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Project...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Architecture Zip
            </>
          )}
        </button>
      </div>
      
      {!formData.projectName && (
         <p className="text-center text-amber-500 text-sm mt-4 animate-pulse">
            Please enter a Project Name in Step 1 to enable generation.
         </p>
      )}
    </div>
  );
};

export default Step4;
