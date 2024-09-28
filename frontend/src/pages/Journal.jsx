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
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useDisclosure } from "@mantine/hooks";

import { JournalEntry } from "../components/JournalEntry";

const Journal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [prompt, setPrompt] = useState("");
  const [errors, setErrors] = useState({ title: false, content: false });
  const [journals, setJournals] = useState([]);

  // Define default writing prompts
  const prompts = [
    "What made me smile today?",
    "Three things I’m grateful for right now.",
    "What is one accomplishment I’m proud of recently?",
    "Who is someone I appreciate, and why?",
    "What is a goal I can work towards this month?",
  ];

  const axiosClient = axios.create({
    baseURL: "http://justvent-lb-516258045.us-east-2.elb.amazonaws.com/api/v1/",
    timeout: 1000,
    headers: { "Access-Control-Allow-Origin": "*" },
  });

  useEffect(() => {
    const fetchJournals = async () => {
      const result = await axiosClient.get(`journals/user/user_001`);
      console.log(result);
    };

    fetchJournals();
  }, []);

  const handleGetPrompt = () => {
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  };

  const postJournalEntry = () => {};

  const handleAddJournal = () => {
    const newErrors = { title: false, content: false };
    if (title && content) {
      const newJournal = {
        id: Date.now(),
        title,
        content,
        date: new Date().toLocaleDateString(),
      };
      setJournals([newJournal, ...journals]);
      setTitle("");
      setContent("");
      setErrors(newErrors);
      close();
    } else {
      const newErrors = { title: false, content: false };
      !title ? (newErrors.title = true) : (newErrors.title = false);
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
        <TextInput
          label="Title"
          placeholder="Enter your Title"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          required
          error={errors.title && !title}
          mb="md"
          w={"100%"}
          style={{ alignSelf: "flex-start" }}
        />

        <Flex align={"center"} pb={"md"} gap={8}>
          <Button
            onClick={handleGetPrompt}
            style={{ backgroundColor: "#CCD5AE" }}
            w={"200px"}
          >
            Give me a Prompt
          </Button>
          <Text>{prompt}</Text>
        </Flex>

        <Textarea
          label="My Story"
          placeholder="How are you feeling Today"
          value={content}
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
          style={{ backgroundColor: "#CCD5AE" }}
          mt={"50px"}
          fullWidth
        >
          Add Journal Entry
        </Button>
      </Modal>

      <Button
        onClick={open}
        style={{ position: "absolute", top: 100, right: 20 }}
      >
        Write a new Entry
      </Button>

      {/* Past Journal Entries Section */}
      <Title order={1} align="center" mt="xl" mb="lg">
        Past Journal Entries
      </Title>

      {journals.length > 0 ? (
        <Carousel slideGap="md" controlsOffset="xs" w={"80vw"}>
          {journals.map((journal) => (
            <Carousel.Slide>
              <JournalEntry
                id={journal.id}
                title={journal.title}
                content={journal.content}
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
