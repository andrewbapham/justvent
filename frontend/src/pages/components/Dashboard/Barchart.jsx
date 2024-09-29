import React from 'react';
import { Card, Title as MantineTitle } from '@mantine/core';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SCALE_FACTOR = 10;

const Barchart = ({ data }) => {
 
  const barChartData = data
    ? Object.keys(data).map((emotion) => ({
        emotion: emotion.charAt(0).toUpperCase() + emotion.slice(1),
        level: data[emotion] * SCALE_FACTOR,  
      }))
    : [];

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: "100%", backgroundColor: "white" }}>
      <MantineTitle order={2} align="center" mb="xl">
        Your Emotional Levels
      </MantineTitle>

      
      {barChartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="emotion" />
            <YAxis />
            <Tooltip formatter={(value) => (value / SCALE_FACTOR).toFixed(2)} /> 
            <Legend />
            <Bar dataKey="level" fill="#8884d8" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p style={{ textAlign: 'center' }}>No data available</p>
      )}
    </Card>
  );
};

export default Barchart;
