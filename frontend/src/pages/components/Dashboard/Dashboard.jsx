import React, { useState, useEffect } from 'react';
import { Container, Grid, Center, Box, Card, Text, Select } from '@mantine/core';
import axios from 'axios';
import Radarchart from './Radarchat';
import Barchart from './Barchart';
import EmotionPieChart from './EmotionPieChart';
import "../../design/Dashboard.css";

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

const formatDate = (date) => {
  if (!date) return ''; 
  const d = new Date(date);
  return d.toISOString().split('T')[0];  
};




const Dashboard = () => {
  const [currentMood, setCurrentMood] = useState('Neutral');
  const [pieData, setPieData] = useState([]);
  const [emotionsData, setEmotionsData] = useState({});
  const [userId] = useState('user_001');  
  const [dateRange, setDateRange] = useState({
    startDate: '',
    rangeType: 'day', 
  });

  // Handle date input changes
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle range type selection change
  const handleRangeTypeChange = (value) => {
    setDateRange((prev) => ({
      ...prev,
      rangeType: value,
    }));
  };

  // Fetch emotion data from the API
  useEffect(() => {
    const fetchEmotionData = async () => {
      if (!dateRange.startDate) {
        console.error('Start date is required');
        return;
      }

      const formattedStartDate = formatDate(dateRange.startDate);

      try {
        // API call to fetch data
        const response = await axios.get(`http://your-api-endpoint.com/api/v1/users/emotions/${userId}`, {
          params: {
            range_type: dateRange.rangeType,
            start_date: formattedStartDate,
          },
        });

        const emotionsData = response.data;  // API response data

        // Prepare data for PieChart
        const pieChartData = Object.keys(emotionsData).map((emotion) => ({
          name: emotion.charAt(0).toUpperCase() + emotion.slice(1),
          value: emotionsData[emotion],
        }));

        setPieData(pieChartData);
        setEmotionsData(emotionsData);

        // Determine the highest emotion for "Current Mood"
        const highestEmotion = pieChartData.reduce((prev, current) => {
          return prev.value > current.value ? prev : current;
        }, { name: 'Neutral', value: 0 });

        setCurrentMood(highestEmotion.name || 'Neutral');
      } catch (error) {
        console.error('Error fetching emotion data:', error);
      }
    };

    fetchEmotionData();
  }, [dateRange, userId]);

  return (
    <Center className="fullscreen-center">
      <Container className="fullscreen-container">
        <h1>Your <i>current</i> state of mind</h1>

        {/* Date range selection controls */}
        <Box style={{ marginBottom: "2em", display: "flex", gap: "10px" }}>
          {/* Date input */}
          <input
            type="date"
            name="startDate"
            value={dateRange.startDate}
            onChange={handleDateChange}
            style={{ padding: "8px", borderRadius: "5px" }}
            placeholder="Select Date"
          />
          {/* Range type select */}
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
            <Radarchart data={emotionsData} />  
          </Grid.Col>

          {/* Bar Chart */}
          <Grid.Col span={6}>
            <Barchart data={emotionsData} />  
          </Grid.Col>

          {/* Pie Chart */}
          <Grid.Col span={6}>
            <EmotionPieChart pieData={pieData} />  
          </Grid.Col>
        </Grid>
      </Container>
    </Center>
  );
};

export default Dashboard;
