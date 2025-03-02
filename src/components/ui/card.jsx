// src/components/ui/card.jsx
import React from 'react';

export const Card = ({ className, ...props }) => {
  return (
    <div 
      className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className || ''}`} 
      {...props} 
    />
  );
};

export const CardHeader = ({ className, ...props }) => {
  return <div className={`p-6 pb-3 ${className || ''}`} {...props} />;
};

export const CardTitle = ({ className, ...props }) => {
  return <h3 className={`text-xl font-semibold text-gray-900 ${className || ''}`} {...props} />;
};

export const CardDescription = ({ className, ...props }) => {
  return <p className={`text-sm text-gray-500 ${className || ''}`} {...props} />;
};

export const CardContent = ({ className, ...props }) => {
  return <div className={`p-6 pt-3 ${className || ''}`} {...props} />;
};