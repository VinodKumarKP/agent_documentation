import React from 'react';

const Checkbox = ({ label, name, checked, onChange, isPill = false, isSmall = false }) => {
  if (isPill) {
    return (
      <label className="cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
          checked 
            ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50 ring-1 ring-sky-500/30' 
            : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700/50 hover:text-slate-300'
        }`}>
          {label}
        </div>
      </label>
    );
  }
  
  if (isSmall) {
    return (
      <label className="flex items-center gap-2 cursor-pointer group">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            className="peer appearance-none w-4 h-4 rounded-[3px] border border-slate-600 bg-slate-800 checked:bg-sky-500 checked:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200 cursor-pointer"
          />
          <svg 
            className="absolute inset-0 w-4 h-4 opacity-0 peer-checked:opacity-100 pointer-events-none text-white p-0.5 transition-opacity duration-200" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span className="text-sm font-normal text-slate-400 group-hover:text-slate-300 transition-colors">{label}</span>
      </label>
    );
  }

  return (
    <label className="flex items-start gap-3 p-3 bg-slate-900/30 rounded-xl border border-slate-700/50 hover:bg-slate-900/50 transition-colors duration-200 cursor-pointer group">
      <div className="relative flex items-center pt-0.5">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="peer appearance-none w-5 h-5 rounded-[4px] border border-slate-600 bg-slate-800 checked:bg-sky-500 checked:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200 cursor-pointer"
        />
        <svg 
          className="absolute inset-0 w-5 h-5 opacity-0 peer-checked:opacity-100 pointer-events-none text-white p-[3px] transition-opacity duration-200" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-slate-300 group-hover:text-slate-200 transition-colors">{label}</span>
      </div>
    </label>
  );
};

export default Checkbox;
