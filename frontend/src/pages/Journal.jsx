import React, { useState } from "react";
import {
  Textarea,
  TextInput,
  Button,
  Card,
  Title,
  Stack,
  Center,
} from "@mantine/core";

import { JournalEntry } from "../components/JournalEntry";

const Journal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({ title: false, content: false });
  const [journals, setJournals] = useState([]);

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
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: "90vh",
          paddingTop: "10vh",
          paddingBottom: "5vh",
          overflowY: "scroll",
        }}
      >
        <Card
          shadow="sm"
          padding="lg"
          mb="lg"
          w={"90vw"}
          mih={"370px"}
          style={{ alignItems: "flex-start" }}
        >
          <Title order={2} align="center" mb="xl">
            New Journal Entry
          </Title>

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

          <Textarea
            label="My Story"
            placeholder="How are you feeling Today"
            value={content}
            onChange={(event) => setContent(event.currentTarget.value)}
            autosize
            minRows={4}
            required
            error={errors.content && !content}
            mb="md"
            w={"100%"}
          />

          <Button
            onClick={handleAddJournal}
            style={{ backgroundColor: "#CCD5AE" }}
            fullWidth
          >
            Add Journal Entry
          </Button>
        </Card>

        {/* Past Journal Entries Section */}
        <Title order={3} align="center" mt="xl" mb="lg">
          Past Journal Entries
        </Title>

        <Stack spacing="md">
          {journals.length > 0 ? (
            journals.map((journal) => (
              <JournalEntry
                id={journal.id}
                title={journal.title}
                content={journal.content}
                date={journal.date}
              />
            ))
          ) : (
            <p>
              No journal entries created yet. Start writing your first journal
              entry above!
            </p>
          )}
        </Stack>
      </div>
    </Center>
  );
};

export default Journal;
