import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ArrowRight, TrendingUp, Building, Beaker, Database, Zap } from 'lucide-react';

const InVentureHomepage = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample data for stage progression
  const stageData = [
    {
      stage: 'Pre-Seed',
      focus: 'Pre-feasibility',
      risk: 'Technology & Concept',
      investor: 'Tech VC & Angels',
      amount: '$500K',
      return: '21.9x / 250% IRR',
      success: '20% to next stage',
      color: '#4338CA'
    },
    {
      stage: 'Seed',
      focus: 'Feasibility',
      risk: 'Preliminary Engineering',
      investor: 'Tech/Climate VC',
      amount: '$1M',
      return: '11.4x / 154% IRR',
      success: '40% to next stage',
      color: '#3B82F6'
    },
    {
      stage: 'Series A',
      focus: 'FEED & Development',
      risk: 'Detailed Design',
      investor: 'Growth VC & Strategic',
      amount: '$7.5M',
      return: '4.3x / 23% IRR',
      success: '60% to next stage',
      color: '#0EA5E9'
    },
    {
      stage: 'Series B',
      focus: 'Construction & Commissioning',
      risk: 'Execution & Construction',
      investor: 'Project Equity',
      amount: '$35M',
      return: '3.3x / 18% IRR',
      success: 'N/A',
      color: '#06B6D4'
    }
  ];
  
  const portfolioData = [
    { name: 'Pre-Seed', projects: 876, success: 175, investment: 438, color: '#4338CA' },
    { name: 'Seed', projects: 175, success: 70, investment: 175, color: '#3B82F6' },
    { name: 'Series A', projects: 70, success: 42, investment: 525, color: '#0EA5E9' },
    { name: 'Series B', projects: 42, success: 42, investment: 1470, color: '#06B6D4' }
  ];
  
  const simulationData = [
    { projects: 30, probability: 0.05 },
    { projects: 34, probability: 0.10 },
    { projects: 38, probability: 0.25 },
    { projects: 42, probability: 0.30 },
    { projects: 46, probability: 0.20 },
    { projects: 50, probability: 0.07 },
    { projects: 54, probability: 0.03 }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-indigo-800 to-blue-600 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
            The InVenture Model
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Bridging venture capital and project finance to solve the "valley of death" 
            for capital-intensive technologies.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 bg-white text-indigo-800 font-medium rounded-md shadow hover:bg-gray-100 flex items-center">
              Learn How It Works <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button 
              className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10"
              onClick={() => {
                console.log("Button clicked!");
                console.log("onNavigate function exists:", !!onNavigate);
                if (onNavigate) {
                  console.log("Attempting to navigate to 'simulation'");
                  onNavigate('simulation');
                } else {
                  console.log("onNavigate function is not available");
                }
              }}
            >
              Try the Simulation
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content with tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <Card className="shadow-xl">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-4 rounded-none border-b">
                <TabsTrigger value="overview" className="py-4">Overview</TabsTrigger>
                <TabsTrigger value="stages" className="py-4">Investment Stages</TabsTrigger>
                <TabsTrigger value="portfolio" className="py-4">Portfolio Approach</TabsTrigger>
                <TabsTrigger value="simulation" className="py-4">Risk Model</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="p-6">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">The Problem</h2>
                    <p className="text-gray-700 mb-6">
                      Capital-intensive technologies face a critical "valley of death" when moving from 
                      pilot to commercial scale. They're too expensive for traditional venture capital 
                      but too risky for conventional project finance.
                    </p>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">The Solution</h2>
                    <p className="text-gray-700">
                      The InVenture model creates a structured financing pathway with four investment stages, 
                      each designed to attract different investor types as risk decreases and valuation increases.
                    </p>
                    
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <Card className="bg-indigo-50 border-indigo-100">
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center text-indigo-700">
                            <TrendingUp className="h-5 w-5 mr-2" /> Risk-Calibrated Returns
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700">Early investors take higher risks for venture-style returns; later investors get infrastructure-style returns.</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-blue-50 border-blue-100">
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center text-blue-700">
                            <Building className="h-5 w-5 mr-2" /> Full Lifecycle Coverage
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700">Finances projects from concept to commercial operation with appropriate capital at each stage.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Model Benefits</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-0.5">✓</div>
                        <div>
                          <strong className="font-medium text-gray-900">Bridging the Gap</strong>
                          <p className="text-gray-600 mt-1">Provides a capital pathway where traditional financing models fail</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-0.5">✓</div>
                        <div>
                          <strong className="font-medium text-gray-900">Portfolio Approach</strong>
                          <p className="text-gray-600 mt-1">Transforms uncertain individual projects into predictable portfolio outcomes</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-0.5">✓</div>
                        <div>
                          <strong className="font-medium text-gray-900">Capital Efficiency</strong>
                          <p className="text-gray-600 mt-1">~70% of invested capital flows to ultimately successful projects</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-0.5">✓</div>
                        <div>
                          <strong className="font-medium text-gray-900">Fair Value Capture</strong>
                          <p className="text-gray-600 mt-1">Early investors capture higher returns for taking greater risk</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              {/* Investment Stages Tab */}
              <TabsContent value="stages" className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">The Four Investment Stages</h2>
                
                <div className="relative mb-12">
                  <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200 z-0"></div>
                  <div className="flex justify-between relative z-10">
                    {stageData.map((stage, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: stage.color }}
                        >
                          {index + 1}
                        </div>
                        <div className="mt-2 text-sm font-medium">{stage.stage}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-4 gap-4">
                  {stageData.map((stage, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="h-2" style={{ backgroundColor: stage.color }}></div>
                      <CardHeader className="pb-2">
                        <CardTitle>{stage.stage}</CardTitle>
                        <CardDescription>{stage.focus}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Risk:</span> {stage.risk}
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Investor Type:</span> {stage.investor}
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Investment Size:</span> {stage.amount}
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Return Profile:</span> {stage.return}
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Success Rate:</span> {stage.success}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Value Creation Through Development</h3>
                  <p className="text-gray-700 mb-6">
                    The InVenture model creates value at each stage by systematically reducing risk and 
                    increasing certainty about project performance.
                  </p>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-gradient-to-b from-indigo-50 to-white">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-indigo-700">
                          <Beaker className="h-5 w-5 mr-2" /> Technology
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">From theoretical concept to demonstrated performance</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-b from-blue-50 to-white">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-blue-700">
                          <Building className="h-5 w-5 mr-2" /> Engineering
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">From conceptual design to detailed engineering</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-b from-cyan-50 to-white">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-cyan-700">
                          <Database className="h-5 w-5 mr-2" /> Commercial
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">From market hypothesis to binding offtake agreements</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-b from-sky-50 to-white">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-sky-700">
                          <Zap className="h-5 w-5 mr-2" /> Financial
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">From concept to bankable business model</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Portfolio Approach Tab */}
              <TabsContent value="portfolio" className="p-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Strategy</h2>
                    <p className="text-gray-700 mb-6">
                      The InVenture model recognizes that not all early-stage technologies will succeed. 
                      It employs a portfolio approach that starts with many candidates and progressively 
                      filters for the most promising technologies.
                    </p>
                    
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">To achieve 40 successful commercial projects:</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• 876 Pre-Seed investments (assuming 20% success rate)</li>
                        <li>• 175 Seed investments (assuming 40% success rate)</li>
                        <li>• 70 Series A investments (assuming 60% success rate)</li>
                        <li>• 42 Series B investments reach commercial operation</li>
                      </ul>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Fund Economics</h3>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex justify-between border-b border-gray-200 py-2">
                        <span>Total Investment Required:</span>
                        <span className="font-medium">$2.61 billion</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 py-2">
                        <span>Investment in Successful Projects:</span>
                        <span className="font-medium">$1.83 billion (70.9%)</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 py-2">
                        <span>Total Returns:</span>
                        <span className="font-medium">$6.78 billion</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 py-2">
                        <span>Overall Multiple:</span>
                        <span className="font-medium">3.9x return</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Portfolio Funnel Visualization</h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={portfolioData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="projects" name="Total Projects" fill="#4338CA" />
                          <Bar dataKey="success" name="Successful Projects" fill="#22C55E" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Allocation</h3>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={portfolioData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis label={{ value: '$ Millions', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="investment" name="Investment ($ millions)" fill="#3B82F6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Simulation Tab (Risk Model) */}
              <TabsContent value="simulation" className="p-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Monte Carlo Risk Model</h2>
                    <p className="text-gray-700 mb-6">
                      Monte Carlo simulation allows us to understand the full range of possible outcomes
                      based on the probabilistic nature of project success rates and portfolio structure.
                    </p>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Key Insights from Monte Carlo Analysis</h3>
                    <div className="space-y-4 mb-6">
                      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                        <h4 className="font-semibold text-indigo-900 mb-1">Statistical Predictability Through Scale</h4>
                        <p className="text-gray-700">
                          While individual project success is highly uncertain (only 4.8% reach Series B), 
                          the large-scale portfolio approach creates statistical predictability.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <h4 className="font-semibold text-blue-900 mb-1">Robustness to Downside Scenarios</h4>
                        <p className="text-gray-700">
                          Even if success rates fall 25% below expectations, the portfolio is still likely 
                          to achieve a positive return (1.25x multiple).
                        </p>
                      </div>
                      
                      <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-100">
                        <h4 className="font-semibold text-cyan-900 mb-1">Correlation as a Key Risk Factor</h4>
                        <p className="text-gray-700">
                          Project outcome correlation significantly increases risk. Diversifying across 
                          uncorrelated technology types is critical.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Simulation Results</h3>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Distribution of Successful Projects</h4>
                      <div className="space-y-1 text-gray-700">
                        <div className="flex justify-between">
                          <span>Expected Value:</span>
                          <span className="font-medium">42.0 successful Series B projects</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Standard Deviation:</span>
                          <span className="font-medium">6.1 projects</span>
                        </div>
                        <div className="flex justify-between">
                          <span>95% Confidence Interval:</span>
                          <span className="font-medium">[30.2, 54.3] projects</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Probability of ≥40 projects:</span>
                          <span className="font-medium">62.8%</span>
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-3">Distribution of Successful Projects</h4>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={simulationData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="projects" label={{ value: 'Number of Successful Projects', position: 'insideBottom', offset: -5 }} />
                          <YAxis label={{ value: 'Probability', angle: -90, position: 'insideLeft' }} />
                          <Tooltip />
                          <Bar dataKey="probability" name="Probability" fill="#3B82F6">
                            {simulationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.projects >= 40 ? '#22C55E' : '#94A3B8'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Application sectors */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Applications and Impact</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Clean Energy & Climate Tech</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• Emerging renewable energy technologies</li>
                <li>• Advanced energy storage solutions</li>
                <li>• Green hydrogen production</li>
                <li>• Carbon capture and utilization</li>
                <li>• Advanced biofuels and synthetic fuels</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Advanced Materials & Manufacturing</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• Novel production processes</li>
                <li>• Bio-based materials</li>
                <li>• Advanced recycling technologies</li>
                <li>• Sustainable industrial processes</li>
                <li>• Smart manufacturing systems</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Infrastructure Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• Smart infrastructure systems</li>
                <li>• Decentralized utility models</li>
                <li>• Innovative waste management</li>
                <li>• Water purification and treatment</li>
                <li>• Sustainable construction technologies</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Call to action */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Learn More?</h2>
          <p className="text-gray-700 text-lg mb-8">
            Explore our detailed documentation, run simulations, or get in touch to discuss how the 
            InVenture model could apply to your technology or investment portfolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow hover:bg-indigo-700">
              Download White Paper
            </button>
            <button className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md shadow border border-indigo-200 hover:bg-indigo-50">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InVentureHomepage;