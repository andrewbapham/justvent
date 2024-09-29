import React from 'react';
import { Card, Text } from '@mantine/core';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const EMOTION_COLORS = {
  Joy: '#FFD700',     // Gold
  Anger: '#FF0000',   // Red
  Fear: '#800080',    // Purple
  Neutral: '#808080', // Gray
  Disgust: '#32CD32', // Lime Green
  Sadness: '#0000FF', // Blue
  Surprise: '#FFA500' // Orange
};

const SCALE_FACTOR = 10;
const EmotionPieChart = ({ pieData }) => {
  
  const scaledData = pieData.map((entry) => ({
    ...entry,
    value: entry.value * SCALE_FACTOR, // Scale values by the factor
  }));

  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
          <p>{`${data.payload.name} : ${data.value / SCALE_FACTOR}`}</p> 
        </div>
      );
    }
    return null;
  };

  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder 
      style={{ height: "100%", backgroundColor: "#ffffff" }}  
    >
      <Text weight={500} size="lg" mb="md" className="card-subtitle" style={{alignItems: 'center', marginLeft: '6em', fontSize: '25px'}}>
        <b>Emotion Distribution</b>
      </Text>

      {/* Check if pieData has any entries */}
      {scaledData && scaledData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="10%" 
            outerRadius="80%" 
            barSize={10} 
            data={scaledData}  // Use the scaled data
          >
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="value"
            >
              {scaledData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={EMOTION_COLORS[entry.name] || '#8884d8'} // Apply specific color to each emotion
                />
              ))}
            </RadialBar>
            <Tooltip content={renderCustomTooltip} /> {/* Custom tooltip */}
            <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" />
          </RadialBarChart>
        </ResponsiveContainer>
      ) : (
        <Text align="center">No data available</Text>  
      )}
    </Card>
  );
};

export default EmotionPieChart;
