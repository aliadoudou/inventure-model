import React from 'react';
import SimulationResults from '../components/SimulationResults';

const mockResults = {
  expectedProjects: 42,
  standardDeviation: 5.2,
  confidenceInterval: [37, 47],
  probTarget: 0.65,
  totalInvestment: 12.5,
  distribution: [
    { projects: 29, probability: 0.05 },
    { projects: 34, probability: 0.10 },
    { projects: 39, probability: 0.25 },
    { projects: 42, probability: 0.30 },
    { projects: 46, probability: 0.20 },
    { projects: 50, probability: 0.07 },
    { projects: 55, probability: 0.03 }
  ],
  investmentBreakdown: [
    { stage: 'Pre-Seed', projects: 876, investment: 0.438 },
    { stage: 'Seed', projects: 175, investment: 1.75 },
    { stage: 'Series A', projects: 70, investment: 5.25 },
    { stage: 'Series B', projects: 42, investment: 5.25 }
  ]
};

export default {
  title: 'Portfolio Simulator/Results',
  component: SimulationResults
};

export const ExampleResults = () => (
  <SimulationResults 
    results={mockResults}
    targetProjects={40}
  />
);
