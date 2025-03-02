import { useState } from 'react';
import SimulationParameters from '../components/SimulationParameters';

export default {
  title: 'Portfolio Simulator/Parameters',
  component: SimulationParameters
};

const InteractiveDemo = () => {
  const [params, setParams] = useState({
    numPreSeed: 876,
    preSeedSuccessRate: 0.20,
    seedSuccessRate: 0.40,
    seriesASuccessRate: 0.60
  });

  return <SimulationParameters params={params} onChange={(k,v) => { 
    console.log('Parameter changed:', k, v);
    setParams(prev => ({...prev, [k]: v}))
  }} />;
};

export const WorkingSliders = InteractiveDemo.bind({});
