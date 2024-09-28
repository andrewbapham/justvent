import React, { useState } from 'react';
import { Container, Grid, Center, Box, Card, Text } from '@mantine/core';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';  
import Barchart from './Barchart';
import Radarchart from './Radarchat.jsx';

import "../../design/Dashboard.css";

const moodEmojis = {
  Anger: '😡',
  Disgust: '🤢',
  Fear: '😨',
  Joy: '😊',
  Neutral: '😐',
  Sadness: '😢',
  Surprise: '😮',
};

const pieData = [
  { name: 'Anger', value: 5 },
  { name: 'Disgust', value: 30 },
  { name: 'Fear', value: 20 },
  { name: 'Joy', value: 25 },
  { name: 'Neutral', value: 20 },
  { name: 'Sadness', value: 20 },
  { name: 'Surprise', value: 20 },
];

const COLORS = ['#FF0000', '#FFD700', '#00BFFF', '#00FF00', '#FFA500'];

const Dashboard = () => {
  const [currentMood, setCurrentMood] = useState('Surprise'); 
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Center className="fullscreen-center">
      <Container className="fullscreen-container">
        <h1>Your <i>current</i> state of mind</h1>

        <Box style={{ marginBottom: "2em", display: "flex", gap: "10px" }}>
          <input
            type="date"
            name="startDate"
            value={dateRange.startDate}
            onChange={handleDateChange}
            style={{ padding: "8px", borderRadius: "5px" }}
          />
          <input
            type="date"
            name="endDate"
            value={dateRange.endDate}
            onChange={handleDateChange}
            style={{ padding: "8px", borderRadius: "5px" }}
          />
        </Box>

        <Grid>
          {/* Current Mood card */}
          <Grid.Col span={6}>
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: "100%" }}>
              <Text weight={500} size="lg" mb="md" className="card-title">
                <b>Current Mood</b>
              </Text>
            
              <Text size="xl" className="emoji-large bounce">
                {moodEmojis[currentMood]} 
              </Text>
              <h2 className='emojiword'>{currentMood}</h2>
            </Card>
          </Grid.Col>
          
          {/* Radar chart */}
          <Grid.Col span={6}>
            <Radarchart />
          </Grid.Col>

          {/* Bar chart */}
          <Grid.Col span={6}>
            <Barchart />
          </Grid.Col>

          {/* Pie chart */}
          <Grid.Col span={6}>
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: "100%" }}>
              <Text weight={500} size="lg" mb="md" className="card-subtitle">
                <b>Emotion Distribution</b>
              </Text>
              <PieChart width={300} height={300}>
                <Pie
                  data={pieData}
                  cx={190}
                  cy={150}
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
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </Center>
  );
};

export default Dashboard;
