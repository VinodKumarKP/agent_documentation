import React, { useContext } from 'react';
import { FormContext } from '../components/FormContext';

const Step2 = ({ goToStep, prevStep }) => {
  const {
    formData,
    addAgent, removeAgent, updateAgentConfig, setSelectedAgentIndex,
    addMcpServer, removeMcpServer, updateMcpConfig, setSelectedServerIndex
  } = useContext(FormContext);

  const handleSelectAgent = (index) => {
    setSelectedAgentIndex(index);
    goToStep(3);
  };

  const handleSelectServer = (index) => {
    setSelectedServerIndex(index);
    goToStep(3);
  };

  const isAgent = formData.templateType === 'agent';
  const items = isAgent ? formData.agents : formData.servers;
  const itemName = isAgent ? 'Agent' : 'MCP Server';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
         <h2 className="text-2xl font-bold text-slate-100 tracking-tight mb-2">
            Define {isAgent ? 'Main Agents' : 'MCP Servers'}
         </h2>
         <p className="text-slate-400 text-sm">
            Add the core components of your architecture. You can configure each one individually.
         </p>
      </div>

      <div className="space-y-4">
         {items.map((item, index) => (
           <div 
             key={index} 
             className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-sky-500/50 rounded-2xl transition-all duration-300 shadow-sm"
           >
             <div className="flex-grow flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-inner ${isAgent ? 'bg-sky-500/80' : 'bg-indigo-500/80'}`}>
                   {index + 1}
                </div>
                <div className="flex-grow">
                   <input
                     type="text"
                     value={item.name}
                     onChange={(e) => isAgent ? updateAgentConfig(index, 'name', e.target.value) : updateMcpConfig(index, 'name', e.target.value)}
                     className="w-full bg-transparent border-b-2 border-transparent hover:border-slate-600 focus:border-sky-500 text-lg font-semibold text-slate-200 placeholder-slate-600 focus:outline-none transition-colors px-1 py-1"
                     placeholder={`Enter ${itemName.toLowerCase()} name`}
                   />
                </div>
             </div>
             
             <div className="flex items-center gap-2 justify-end sm:opacity-70 group-hover:opacity-100 transition-opacity">
               <button 
                 onClick={() => isAgent ? handleSelectAgent(index) : handleSelectServer(index)} 
                 className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-700 hover:bg-sky-600 text-white rounded-lg font-medium transition-colors shadow-sm"
               >
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                 </svg>
                 Configure
               </button>
               <button 
                 onClick={() => isAgent ? removeAgent(index) : removeMcpServer(index)} 
                 className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                 title="Remove"
                 disabled={items.length === 1}
               >
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                 </svg>
               </button>
             </div>
           </div>
         ))}
         
         <button 
           onClick={isAgent ? addAgent : addMcpServer} 
           className="w-full mt-4 flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-700 hover:border-green-500/50 hover:bg-green-500/5 text-slate-400 hover:text-green-400 rounded-2xl font-semibold transition-all duration-300"
         >
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
           </svg>
           Add {itemName}
         </button>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-700/50 mt-8">
        <button 
           onClick={prevStep} 
           className="w-full sm:w-auto px-6 py-3 text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold transition-colors duration-200"
        >
          &larr; Back
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

export default Step2;
