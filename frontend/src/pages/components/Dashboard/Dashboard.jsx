import React, { useState, useEffect } from 'react';
import { Container, Grid, Center, Box, Card, Text, Select } from '@mantine/core';
import Barchart from './Barchart';
import Radarchart from './Radarchat';
import EmotionPieChart from './EmotionPieChart';

import "../../design/Dashboard.css";

// Sample data to simulate API response
const sampleEmotionsData = {
  "Anger": 0.72,
  "Disgust": 0.35,
  "Fear": 0.55,
  "Joy": 0.25,
  "Neutral": 0.60,
  "Sadness": 0.42,
  "Surprise": 0.70
};

// Emoji mapping for current mood
const moodEmojis = {
  Anger: '😡',
  Disgust: '🤢',
  Fear: '😨',
  Joy: '😊',
  Neutral: '😐',
  Sadness: '😢',
  Surprise: '😮',
};

const Dashboard = () => {
  const [currentMood, setCurrentMood] = useState('Neutral');
  const [pieData, setPieData] = useState([]);
  const [emotionsData, setEmotionsData] = useState({});
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
    rangeType: 'day',  // Default to 'day'
  });

  // Handle date input changes
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle date range type change
  const handleRangeTypeChange = (value) => {
    setDateRange((prev) => ({
      ...prev,
      rangeType: value,
      startDate: '',  // Reset start date when range type changes
      endDate: '',    // Reset end date when range type changes
    }));
  };

  // Fetch sample emotion data (instead of calling API)
  useEffect(() => {
    const fetchEmotionData = () => {
      const emotionsData = sampleEmotionsData;

      // Prepare pie data for the PieChart
      const pieChartData = Object.keys(emotionsData).map((emotion) => ({
        name: emotion.charAt(0).toUpperCase() + emotion.slice(1),
        value: emotionsData[emotion],
      }));

      setPieData(pieChartData);
      setEmotionsData(emotionsData);  // Set data for Radar and Bar charts

      // Determine the highest emotion for "current mood"
      const highestEmotion = pieChartData.reduce((prev, current) => {
        return prev.value > current.value ? prev : current;
      }, { name: 'Neutral', value: 0 });

      setCurrentMood(highestEmotion.name || 'Neutral');
    };

    fetchEmotionData();
  }, [dateRange]);

  return (
    <Center className="fullscreen-center">
      <Container className="fullscreen-container">
        <h1>Your <i>current</i> state of mind</h1>

        {/* Date range selection controls */}
        <Box style={{ marginBottom: "2em", display: "flex", gap: "10px" }}>
          {dateRange.rangeType === 'day' ? (
            <input
              type="date"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateChange}
              style={{ padding: "8px", borderRadius: "5px" }}
              placeholder="Select Date"
            />
          ) : (
            <>
              <input
                type="date"
                name="startDate"
                value={dateRange.startDate}
                onChange={handleDateChange}
                style={{ padding: "8px", borderRadius: "5px" }}
                placeholder="Start Date"
              />
              <input
                type="date"
                name="endDate"
                value={dateRange.endDate}
                onChange={handleDateChange}
                style={{ padding: "8px", borderRadius: "5px" }}
                placeholder="End Date"
              />
            </>
          )}
          <Select
            value={dateRange.rangeType}
            onChange={handleRangeTypeChange}
            data={[
              { value: 'day', label: 'Day' },
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
              { value: 'year', label: 'Year' }
            ]}
            style={{ padding: "8px", borderRadius: "5px", width: "150px" }}
          />
        </Box>

        {/* Grid layout for charts */}
        <Grid>
          {/* Current Mood Card */}
          <Grid.Col span={6}>
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: "100%" }}>
              <Text weight={500} size="lg" mb="md" className="card-title">
                <b>Current Mood</b>
              </Text>
              <Text size="xl" className="emoji-large bounce">
                {moodEmojis[currentMood]} 
              </Text>
              <h2 className="emojiword">{currentMood}</h2>
            </Card>
          </Grid.Col>

          {/* Radar Chart */}
          <Grid.Col span={6}>
            <Radarchart data={emotionsData} />  {/* Pass emotionsData as prop */}
          </Grid.Col>

          {/* Bar Chart */}
          <Grid.Col span={6}>
            <Barchart data={emotionsData} />  {/* Pass emotionsData as prop */}
          </Grid.Col>

          {/* Emotion PieChart */}
          <Grid.Col span={6}>
            <EmotionPieChart pieData={pieData} />  {/* Pass pieData as prop */}
          </Grid.Col>
        </Grid>
      </Container>
    </Center>
  );
};

export default Dashboard;
