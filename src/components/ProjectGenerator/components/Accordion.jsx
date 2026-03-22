import React, { useState } from 'react';

const Accordion = ({ children, defaultOpen = 0 }) => {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  const toggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1); // Close if already open
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="space-y-3">
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          isOpen: openIndex === index,
          onClick: () => toggle(index),
        });
      })}
    </div>
  );
};

const AccordionItem = ({ title, children, isOpen, onClick, icon }) => {
  return (
    <div className="accordion-item rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-5 text-left font-semibold text-slate-200 hover:bg-slate-800/50 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-lg">{title}</span>
        </div>
        <svg
          className={`w-5 h-5 text-slate-400 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 border-t border-slate-700/50">{children}</div>
      </div>
    </div>
  );
};

export { Accordion, AccordionItem };
