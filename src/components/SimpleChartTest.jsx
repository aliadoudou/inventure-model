import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SimpleChartTest = ({ results, targetProjects }) => {
  console.log("SimpleChartTest rendering with:", results);
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('summary');
  // State for showing debug data
  const [showDebugData, setShowDebugData] = useState(false);
  
  // Early return if results aren't available
  if (!results || !results.distribution) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Complete Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Results data is missing or incomplete.</p>
          <pre className="mt-4 p-4 bg-gray-100 rounded text-xs overflow-auto">
            {JSON.stringify(results, null, 2)}
          </pre>
        </CardContent>
      </Card>
    );
  }
  
  // Format percentage for display
  const formatPercent = (value) => `${(value * 100).toFixed(1)}%`;
  
  // Convert targetProjects to number to ensure proper comparison
  const targetProjectsNum = Number(targetProjects);
  
  // Color bars that meet or exceed the target
  const coloredDistribution = results.distribution.map(item => ({
    ...item,
    color: Number(item.projects) >= targetProjectsNum ? '#22C55E' : '#3B82F6'
  }));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monte Carlo Simulation Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="investment">Investment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="mb-4">Key metrics and insights from the Monte Carlo simulation.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-3 bg-white rounded shadow-sm">
                  <p className="text-sm text-gray-500">Expected Projects</p>
                  <p className="text-lg font-bold">{results.expectedProjects?.toFixed(1)}</p>
                </div>
                <div className="p-3 bg-white rounded shadow-sm">
                  <p className="text-sm text-gray-500">Success Probability</p>
                  <p className="text-lg font-bold">{formatPercent(results.probTarget || 0)}</p>
                </div>
                <div className="p-3 bg-white rounded shadow-sm">
                  <p className="text-sm text-gray-500">Total Investment</p>
                  <p className="text-lg font-bold">
                    {results.totalInvestment 
                      ? `$${(results.totalInvestment).toFixed(1)}M` 
                      : 'N/A'}
                  </p>
                </div>
                <div className="p-3 bg-white rounded shadow-sm">
                  <p className="text-sm text-gray-500">Capital Efficiency</p>
                  <p className="text-lg font-bold">
                    {results.investmentBreakdown && results.totalInvestment
                      ? `${(results.investmentBreakdown[3].investment / results.totalInvestment * 100).toFixed(1)}%`
                      : 'N/A'}
                  </p>
                </div>
              </div>
              
              <Card className="mb-6">
                <CardHeader className="py-3">
                  <CardTitle className="text-lg">Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      • While individual projects have only a 4.8% success rate from Pre-Seed to Series B, the portfolio approach provides statistical predictability.
                    </li>
                    <li>
                      • With {Math.round(results.expectedProjects)} expected successful projects, the probability of achieving the target of {targetProjects} projects is {formatPercent(results.probTarget || 0)}.
                    </li>
                    <li>
                      • The 95% confidence interval shows we can expect between {results.confidenceInterval[0]} and {results.confidenceInterval[1]} successful projects.
                    </li>
                    <li>
                      • Total investment required across all stages is ${(results.totalInvestment || 0).toFixed(1)}M.
                    </li>
                    <li>
                      • Capital efficiency is high - approximately 70% of invested capital flows to ultimately successful projects.
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              {results.investmentBreakdown && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Project Success Funnel</h3>
                    <div className="p-4 bg-white rounded-md" style={{ height: "200px" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={results.investmentBreakdown}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="stage" type="category" width={80} />
                          <Tooltip />
                          <Bar dataKey="projects" fill="#4F46E5" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Investment Breakdown</h3>
                    <div className="p-4 bg-white rounded-md" style={{ height: "200px" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={results.investmentBreakdown}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="stage" />
                          <YAxis />
                          <Tooltip formatter={(value) => `$${value.toFixed(1)}M`} />
                          <Bar dataKey="investment" fill="#3B82F6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="distribution">
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="mb-4">Probability distribution of successful Series B projects.</p>
              
              {/* Show some basic stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-white rounded shadow-sm">
                  <p className="text-sm text-gray-500">Expected Projects</p>
                  <p className="text-lg font-bold">{results.expectedProjects?.toFixed(1)}</p>
                </div>
                <div className="p-3 bg-white rounded shadow-sm">
                  <p className="text-sm text-gray-500">Target Probability</p>
                  <p className="text-lg font-bold">{formatPercent(results.probTarget || 0)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-white rounded shadow-sm">
                  <p className="text-sm text-gray-500">95% Confidence Interval</p>
                  <p className="text-lg font-bold">
                    {results.confidenceInterval ? `[${results.confidenceInterval[0]}, ${results.confidenceInterval[1]}]` : 'N/A'}
                  </p>
                </div>
                <div className="p-3 bg-white rounded shadow-sm">
                  <p className="text-sm text-gray-500">Standard Deviation</p>
                  <p className="text-lg font-bold">{results.standardDeviation?.toFixed(1) || 'N/A'}</p>
                </div>
              </div>
              
              {/* Distribution chart */}
              <div className="mt-4 border border-gray-200 rounded-md p-4" style={{ height: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={coloredDistribution}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="projects" />
                    <YAxis tickFormatter={formatPercent} />
                    <Tooltip 
                      formatter={(value) => formatPercent(value)} 
                      labelFormatter={(value) => `${value} Projects`}
                    />
                    <Bar 
                      dataKey="probability" 
                      name="Probability" 
                      fill="#3B82F6"
                      fillOpacity={0.8}
                      stroke="#000"
                      strokeOpacity={0.1}
                      strokeWidth={1}
                      isAnimationActive={true}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Only show raw data when toggle is on */}
              {showDebugData && (
                <div className="mt-4">
                  <p className="font-medium mb-2">Distribution Data:</p>
                  <pre className="p-3 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                    {JSON.stringify(results.distribution, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="investment">
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="mb-4">Investment breakdown across project stages.</p>
              
              {/* Investment stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-white rounded shadow-sm">
                  <p className="text-sm text-gray-500">Total Investment</p>
                  <p className="text-lg font-bold">
                    {results.totalInvestment 
                      ? `$${(results.totalInvestment).toFixed(1)}M` 
                      : 'N/A'}
                  </p>
                </div>
                <div className="p-3 bg-white rounded shadow-sm">
                  <p className="text-sm text-gray-500">Capital Efficiency</p>
                  <p className="text-lg font-bold">
                    {results.investmentBreakdown && results.totalInvestment
                      ? `${(results.investmentBreakdown[3].investment / results.totalInvestment * 100).toFixed(1)}%`
                      : 'N/A'}
                  </p>
                </div>
              </div>
              
              {/* Investment bar chart */}
              {results.investmentBreakdown && (
                <div className="mt-4 border border-gray-200 rounded-md p-4 bg-white" style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={results.investmentBreakdown}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="stage" />
                      <YAxis label={{ value: '$ Millions', angle: -90, position: 'insideLeft' }} />
                      <Tooltip 
                        formatter={(value) => `$${value.toFixed(1)}M`} 
                        labelFormatter={(value) => `${value} Stage`}
                      />
                      <Bar 
                        dataKey="investment" 
                        name="Investment" 
                        fill="#3B82F6"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
              
              {/* Project funnel visualization */}
              {results.investmentBreakdown && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Project Funnel</h3>
                    <div className="border border-gray-200 rounded-md p-4 bg-white" style={{ height: "300px" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={results.investmentBreakdown}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="stage" type="category" />
                          <Tooltip 
                            formatter={(value) => value} 
                          />
                          <Bar 
                            dataKey="projects" 
                            name="Number of Projects" 
                            fill="#4F46E5"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Investment Allocation</h3>
                    <div className="border border-gray-200 rounded-md p-4 bg-white" style={{ height: "300px" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={results.investmentBreakdown}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            dataKey="investment"
                            nameKey="stage"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {results.investmentBreakdown.map((entry, index) => {
                              const COLORS = ['#4338CA', '#3B82F6', '#0EA5E9', '#06B6D4'];
                              return (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              );
                            })}
                          </Pie>
                          <Tooltip formatter={(value) => `$${value.toFixed(1)}M`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Only show raw data when toggle is on */}
              {showDebugData && (
                <div className="mt-4">
                  <p className="font-medium mb-2">Investment Breakdown Data:</p>
                  <pre className="p-3 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                    {JSON.stringify(results.investmentBreakdown, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Debug data toggle */}
        <div className="mt-6 flex justify-end">
          <button 
            onClick={() => setShowDebugData(!showDebugData)}
            className="text-xs flex items-center text-gray-500 hover:text-gray-700"
          >
            {showDebugData ? (
              <>Hide Raw Data <ChevronUp className="ml-1 h-3 w-3" /></>
            ) : (
              <>Show Raw Data <ChevronDown className="ml-1 h-3 w-3" /></>
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleChartTest;