import React from 'react';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Label } from './ui/label';

const SimulationParameters = ({ params, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      onChange(name, numericValue);
    }
  };
  
  const handleSliderChange = (name, value) => {
    onChange(name, value[0]);
  };
  
  const formatPercent = (value) => `${(value * 100).toFixed(0)}%`;
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Portfolio Scale</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="numPreSeed">Number of Pre-Seed Investments</Label>
            <span className="text-sm font-medium">{params.numPreSeed}</span>
          </div>
          <Input 
            id="numPreSeed"
            name="numPreSeed" 
            type="number" 
            min="100" 
            max="2000"
            value={params.numPreSeed}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="targetProjects">Target Successful Series B Projects</Label>
            <span className="text-sm font-medium">{params.targetProjects}</span>
          </div>
          <Input 
            id="targetProjects"
            name="targetProjects" 
            type="number" 
            min="10" 
            max="100"
            value={params.targetProjects}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Success Rates</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="preSeedSuccessRate">Pre-Seed Success Rate</Label>
            <span className="text-sm font-medium">{formatPercent(params.preSeedSuccessRate)}</span>
          </div>
          <Slider 
            id="preSeedSuccessRate"
            min={0.05} 
            max={0.35} 
            step={0.01}
            defaultValue={[params.preSeedSuccessRate]}
            onValueChange={(value) => handleSliderChange('preSeedSuccessRate', value)} 
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="seedSuccessRate">Seed Success Rate</Label>
            <span className="text-sm font-medium">{formatPercent(params.seedSuccessRate)}</span>
          </div>
          <Slider 
            id="seedSuccessRate"
            min={0.20} 
            max={0.60} 
            step={0.01}
            defaultValue={[params.seedSuccessRate]}
            onValueChange={(value) => handleSliderChange('seedSuccessRate', value)} 
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="seriesASuccessRate">Series A Success Rate</Label>
            <span className="text-sm font-medium">{formatPercent(params.seriesASuccessRate)}</span>
          </div>
          <Slider 
            id="seriesASuccessRate"
            min={0.40} 
            max={0.80} 
            step={0.01}
            defaultValue={[params.seriesASuccessRate]}
            onValueChange={(value) => handleSliderChange('seriesASuccessRate', value)} 
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Investment Amounts ($ millions)</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="preSeedInvestment">Pre-Seed</Label>
            <Input 
              id="preSeedInvestment"
              name="preSeedInvestment" 
              type="number" 
              min="0.1" 
              max="2"
              step="0.1"
              value={params.preSeedInvestment}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="seedInvestment">Seed</Label>
            <Input 
              id="seedInvestment"
              name="seedInvestment" 
              type="number" 
              min="0.5" 
              max="5"
              step="0.1"
              value={params.seedInvestment}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="seriesAInvestment">Series A</Label>
            <Input 
              id="seriesAInvestment"
              name="seriesAInvestment" 
              type="number" 
              min="2" 
              max="15"
              step="0.5"
              value={params.seriesAInvestment}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="seriesBInvestment">Series B</Label>
            <Input 
              id="seriesBInvestment"
              name="seriesBInvestment" 
              type="number" 
              min="10" 
              max="100"
              step="1"
              value={params.seriesBInvestment}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Risk Parameters</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="correlation">Project Outcome Correlation</Label>
            <span className="text-sm font-medium">{formatPercent(params.correlation)}</span>
          </div>
          <Slider 
            id="correlation"
            min={0} 
            max={0.20} 
            step={0.01}
            defaultValue={[params.correlation]}
            onValueChange={(value) => handleSliderChange('correlation', value)} 
          />
          <p className="text-xs text-gray-500 mt-1">
            Higher correlation increases risk by making project outcomes more dependent on common factors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimulationParameters;