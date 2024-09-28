import React from 'react';
import { Card, Title as MantineTitle } from '@mantine/core';
import { BarChart } from '@mantine/charts'; 
import { data } from './data'; 

const Barchart = () => {
  return (
    <Card shadow="sm" padding="lg">
      <MantineTitle order={2} align="center" mb="xl">
        Your Emotional Levels
      </MantineTitle>

      <BarChart
        h={300} 
        data={data} 
        dataKey="emotion" 
        orientation="vertical" 
        yAxisProps={{ width: 80 }} 
        barProps={{ radius: 100 }} 
        series={[{ name: 'Emotion Levels', color: 'blue.6' }]} 
      />
    </Card>
  );
};

export default Barchart;
