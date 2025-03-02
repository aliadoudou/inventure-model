// src/components/ui/input.jsx
import React from 'react';

export const Input = ({ className, ...props }) => {
  return (
    <input
      className={`
        w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
        ${className || ''}
      `}
      {...props}
    />
  );
};