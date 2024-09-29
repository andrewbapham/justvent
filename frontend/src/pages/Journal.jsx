import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Textarea,
  TextInput,
  Text,
  Button,
  Card,
  Title,
  Stack,
  Center,
  Flex,
  Modal,
  Menu,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { FaSearch, FaMicrophone } from "react-icons/fa";

import useSpeechToText from "../hooks/useSpeechToText";
import { JournalEntry } from "../components/JournalEntry";
import Searchbar from "./components/Journal/Searchbar";

const Journal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [content, setContent] = useState("");
  const [prompt, setPrompt] = useState("");
  const [errors, setErrors] = useState({ content: false });
  const [journals, setJournals] = useState([]);

  // Define default writing prompts
  const prompts = [
    "What made me smile today?",
    "Three things I’m grateful for right now.",
    "What is one accomplishment I’m proud of recently?",
    "Who is someone I appreciate, and why?",
    "What is a goal I can work towards this month?",
    "What is something kind I did for myself today?",
    "What is one thing I love about my life right now?",
    "Who inspires me, and how do they motivate me?",
    "What is a positive lesson I learned recently?",
    "What is a simple pleasure I enjoyed today?",
  ];

  const axiosClient = axios.create({
    baseURL:
      "http://justvent-app-lb-2099772870.us-east-2.elb.amazonaws.com/api/v1/",
    timeout: 15000,
    headers: { "Access-Control-Allow-Origin": "*" },
  });

  const { isRecording, transcript, startRecording, stopRecording } =
    useSpeechToText({ continuous: true });

  const toggleListening = () => {
    isRecording ? stopVoiceInput() : startRecording();
  };

  const stopVoiceInput = () => {
    setContent(
      (prevVal) =>
        prevVal +
        (transcript.length ? (prevVal.length ? " " : "") + transcript : "")
    );
    stopRecording();
  };

  useEffect(() => {
    const fetchJournals = async () => {
      const result = await axiosClient.get(`journals/user/user_001`);
      const recentResults = result.data.journals.reverse();
      setJournals(recentResults);
    };

    fetchJournals();
  }, []);

  const handleGetPrompt = () => {
    let promptNum = Math.floor(Math.random() * prompts.length);
    while (prompts[promptNum] === prompt) {
      promptNum = Math.floor(Math.random() * prompts.length);
    }
    setPrompt(prompts[promptNum]);
  };

  const handleAddJournal = async () => {
    const loadingNotification = notifications.show({
      title: "Creating entry....",
      color: "blue",
      loading: true,
    });
    const newErrors = { content: false };
    if (content) {
      const newJournal = {
        id: Date.now(),
        content,
        date: new Date().toLocaleDateString(),
      };
      await axiosClient
        .post(`journals`, {
          content: content,
          user_id: "user_001",
        })
        .then((res) => {
          notifications.show({
            title: "Successfully created entry.",
            color: "green",
          });
        })
        .catch(() => {
          notifications.show({
            title: "Failed to create entry.",
            message: "Please try again later",
            color: "red",
          });
        })
        .finally(() => {
          notifications.hide(loadingNotification);
        });
      setJournals([newJournal, ...journals]);
      setContent("");
      setErrors(newErrors);
      close();
    } else {
      const newErrors = { content: false };
      !content ? (newErrors.content = true) : (newErrors.content = false);
      setErrors(newErrors);
    }
  };

  return (
    <Center
      bg="#FEFAE0"
      w={"100vw"}
      h={"100vh"}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Modal
        opened={opened}
        onClose={close}
        title="New Journal Entry"
        size={"100%"}
      >
        <Flex align={"center"} pb={"md"} gap={8}>
          <Button
            onClick={handleGetPrompt}
            style={{ backgroundColor: "#5D8A2C" }}
            w={"200px"}
          >
            Give me a Prompt
          </Button>
          <Text>{prompt}</Text>
        </Flex>

        <Button
          rightSection={<FaMicrophone size={14} />}
          mb={"md"}
          style={{
            backgroundColor: isRecording ? "red" : "blue",
          }}
          onClick={() => toggleListening()}
        >
          {isRecording ? "Stop Listening" : "Speech to Text"}
        </Button>

        <Textarea
          label="My Story"
          placeholder="How are you feeling Today"
          disabled={isRecording}
          value={
            isRecording
              ? content +
                (transcript.length
                  ? (content.length ? " " : "") + transcript
                  : "")
              : content
          }
          onChange={(event) => setContent(event.currentTarget.value)}
          required
          error={errors.content && !content}
          mb="md"
          w={"100%"}
          h={"50vh"}
          styles={{ wrapper: { height: "100%" }, input: { height: "100%" } }}
        />

        <Button
          onClick={handleAddJournal}
          style={{ backgroundColor: "#5D8A2C" }}
          mt={"50px"}
          fullWidth
        >
          Add Journal Entry
        </Button>
      </Modal>

      <Flex align="center" justify="space-between" w={"80vw"}>
        {/* Past Journal Entries Section */}
        <Title order={1} align="center" mt="xl" mb="lg">
          Past Journal Entries
        </Title>
        <Flex gap={10}>
          <Searchbar />

          <Button onClick={open} style={{ backgroundColor: "#5D8A2C" }}>
            Write a new Entry
          </Button>
        </Flex>
      </Flex>

      {journals.length > 0 ? (
        <Carousel slideGap="md" controlsOffset="xs" w={"80vw"}>
          {journals.map((journal) => (
            <Carousel.Slide key={journal._id}>
              <JournalEntry
                id={journal._id}
                content={journal.content}
                emotions={journal.emotions}
                date={journal.date}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      ) : (
        <p>
          No journal entries created yet. Start writing your first journal entry
          above!
        </p>
      )}
    </Center>
  );
};

export default Journal;
