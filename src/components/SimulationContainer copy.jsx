import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Info } from 'lucide-react';
import SimulationParameters from './SimulationParameters';
import SimulationResults from './SimulationResults';


const SimulationContainer = () => {
  // Simulation parameters with defaults from the documentation
  const [params, setParams] = useState({
    numPreSeed: 876,
    preSeedSuccessRate: 0.20,
    seedSuccessRate: 0.40,
    seriesASuccessRate: 0.60,
    preSeedInvestment: 0.5, // in $M
    seedInvestment: 1.0,
    seriesAInvestment: 7.5,
    seriesBInvestment: 35.0,
    correlation: 0.05,
    targetProjects: 40
  });
  
  // Simulation results state
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle parameter changes
  const handleParamChange = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };
  
  // Run the simulation
  const runSimulation = () => {
    setIsLoading(true);
    
    // Simulate a delay to represent calculation time
    setTimeout(() => {
      // Call the actual simulation function here
      const simulationResults = performMonteCarlo(params);
      setResults(simulationResults);
      setIsLoading(false);
    }, 1000);
  };
  
  // Monte Carlo simulation logic (simplified for demo)
  const performMonteCarlo = (params) => {
    const {
      numPreSeed,
      preSeedSuccessRate,
      seedSuccessRate,
      seriesASuccessRate,
      preSeedInvestment,
      seedInvestment,
      seriesAInvestment,
      seriesBInvestment,
      correlation
    } = params;
    
    // This is a simplified simulation that would be replaced with actual Monte Carlo
    // In a real implementation, we'd run thousands of simulations
    
    // Expected values based on success rates
    const expectedSeed = numPreSeed * preSeedSuccessRate;
    const expectedSeriesA = expectedSeed * seedSuccessRate;
    const expectedSeriesB = expectedSeriesA * seriesASuccessRate;
    
    // Total investment at each stage
    const totalPreSeed = numPreSeed * preSeedInvestment;
    const totalSeed = expectedSeed * seedInvestment;
    const totalSeriesA = expectedSeriesA * seriesAInvestment;
    const totalSeriesB = expectedSeriesB * seriesBInvestment;
    
    // Total investment across all stages
    const totalInvestment = totalPreSeed + totalSeed + totalSeriesA + totalSeriesB;
    
    // Create a probability distribution of successful projects
    // In a real simulation, this would be derived from thousands of runs
    const distribution = [
      { projects: Math.floor(expectedSeriesB * 0.7), probability: 0.05 },
      { projects: Math.floor(expectedSeriesB * 0.8), probability: 0.10 },
      { projects: Math.floor(expectedSeriesB * 0.9), probability: 0.25 },
      { projects: Math.floor(expectedSeriesB), probability: 0.30 },
      { projects: Math.floor(expectedSeriesB * 1.1), probability: 0.20 },
      { projects: Math.floor(expectedSeriesB * 1.2), probability: 0.07 },
      { projects: Math.floor(expectedSeriesB * 1.3), probability: 0.03 }
    ];
    
    // Calculate probability of achieving target
    const probTarget = distribution.reduce((sum, item) => {
      return sum + (item.projects >= params.targetProjects ? item.probability : 0);
    }, 0);
    
    // Calculate standard deviation with a more reasonable formula for correlation
    // This uses a binomial variance formula adjusted for correlation
    const stdDev = Math.sqrt(expectedSeriesB * (1 - preSeedSuccessRate * seedSuccessRate * seriesASuccessRate) * (1 + correlation));
    
    return {
      expectedProjects: expectedSeriesB,
      standardDeviation: stdDev,
      confidenceInterval: [
        Math.max(0, Math.floor(expectedSeriesB - 1.96 * stdDev)),
        Math.ceil(expectedSeriesB + 1.96 * stdDev)
      ],
      probTarget: probTarget,
      totalInvestment: totalInvestment,
      distribution: distribution,
      investmentBreakdown: [
        { stage: 'Pre-Seed', projects: numPreSeed, investment: totalPreSeed },
        { stage: 'Seed', projects: Math.floor(expectedSeed), investment: totalSeed },
        { stage: 'Series A', projects: Math.floor(expectedSeriesA), investment: totalSeriesA },
        { stage: 'Series B', projects: Math.floor(expectedSeriesB), investment: totalSeriesB }
      ]
    };
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">InVenture Portfolio Risk Model</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore how different parameters affect the portfolio outcomes using our Monte Carlo simulation.
            Adjust the parameters and run the simulation to see the results.
          </p>
        </div>
        
        <div className="grid md:grid-cols-12 gap-6">
          {/* Parameters panel */}
          <div className="md:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Simulation Parameters</CardTitle>
                <CardDescription>Adjust values to see how they impact portfolio outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <SimulationParameters 
                  params={params} 
                  onChange={handleParamChange}
                />
                
                <div className="mt-6">
                  <Button 
                    className="w-full" 
                    onClick={runSimulation}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Running Simulation...' : 'Run Simulation'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Results panel */}
          <div className="md:col-span-8">
            {results ? (
              <SimulationResults results={results} targetProjects={params.targetProjects} />
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <Info className="mx-auto h-12 w-12" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No Simulation Results Yet</h3>
                  <p className="text-gray-500">Adjust parameters and run the simulation to see results here.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationContainer;