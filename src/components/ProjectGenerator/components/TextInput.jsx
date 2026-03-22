import React from 'react';

const TextInput = ({ label, name, value, onChange, isTextArea = false, placeholder = '' }) => {
  const commonProps = {
    name,
    id: name,
    value,
    onChange,
    placeholder,
    className: "w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all duration-200 shadow-sm"
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-slate-300 ml-1">
        {label}
      </label>
      {isTextArea ? (
        <textarea {...commonProps} rows="3" className={`${commonProps.className} resize-y min-h-[80px]`}></textarea>
      ) : (
        <input type="text" {...commonProps} />
      )}
    </div>
  );
};

export default TextInput;
