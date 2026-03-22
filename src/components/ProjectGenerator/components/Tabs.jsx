import React, { useState, Children, useMemo } from 'react';

const Tabs = ({ children }) => {
  const availableTabs = useMemo(() => Children.toArray(children).filter(Boolean), [children]);
  
  const [activeTab, setActiveTab] = useState(availableTabs[0]?.props.label);

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl shadow-sm">
      <div className="p-2 bg-slate-900/30 rounded-t-2xl">
        <div className="flex items-center gap-2">
          {availableTabs.map(child => (
            <button
              key={child.props.label}
              className={`${
                activeTab === child.props.label
                  ? 'bg-sky-500/10 text-sky-300 shadow-sm border-sky-500/30'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border-transparent'
              } flex-1 font-medium px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 border`}
              onClick={e => handleClick(e, child.props.label)}
            >
              {child.props.label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {availableTabs.map(child => {
          if (child.props.label === activeTab) {
            return <div key={child.props.label}>{child.props.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

const Tab = ({ label, children }) => {
  return (
    <div label={label} className="hidden">
      {children}
    </div>
  );
};

export { Tabs, Tab };
