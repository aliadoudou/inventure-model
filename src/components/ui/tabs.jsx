// src/components/ui/tabs.jsx
import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext(null);

export const Tabs = ({ value, onValueChange, children, className, ...props }) => {
  const [activeTab, setActiveTab] = useState(value);

  const handleValueChange = (newValue) => {
    setActiveTab(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleValueChange }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ className, ...props }) => {
  return (
    <div 
      className={`flex space-x-1 rounded-md bg-gray-100 p-1 ${className || ''}`} 
      role="tablist" 
      {...props} 
    />
  );
};

export const TabsTrigger = ({ value, className, children, ...props }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  
  return (
    <button
      role="tab"
      aria-selected={activeTab === value}
      data-state={activeTab === value ? 'active' : 'inactive'}
      className={`
        px-3 py-1.5 text-sm font-medium transition-all
        ${activeTab === value 
          ? 'bg-white text-indigo-700 shadow' 
          : 'text-gray-600 hover:text-gray-900'}
        ${className || ''}
      `}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, className, children, ...props }) => {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== value) return null;
  
  return (
    <div 
      role="tabpanel"
      data-state={activeTab === value ? 'active' : 'inactive'}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};