import React, { useState, Children, useMemo } from 'react';

const Tabs = ({ children }) => {
  const availableTabs = useMemo(() => Children.toArray(children).filter(Boolean), [children]);
  
  const [activeTab, setActiveTab] = useState(availableTabs[0]?.props.label);

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div>
      <div className="flex border-b border-slate-700/50">
        {availableTabs.map(child => (
          <button
            key={child.props.label}
            className={`${
              activeTab === child.props.label 
                ? 'border-b-2 border-sky-400 text-sky-400' 
                : 'text-slate-400 hover:text-slate-200'
            } flex-1 font-medium px-4 py-2.5 transition-colors duration-200 focus:outline-none`}
            onClick={e => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="py-6">
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
