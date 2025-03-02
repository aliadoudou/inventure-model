import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Info } from 'lucide-react';
import SimulationParameters from './SimulationParameters';
import SimpleChartTest from './SimpleChartTest';

const SimulationContainer = () => {
  // Simulation parameters with defaults
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
  const [error, setError] = useState(null);
  
  // Handle parameter changes
  const handleParamChange = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };
  
  // Run the simulation
  const runSimulation = () => {
    setIsLoading(true);
    setError(null);
    
    // Use setTimeout to avoid blocking the UI
    setTimeout(() => {
      try {
        // Run a Monte Carlo simulation
        const simulationResults = performMonteCarlo(params);
        console.log("Simulation results:", simulationResults);
        setResults(simulationResults);
      } catch (err) {
        console.error("Simulation error:", err);
        setError("An error occurred while running the simulation: " + err.message);
      } finally {
        setIsLoading(false);
      }
    }, 10);
  };
  
  // Helper function to calculate standard deviation
  const calculateStandardDeviation = (array, mean) => {
    if (array.length <= 1) return 0;
    
    const variance = array.reduce((sum, val) => {
      const diff = val - mean;
      return sum + diff * diff;
    }, 0) / (array.length - 1);
    
    return Math.sqrt(variance);
  };
  
  // More robust Monte Carlo simulation
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
      correlation,
      targetProjects
    } = params;
    
    // Number of simulations to run
    const numSimulations = 1000;
    
    // Arrays to store results
    const successfulCounts = [];
    const investmentData = [];
    
    // Run simulations
    for (let i = 0; i < numSimulations; i++) {
      // Generate a common random factor to introduce correlation
      const commonFactor = Math.random();
      
      // Start with the pre-seed investments
      let numSeed = 0;
      
      // For each pre-seed project, determine if it advances to seed
      for (let j = 0; j < numPreSeed; j++) {
        // Generate a project-specific factor
        const projectFactor = Math.random();
        
        // Combine common and project factors based on correlation
        const combinedFactor = correlation * commonFactor + (1 - correlation) * projectFactor;
        
        // Check if project advances to seed stage
        if (combinedFactor < preSeedSuccessRate) {
          numSeed++;
        }
      }
      
      // Generate new common factor for seed stage (with some relation to previous one)
      const seedCommonFactor = 0.3 * commonFactor + 0.7 * Math.random();
      
      // For each seed project, determine if it advances to Series A
      let numSeriesA = 0;
      for (let j = 0; j < numSeed; j++) {
        const projectFactor = Math.random();
        const combinedFactor = correlation * seedCommonFactor + (1 - correlation) * projectFactor;
        
        if (combinedFactor < seedSuccessRate) {
          numSeriesA++;
        }
      }
      
      // Generate common factor for Series A stage
      const seriesACommonFactor = 0.3 * seedCommonFactor + 0.7 * Math.random();
      
      // For each Series A project, determine if it advances to Series B
      let numSeriesB = 0;
      for (let j = 0; j < numSeriesA; j++) {
        const projectFactor = Math.random();
        const combinedFactor = correlation * seriesACommonFactor + (1 - correlation) * projectFactor;
        
        if (combinedFactor < seriesASuccessRate) {
          numSeriesB++;
        }
      }
      
      // Calculate investments at each stage
      const preSeedTotalInvestment = numPreSeed * preSeedInvestment;
      const seedTotalInvestment = numSeed * seedInvestment;
      const seriesATotalInvestment = numSeriesA * seriesAInvestment;
      const seriesBTotalInvestment = numSeriesB * seriesBInvestment;
      const totalInvestment = preSeedTotalInvestment + seedTotalInvestment + seriesATotalInvestment + seriesBTotalInvestment;
      
      // Store results for this simulation
      successfulCounts.push(numSeriesB);
      investmentData.push({
        preSeed: numPreSeed,
        seed: numSeed,
        seriesA: numSeriesA,
        seriesB: numSeriesB,
        preSeedInvestment: preSeedTotalInvestment,
        seedInvestment: seedTotalInvestment,
        seriesAInvestment: seriesATotalInvestment,
        seriesBInvestment: seriesBTotalInvestment,
        totalInvestment: totalInvestment
      });
    }
    
    // Calculate mean and standard deviation
    const mean = successfulCounts.reduce((sum, val) => sum + val, 0) / numSimulations;
    const stdDev = calculateStandardDeviation(successfulCounts, mean);
    
    // Calculate probability of achieving target
    const probTarget = successfulCounts.filter(count => count >= targetProjects).length / numSimulations;
    
    // Generate distribution data
    const distribution = {};
    successfulCounts.forEach(count => {
      distribution[count] = (distribution[count] || 0) + 1;
    });
    
    const distributionData = Object.entries(distribution).map(([projects, count]) => ({
      projects: parseInt(projects),
      probability: count / numSimulations
    })).sort((a, b) => a.projects - b.projects);
    
    // Calculate average investment data across all simulations
    const avgInvestment = investmentData.reduce((acc, curr) => {
      return {
        preSeed: acc.preSeed + curr.preSeed / numSimulations,
        seed: acc.seed + curr.seed / numSimulations,
        seriesA: acc.seriesA + curr.seriesA / numSimulations,
        seriesB: acc.seriesB + curr.seriesB / numSimulations,
        preSeedInvestment: acc.preSeedInvestment + curr.preSeedInvestment / numSimulations,
        seedInvestment: acc.seedInvestment + curr.seedInvestment / numSimulations,
        seriesAInvestment: acc.seriesAInvestment + curr.seriesAInvestment / numSimulations,
        seriesBInvestment: acc.seriesBInvestment + curr.seriesBInvestment / numSimulations,
        totalInvestment: acc.totalInvestment + curr.totalInvestment / numSimulations
      };
    }, {
      preSeed: 0, seed: 0, seriesA: 0, seriesB: 0,
      preSeedInvestment: 0, seedInvestment: 0, seriesAInvestment: 0, seriesBInvestment: 0,
      totalInvestment: 0
    });
    
    // Create investment breakdown for visualization
    const investmentBreakdown = [
      { 
        stage: 'Pre-Seed', 
        projects: Math.round(avgInvestment.preSeed), 
        investment: avgInvestment.preSeedInvestment 
      },
      { 
        stage: 'Seed', 
        projects: Math.round(avgInvestment.seed), 
        investment: avgInvestment.seedInvestment 
      },
      { 
        stage: 'Series A', 
        projects: Math.round(avgInvestment.seriesA), 
        investment: avgInvestment.seriesAInvestment 
      },
      { 
        stage: 'Series B', 
        projects: Math.round(avgInvestment.seriesB), 
        investment: avgInvestment.seriesBInvestment 
      }
    ];
    
    // Return results with investment data
    return {
      expectedProjects: mean,
      standardDeviation: stdDev,
      confidenceInterval: [
        Math.max(0, Math.floor(mean - 1.96 * stdDev)),
        Math.ceil(mean + 1.96 * stdDev)
      ],
      probTarget: probTarget,
      distribution: distributionData,
      totalInvestment: avgInvestment.totalInvestment,
      investmentBreakdown: investmentBreakdown
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
                
                {error && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                    {error}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Results panel */}
          <div className="md:col-span-8">
            {results ? (
              <SimpleChartTest results={results} targetProjects={params.targetProjects} />
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