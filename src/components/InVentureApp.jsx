import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import InVentureHomepage from './InVentureHomepage';
import SimulationContainer from './SimulationContainer';
import { Info } from 'lucide-react';

const InVentureApp = () => {
  // State to track active tab
  const [activeTab, setActiveTab] = useState('home');
  
  // Explicit navigation function for debugging and clarity
  const navigateToTab = (tabName) => {
    console.log("navigateToTab called with:", tabName);
    console.log("Current activeTab:", activeTab);
    setActiveTab(tabName);
    console.log("activeTab after setting:", tabName);
  };
  
  console.log("InVentureApp rendering, activeTab =", activeTab);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-800 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">InVenture Model</h1>
          </div>
          <nav>
            <Tabs value={activeTab} onValueChange={navigateToTab} className="border-0">
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
        {/* IMPORTANT: This is the critical fix - explicitly pass navigateToTab function */}
        {activeTab === 'home' && (
          <InVentureHomepage onNavigate={navigateToTab} />
        )}
        
        {activeTab === 'simulation' && (
          <SimulationContainer />
        )}
        
        {activeTab === 'documentation' && (
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
        )}
        
        {activeTab === 'about' && (
          <div className="max-w-3xl mx-auto py-12 px-4">
           <h1 className="text-3xl font-bold text-gray-900 mb-6">About This Project</h1>
<div className="prose prose-indigo max-w-none">
  <p>
    The InVenture model is a groundbreaking financing approach designed to solve one of the most persistent challenges in industrial innovation: funding the commercialization of capital-intensive technologies. This website demonstrates how the model creates a structured pathway bridging traditional venture capital and project finance, enabling promising technologies to navigate the "valley of death" between proof-of-concept and commercial operation.
  </p>
  <p>
    Inspired by Professor Andrew W. Lo's work on "Funding Long Shots" at MIT, this project applies portfolio theory and financial engineering concepts to First-Of-A-Kind (FOAK) technology deployment. The model incorporates key innovations such as:
  </p>
  <ul>
    <li>Successive selection of projects</li>
    <li>Accordant capital allocation</li>
    <li>Correlation analysis between projects</li>
  </ul>
  <p>
    The InVenture approach is particularly relevant for capital-intensive sectors like clean energy, advanced materials, and manufacturing, where traditional software-focused venture capital models often fall short.
  </p>
  <p>
    This project aims to illustrate the model's mechanics and demonstrate its potential for transforming how we finance critical innovations in these sectors, drawing on engineering expertise and experience in hard asset, capital-intensive industries.
  </p>
  <h2>Contact Information</h2>
  <p>
    For more information about the InVenture model or to discuss potential applications, please contact:
  </p>
  <p>
    Email: contact@inventure-model.io<br />
    Website: https://aliadoudou.github.io/inventure-model.io/
  </p>
  <h2>Disclaimer</h2>
  <p>
    This model is provided for informational and educational purposes only. The simulations and calculations are based on theoretical assumptions and should not be considered as investment advice. Actual results may vary significantly from the examples presented here.
  </p>
</div>

          </div>
        )}
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
                <li><a href="#" onClick={(e) => {e.preventDefault(); navigateToTab('documentation');}} className="text-gray-300 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">White Paper</a></li>
                <li><a href="https://github.com/aliadoudou/inventure-model" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">GitHub Repository</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" onClick={(e) => {e.preventDefault(); navigateToTab('about');}} className="text-gray-300 hover:text-white">Contact Us</a></li>
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