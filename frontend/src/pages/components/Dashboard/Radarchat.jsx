import React from 'react';
import { Card, Title as MantineTitle } from '@mantine/core';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const SCALE_FACTOR = 10;

const Radarchart = ({ data }) => {
  
  const radarChartData = data
    ? Object.keys(data).map((emotion) => ({
        emotion: emotion.charAt(0).toUpperCase() + emotion.slice(1),
        level: data[emotion] * SCALE_FACTOR, 
      }))
    : [];

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: "100%", backgroundColor: "white" }}>
      <MantineTitle order={2} align="center" mb="xl">
        Emotional Radar
      </MantineTitle>

      {radarChartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart outerRadius="80%" data={radarChartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="emotion" />
            <PolarRadiusAxis />
            <Radar name="Level" dataKey="level" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      ) : ( 
        <p style={{ textAlign: 'center' }}>No data available</p>
      )}
    </Card>
  );
};

export default Radarchart;
