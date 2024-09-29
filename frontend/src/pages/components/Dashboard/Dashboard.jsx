import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Center,
  Box,
  Card,
  Text,
  Select,
} from "@mantine/core";
import axios from "axios";
import Radarchart from "./Radarchat";
import EmotionPieChart from "./EmotionPieChart";
import Barchart from "./Barchart";
import "../../design/Dashboard.css";

const moodEmojis = {
  Anger: "😡",
  Disgust: "🤢",
  Fear: "😨",
  Joy: "😊",
  Neutral: "😐",
  Sadness: "😢",
  Surprise: "😮",
};

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

const Dashboard = () => {
  // Get the current date and format it
  const currentDate = formatDate(new Date());

  const [currentMood, setCurrentMood] = useState("Neutral");
  const [pieData, setPieData] = useState([]);
  const [emotionsData, setEmotionsData] = useState({});
  const [userId] = useState("user_001");
  const [dateRange, setDateRange] = useState({
    startDate: currentDate, // Set the default value to the current date
    rangeType: "day",
  });

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRangeTypeChange = (value) => {
    setDateRange((prev) => ({
      ...prev,
      rangeType: value,
    }));
  };

  useEffect(() => {
    const fetchEmotionData = async () => {
      if (!dateRange.startDate) {
        console.error("Start date is required");
        return;
      }

      const formattedStartDate = formatDate(dateRange.startDate);

      try {
        const response = await axios.get(
          `http://justvent-app-lb-2099772870.us-east-2.elb.amazonaws.com/api/v1/users/emotions/${userId}`,
          {
            params: {
              range_type: dateRange.rangeType,
              start_date: formattedStartDate,
            },
          }
        );

        const emotionsData = response.data;

        const pieChartData = Object.keys(emotionsData).map((emotion) => ({
          name: emotion.charAt(0).toUpperCase() + emotion.slice(1),
          value: emotionsData[emotion],
        }));

        setPieData(pieChartData);
        setEmotionsData(emotionsData);

        const highestEmotion = pieChartData.reduce(
          (prev, current) => {
            return prev.value > current.value ? prev : current;
          },
          { name: "Neutral", value: 0 }
        );

        setCurrentMood(highestEmotion.name || "Neutral");
      } catch (error) {
        console.error("Error fetching emotion data:", error);
      }
    };

    fetchEmotionData();
  }, [dateRange, userId]);

  return (
    <Center className="fullscreen-center">
      <Container className="fullscreen-container">
        <h1 id="title">
          Your <i>current</i> state of mind
        </h1>

        <Box className="date-controls">
          <input
            type="date"
            name="startDate"
            value={dateRange.startDate}
            onChange={handleDateChange}
            className="date-input"
          />
          <Select
            value={dateRange.rangeType}
            onChange={handleRangeTypeChange}
            data={[
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
              { value: "year", label: "Year" },
            ]}
            className="range-select"
          />
        </Box>

        <Grid className="charts-grid">
          <Grid.Col span={6}>
            <Card className="current-mood-card">
              <Text className="card-title">
                <b>Current Mood</b>
              </Text>
              <Text className="emoji-large bounce">
                {moodEmojis[currentMood]}
              </Text>
              <h2 className="emojiword">{currentMood}</h2>
            </Card>
          </Grid.Col>

          <Grid.Col span={6}>
            <Radarchart data={emotionsData} />
          </Grid.Col>

          <Grid.Col span={6}>
            <Barchart data={emotionsData} />
          </Grid.Col>

          <Grid.Col span={6}>
            <EmotionPieChart pieData={pieData} />
          </Grid.Col>
        </Grid>
      </Container>
    </Center>
  );
};

export default Dashboard;
