import React, { useState } from 'react';

const TagInput = ({ label, tags, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab' || e.key === ',') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">{label}</label>
      <div className="flex flex-wrap items-center gap-2 p-2.5 bg-slate-900/50 border border-slate-700 rounded-xl">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center gap-1.5 bg-sky-500/10 text-sky-300 text-sm font-medium px-3 py-1 rounded-full border border-sky-500/30">
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-sky-400 hover:text-white hover:bg-sky-500/50 rounded-full p-0.5"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none p-1"
          placeholder={tags.length === 0 ? 'Type and press Enter...' : ''}
        />
      </div>
    </div>
  );
};

export default TagInput;
