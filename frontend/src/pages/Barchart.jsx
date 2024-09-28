import React from 'react';
import { Card, Title as MantineTitle } from '@mantine/core';
import { BarChart } from '@mantine/charts'; // Import Mantine's BarChart
import { data } from './data'; // Import your data

const Barchart = () => {
  return (
    <Card shadow="sm" padding="lg">
      <MantineTitle order={2} align="center" mb="xl">
        Your Emotional Levels
      </MantineTitle>

      {/* Mantine BarChart */}
      <BarChart
        h={300} // Adjust height if needed
        data={data} // Data from './data'
        dataKey="emotion" // Key for X-axis (make sure your data object has this key)
        orientation="vertical" // Bar orientation
        yAxisProps={{ width: 80 }} // Y-axis width adjustment
        barProps={{ radius: 100 }} // Rounded corners on bars
        series={[{ name: 'Emotion Levels', color: 'blue.6' }]} // Series with color
      />
    </Card>
  );
};

export default Barchart;
