// src/components/ui/slider.jsx
import React, { useState } from 'react';

export const Slider = ({ 
  min = 0, 
  max = 100, 
  step = 1, 
  defaultValue = [50], 
  onValueChange, 
  className,
  ...props 
}) => {
  const [value, setValue] = useState(defaultValue);
  
  const handleChange = (e) => {
    const newValue = [parseFloat(e.target.value)];
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };
  
  // Calculate percentage for background style
  const percent = ((value[0] - min) / (max - min)) * 100;
  
  return (
    <div className={`relative w-full ${className || ''}`} {...props}>
      <div className="h-2 w-full bg-gray-200 rounded-full">
        <div 
          className="absolute h-2 bg-indigo-500 rounded-full" 
          style={{ width: `${percent}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={handleChange}
        className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
      />
      <div 
        className="absolute w-4 h-4 bg-white border-2 border-indigo-500 rounded-full -mt-1"
        style={{ left: `calc(${percent}% - 8px)` }}
      />
    </div>
  );
};