// src/components/ui/label.jsx
import React from 'react';

export const Label = ({ className, ...props }) => {
  return (
    <label
      className={`block text-sm font-medium text-gray-700 ${className || ''}`}
      {...props}
    />
  );
};