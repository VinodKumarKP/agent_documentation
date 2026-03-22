import React from 'react';

const Select = ({ label, name, value, onChange, options }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-slate-300 ml-1">
        {label}
      </label>
      <div className="relative">
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all duration-200 shadow-sm cursor-pointer"
        >
          {options.map(option => (
            <option key={option} value={option} className="bg-slate-800">
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Select;
