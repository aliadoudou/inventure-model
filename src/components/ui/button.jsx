// src/components/ui/button.jsx
import React from 'react';

export const Button = ({ className, variant = 'default', size = 'default', ...props }) => {
  const baseStyles = 'font-medium rounded-md inline-flex items-center justify-center';
  
  const variantStyles = {
    default: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
  };
  
  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    default: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };
  
  return (
    <button 
      className={`
        ${baseStyles} 
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        ${className || ''}
      `} 
      {...props} 
    />
  );
};