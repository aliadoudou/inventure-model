import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const SimpleTestResults = ({ results, targetProjects }) => {
  console.log("SimpleTestResults rendering with:", results);
  
  // Very basic rendering of JSON data
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-gray-100 rounded-md overflow-auto max-h-96">
          <pre className="text-xs">{JSON.stringify(results, null, 2)}</pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleTestResults;