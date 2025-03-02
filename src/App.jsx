// In src/App.jsx
import React from 'react';
import InVentureApp from './components/InVentureApp';

// Add this global function for testing
window.navigateGlobal = (tab) => {
  console.log("Global navigation called for tab:", tab);
  // We'll find a way to access the setActiveTab function here later
};

function App() {
  return (
    <div className="App">
      <InVentureApp />
    </div>
  );
}

export default App;