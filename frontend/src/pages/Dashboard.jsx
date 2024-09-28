import React, { useState } from 'react';
import { Container, Grid, Center, Box, Card, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';  
import Barchart from './Barchart';
import Radarchart from './Radarchat.jsx';


import "./Dashboard.css";

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
  { name: 'Joy', value: 30 },
  { name: 'Sadness', value: 20 },
  { name: 'Neutral', value: 25 },
  { name: 'Surprise', value: 20 },
];

const COLORS = ['#FF0000', '#FFD700', '#00BFFF', '#00FF00', '#FFA500'];

const Dashboard = () => {
  const [value, setValue] = useState([null, null]);
  const [currentMood, setCurrentMood] = useState('Surprise'); 

  return (
    <Center bg='#FEFAE0' w={"100vw"} h={"100vh"}>
      <Container size="md" style={{ marginTop: '10em' }}>
        <h1>Your <i>current</i> state of mind</h1>

        <Box style={{ marginBottom: "2em" }}>
          <DatePickerInput
            type="range"
            label="Pick dates range"
            placeholder="Pick dates range"
            value={value}
            onChange={setValue}
            classNames={{ input: 'date-input-icon' }} 
            style={{ width: "250px" }}  
          />
        </Box>

        <Grid>
        
          <Grid.Col span={6}>
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: "100%" }}>
              <Text weight={500} size="lg" mb="md" style={{ fontSize: '35px' }}>
                <b>Current Mood</b>
              </Text>
            
              <Text size="xl" align="center" style={{ fontSize: "6rem" }} className="bounce">
                {moodEmojis[currentMood]} 
              </Text>
              <h2>{currentMood}</h2>
            </Card>
          </Grid.Col>
          
          
          <Grid.Col span={6}>
            <Radarchart />
          </Grid.Col>

          
          <Grid.Col span={6}>
            <Barchart />
          </Grid.Col>

         
          <Grid.Col span={6}>
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: "100%" }}>
              <Text weight={500} size="lg" mb="md" style={{ fontSize: '30px' }}>
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
