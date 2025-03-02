// src/components/TestComponents.jsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Label } from './ui/label';

const TestComponents = () => {
  const [sliderValue, setSliderValue] = useState([50]);
  
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center mb-8">UI Component Test</h1>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Card Components</h2>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>This is a description for the card.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the content of the card.</p>
          </CardContent>
        </Card>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Tabs Component</h2>
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <TabsContent value="tab1">
              <Card>
                <CardContent>Content for Tab 1</CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab2">
              <Card>
                <CardContent>Content for Tab 2</CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab3">
              <Card>
                <CardContent>Content for Tab 3</CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Slider Component</h2>
        <div className="space-y-4">
          <Slider
            min={0}
            max={100}
            step={1}
            defaultValue={[50]}
            onValueChange={setSliderValue}
          />
          <p>Current value: {sliderValue[0]}</p>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Input and Label</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestComponents;