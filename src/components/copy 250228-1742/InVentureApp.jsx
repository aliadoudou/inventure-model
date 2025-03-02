import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import InVentureHomepage from './InVentureHomepage';
import SimulationContainer from './SimulationContainer';

const InVentureApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-800 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">InVenture Model</h1>
          </div>
          <nav>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="border-0">
              <TabsList className="bg-indigo-700">
                <TabsTrigger value="home" className="text-white data-[state=active]:bg-indigo-600">Home</TabsTrigger>
                <TabsTrigger value="simulation" className="text-white data-[state=active]:bg-indigo-600">Simulation</TabsTrigger>
                <TabsTrigger value="documentation" className="text-white data-[state=active]:bg-indigo-600">Documentation</TabsTrigger>
                <TabsTrigger value="about" className="text-white data-[state=active]:bg-indigo-600">About</TabsTrigger>
              </TabsList>
            </Tabs>
          </nav>
        </div>
      </header>
      
      <main>
        <TabsContent value="home" className={activeTab === 'home' ? 'block' : 'hidden'}>
          <InVentureHomepage />
        </TabsContent>
        
        <TabsContent value="simulation" className={activeTab === 'simulation' ? 'block' : 'hidden'}>
          <SimulationContainer />
        </TabsContent>
        
        <TabsContent value="documentation" className={activeTab === 'documentation' ? 'block' : 'hidden'}>
          <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">InVenture Model Documentation</h1>
            <div className="prose prose-indigo max-w-none">
              <h2>Introduction and Problem Statement</h2>
              <p>
                Capital-intensive technologies face a critical funding gap when moving from pilot to commercial scale. This "valley of death" exists because:
              </p>
              <ul>
                <li><strong>High Capital Requirements:</strong> First-of-a-kind commercial facilities need tens or hundreds of millions in upfront investment</li>
                <li><strong>Technology Risk:</strong> Unproven technologies create substantial uncertainty for investors</li>
                <li><strong>Timeline Mismatch:</strong> Venture capital typically seeks returns within 5-10 years, while industrial projects may take 4-6 years just to develop</li>
                <li><strong>Financing Gap:</strong> Projects are too capital-intensive for conventional venture capital but too risky for traditional project finance</li>
              </ul>
              
              <h2>The InVenture Model Overview</h2>
              <p>
                The InVenture model creates a pathway to finance capital-intensive technologies by structuring multiple investment rounds that attract different investor types as risk decreases and valuation increases.
              </p>
              
              <h2>Four-Stage Investment Structure</h2>
              <p>
                The model structures investments across four distinct stages, each with specific objectives, investor profiles, and risk-return characteristics.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="about" className={activeTab === 'about' ? 'block' : 'hidden'}>
          <div className="max-w-3xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">About This Project</h1>
            <div className="prose prose-indigo max-w-none">
              <p>
                This website is a demonstration of the InVenture model - a groundbreaking financing approach designed to solve
                one of the most persistent challenges in industrial innovation: funding the commercialization of capital-intensive technologies.
              </p>
              <p>
                The InVenture model creates a structured pathway that bridges traditional venture capital and project finance,
                enabling promising technologies to navigate the "valley of death" between proof-of-concept and commercial operation.
              </p>
            </div>
          </div>
        </TabsContent>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">InVenture Model</h3>
              <p className="text-gray-300">
                Bridging venture capital and project finance for capital-intensive technologies.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">White Paper</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">GitHub Repository</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© 2025 InVenture Model. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InVentureApp;