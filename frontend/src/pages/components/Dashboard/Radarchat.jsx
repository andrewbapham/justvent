import React from 'react';
import { RadarChart as MantineRadarChart } from '@mantine/charts';
import { Card, Title as MantineTitle } from '@mantine/core';

const Radarchart = () => {
  const data = [
    { product: 'Anger', sales: 80 },
    { product: 'Disgust', sales: 30 },
    { product: 'Fear', sales: 90 },
    { product: 'Sadness', sales: 20 },
    { product: 'Neutral', sales: 50 },
    { product: 'Joy', sales: 70 },
    { product: 'Surprise', sales: 40 },
  ];

  return (
    <Card shadow="sm" padding="lg" id="maincard">
      <MantineTitle order={2} align="center" mb="xl">
        How You're Feeling...
      </MantineTitle>
      <MantineRadarChart
        h={300} 
        w={400} 
        data={data}
        dataKey="product"
        padding={80}
        series={[{ name: 'sales', color: 'blue.4', opacity: 0.2 }]}
        axislabels={{ fontSize: 1 }} 
      />
    </Card>
  );
};

export default Radarchart;
