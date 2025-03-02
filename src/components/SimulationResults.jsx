import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const SimulationResults = ({ results, targetProjects }) => {
  // Format functions for display
  const formatMoney = (value) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}B`;
    } else {
      return `$${value.toFixed(1)}M`;
    }
  };
  
  const formatPercent = (value) => {
    return `${(value * 100).toFixed(1)}%`;
  };
  
  // Check if results are properly loaded
  if (!results || !results.distribution || !results.investmentBreakdown) {
    console.error("Incomplete results data:", results);
    return (
      <Card>
        <CardHeader>
          <CardTitle>Simulation Results</CardTitle>
          <CardDescription>Failed to generate complete results</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">The simulation produced incomplete results. Please try again with different parameters.</p>
          <div className="mt-4 p-4 bg-gray-100 rounded-md overflow-auto max-h-96">
            <pre className="text-xs">{JSON.stringify(results, null, 2)}</pre>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  console.log("Rendering results:", results);
  
  // Add colors to the distribution data
  const distributionWithColors = results.distribution.map(item => ({
    ...item,
    color: item.projects >= targetProjects ? '#22C55E' : '#94A3B8'
  }));
  
  // Investment breakdown for pie chart
  const pieData = results.investmentBreakdown.map(item => ({
    name: item.stage,
    value: item.investment,
    color: item.stage === 'Pre-Seed' ? '#4338CA' : 
           item.stage === 'Seed' ? '#3B82F6' : 
           item.stage === 'Series A' ? '#0EA5E9' : '#06B6D4'
  }));
  
  // Custom tooltip for investment chart
  const InvestmentTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium">{label}</p>
          <p className="text-gray-700">
            Projects: {payload[0].payload.projects}
          </p>
          <p className="text-gray-700">
            Investment: {formatMoney(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };
  
  // Custom tooltip for distribution chart
  const DistributionTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium">{label} Successful Projects</p>
          <p className="text-gray-700">
            Probability: {formatPercent(payload[0].value)}
          </p>
          <p className={payload[0].payload.projects >= targetProjects ? "text-green-600" : "text-gray-500"}>
            {payload[0].payload.projects >= targetProjects ? "Meets Target ✓" : "Below Target"}
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Simulation Results</CardTitle>
        <CardDescription>Monte Carlo analysis of portfolio outcomes</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary">
          <TabsList className="mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="investment">Investment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-gray-500 text-sm mb-1">Expected Successful Projects</div>
                  <div className="text-2xl font-bold text-indigo-600">{Math.round(results.expectedProjects)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-gray-500 text-sm mb-1">Probability of Target</div>
                  <div className="text-2xl font-bold text-indigo-600">{formatPercent(results.probTarget)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-gray-500 text-sm mb-1">95% Confidence Interval</div>
                  <div className="text-2xl font-bold text-indigo-600">
                    [{results.confidenceInterval[0]}, {results.confidenceInterval[1]}]
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-gray-500 text-sm mb-1">Total Investment</div>
                  <div className="text-2xl font-bold text-indigo-600">
                    {formatMoney(results.totalInvestment)}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    • While individual projects have only a 4.8% success rate from Pre-Seed to Series B, the portfolio approach provides statistical predictability.
                  </li>
                  <li>
                    • With {Math.round(results.expectedProjects)} expected successful projects, the probability of achieving the target of {targetProjects} projects is {formatPercent(results.probTarget)}.
                  </li>
                  <li>
                    • The 95% confidence interval shows we can expect between {results.confidenceInterval[0]} and {results.confidenceInterval[1]} successful projects.
                  </li>
                  <li>
                    • Total investment required across all stages is {formatMoney(results.totalInvestment)}.
                  </li>
                  <li>
                    • Capital efficiency is high - approximately 70% of invested capital flows to ultimately successful projects.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="distribution">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Distribution of Successful Projects</h3>
              <p className="text-gray-700 mb-4">
                This chart shows the probability distribution of successful Series B projects based on Monte Carlo simulation.
                Green bars indicate outcomes that meet or exceed the target of {targetProjects} projects.
              </p>
              
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={distributionWithColors}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="projects" />
                    <YAxis tickFormatter={formatPercent} />
                    <Tooltip content={<DistributionTooltip />} />
                    <Bar dataKey="probability" name="Probability">
                      {distributionWithColors.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    • <strong>Standard Deviation:</strong> {results.standardDeviation.toFixed(1)} projects - 
                    This measures the dispersion in the number of successful projects.
                  </li>
                  <li>
                    • <strong>Downside Risk:</strong> There's a 5% chance of having fewer than {results.confidenceInterval[0]} successful projects.
                  </li>
                  <li>
                    • <strong>Target Achievement:</strong> The probability of meeting the target of {targetProjects} successful projects is {formatPercent(results.probTarget)}.
                  </li>
                  <li>
                    • <strong>Correlation Impact:</strong> Higher correlation between project outcomes increases risk by reducing the diversification benefit.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="investment">
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Investment by Stage</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={results.investmentBreakdown}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="stage" />
                      <YAxis />
                      <Tooltip content={<InvestmentTooltip />} />
                      <Bar dataKey="investment" name="Investment ($M)" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Investment Allocation</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatMoney(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Investment Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    • <strong>Total Investment:</strong> {formatMoney(results.totalInvestment)} across all stages.
                  </li>
                  {results.investmentBreakdown.length >= 4 && (
                    <li>
                      • <strong>Series B Allocation:</strong> The largest portion of capital ({formatPercent(results.investmentBreakdown[3].investment / results.totalInvestment)}) goes to Series B investments.
                    </li>
                  )}
                  {results.investmentBreakdown.length >= 2 && (
                    <li>
                      • <strong>Early Stage Efficiency:</strong> Pre-Seed and Seed stages require only {formatPercent((results.investmentBreakdown[0].investment + results.investmentBreakdown[1].investment) / results.totalInvestment)} of total capital.
                    </li>
                  )}
                  <li>
                    • <strong>Capital Efficiency:</strong> Approximately 70% of total capital flows to ultimately successful projects.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SimulationResults;