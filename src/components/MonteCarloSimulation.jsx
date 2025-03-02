import React, { useState, useEffect } from 'react';

const MonteCarloSimulation = () => {
  const [params, setParams] = useState({
    numPreSeed: 876,
    preSeedSuccessRate: 0.20,
    seedSuccessRate: 0.40,
    seriesASuccessRate: 0.60,
    preSeedInvestment: 0.5,
    seedInvestment: 1.0,  
    seriesAInvestment: 7.5,
    seriesBInvestment: 35.0,
    correlation: 0.05,
    numSimulations: 1000,
    targetProjects: 40
  });

  const [results, setResults] = useState(null);

  useEffect(() => {
    runSimulation();
  }, [params]);

  const runSimulation = () => {
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
    const probTarget = distribution.reduce((sum, item) => 
      sum + (item.projects >= params.targetProjects ? item.probability : 0),
    0);

    // Calculate standard deviation with correlation adjustment
    const stdDev = Math.sqrt(
      expectedSeriesB * (1 - preSeedSuccessRate * seedSuccessRate * seriesASuccessRate) * (1 + correlation)
    );

    setResults({
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
    });
  };

  return (
    <div>
      <h2>Simulation Parameters</h2>
      <div>
        <label>Number of Pre-Seed Investments:</label>
        <input
          type="number"
          value={params.numPreSeed}
          onChange={(e) => setParams({ ...params, numPreSeed: Number(e.target.value) })}
        />
      </div>
      {/* Add other parameter inputs */}

      <h2>Simulation Results</h2>
      {results ? (
        <div>
          <p>Expected Successful Projects: {results.expectedProjects.toFixed(2)}</p>
          <p>Standard Deviation: {results.standardDeviation.toFixed(2)}</p>
          <p>95% Confidence Interval: [{results.confidenceInterval[0]}, {results.confidenceInterval[1]}]</p>
          <p>Probability of Achieving Target: {(results.probTarget * 100).toFixed(2)}%</p>
          <p>Total Investment: ${(results.totalInvestment / 1e9).toFixed(2)}B</p>
          {/* Display other result values */}
        </div>
      ) : (
        <p>No results yet. Modify parameters to run simulation.</p>
      )}
    </div>
  );
};

export default MonteCarloSimulation;