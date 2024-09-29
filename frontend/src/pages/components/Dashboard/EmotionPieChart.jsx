import React from 'react';
import { Card, Center, Text } from '@mantine/core';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'; 

// Define colors for the PieChart slices
const COLORS = ['#FF0000', '#FFD700', '#00BFFF', '#00FF00', '#FFA500'];

const EmotionPieChart = ({ pieData }) => {
  // Render only if pieData is available
  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder 
      style={{ height: "100%", backgroundColor: "#ffffff" }}  // Ensure a white background
    >
      <Text weight={500} size="lg" mb="md" className="card-subtitle" style={{alignItems: 'center',marginleft: '7em'}}>
        <b>Emotion Distribution</b>
      </Text>

      {/* Check if pieData has any entries */}
      {pieData && pieData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"  // Center the Pie chart horizontally
              cy="50%"  // Center the Pie chart vertically
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Text align="center">No data available</Text>  // Fallback if no data is available
      )}
    </Card>
  );
};

export default EmotionPieChart;
