// At the top of your InVentureHomepage.jsx file, add:
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

// src/components/InVentureHomepage.jsx
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowRight, TrendingUp, Building, Beaker, Database, Zap } from 'lucide-react';

const InVentureHomepage = () => {
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
            <button className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10">
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
              
              {/* Investment Stages Tab - Content continues with similar pattern */}
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
                
                {/* Remainder of stages tab content */}
              </TabsContent>
              
              {/* Portfolio Approach Tab */}
              <TabsContent value="portfolio" className="p-6">
                {/* Portfolio tab content */}
              </TabsContent>
              
              {/* Simulation Tab */}
              <TabsContent value="simulation" className="p-6">
                {/* Simulation tab content */}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Application sectors section */}
      {/* Call to action section */}
    </div>
  );
};

export default InVentureHomepage;