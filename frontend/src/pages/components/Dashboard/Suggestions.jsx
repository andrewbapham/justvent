import React from 'react';
import { Card, Text } from '@mantine/core';

const suggestionsData = {
  Joy: [
    "Keep spreading positivity!",
    "Share your happiness with others.",
    "Consider writing down what makes you joyful.",
  ],
  Anger: [
    "Take a deep breath and relax.",
    "Consider going for a walk to cool off.",
    "Practice mindfulness to manage anger.",
  ],
  Fear: [
    "Face your fears slowly, step by step.",
    "Talk to someone about your worries.",
    "Remember, it's okay to be afraid sometimes.",
  ],
  Sadness: [
    "Reach out to someone you trust.",
    "Allow yourself to rest and recharge.",
    "Try doing something you enjoy, like reading or a hobby.",
  ],
  Surprise: [
    "Embrace the unexpected!",
    "Enjoy the surprises life brings.",
    "Share your surprise with friends and family.",
  ],
  Disgust: [
    "Take a break and distance yourself from what's bothering you.",
    "Find ways to shift your focus to something more positive.",
    "Talking to someone may help.",
  ],
  Neutral: [
    "How about trying something new?",
    "Consider setting a goal for today.",
    "Take a moment to reflect on your feelings.",
  ]
};

const Suggestions = ({ currentMood }) => {
  // Fallback to Neutral suggestions if mood is not found
  const suggestions = suggestionsData[currentMood] || suggestionsData["Neutral"];

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: "#ffffff", marginTop: '20px' }}>
      <Text weight={500} size="lg" mb="md" style={{ textAlign: 'center', fontSize: '25px' }}>
        <b>Suggestions for You</b>
      </Text>

      {suggestions.map((suggestion, index) => (
        <Text key={index} size="md" mb="xs" style={{ textAlign: 'center' }}>
          {suggestion}
        </Text>
      ))}
    </Card>
  );
};

export default Suggestions;
