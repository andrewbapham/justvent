import React, { useState } from 'react';
import { Container, Grid, Center, Box, Card, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import Barchart from './Barchart';
import Radarchart from './Radarchat.jsx';
import dayjs from 'dayjs';

// Import the custom CSS file
import "./Dashboard.css";

const Dashboard = () => {
  // State to handle the date range
  const [value, setValue] = useState([null, null]);

  // State for the current mood (you can modify this as needed)
  const [currentMood, setCurrentMood] = useState('😊');

  return (
    <Center bg='#FEFAE0' w={"100vw"} h={"100vh"}>
      <Container size="md" style={{ marginTop: '10em' }}>
        {/* Title */}
        <h1>Your <i>current</i> state of mind</h1>

        {/* Date Range Input below the title */}
        <Box style={{ marginBottom: "2em" }}>
          <DatePickerInput
            type="range"
            label="Pick dates range"
            placeholder="Pick dates range"
            value={value}
            onChange={setValue}
            classNames={{ input: 'date-input-icon' }} // Optional: for custom styling
            style={{ width: "250px" }}  // Adjust the width as needed
          />
        </Box>

        {/* Grid for charts and mood card */}
        <Grid>
          {/* Current Mood card */}
          <Grid.Col span={6}>
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: "100%" }}>
              <Text weight={500} size="lg" mb="md">
                <b>Current Mood</b>
              </Text>
              {/* Emoji with bouncing animation */}
              <Text size="xl" align="center" style={{ fontSize: "6rem" }} className="bounce">
                {currentMood} {/* Emoji representing the current mood */}
              </Text>
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
        </Grid>
      </Container>
    </Center>
  );
};

export default Dashboard;
