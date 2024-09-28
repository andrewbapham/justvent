import React, { useState } from 'react';
import { Container, Textarea, TextInput, Button, Card, Title, Stack, Center } from '@mantine/core';

const Journal = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [journals, setJournals] = useState([]);

  const handleAddJournal = () => {
    const newJournal = {
      id: Date.now(),
      title,
      content,
      date: new Date().toLocaleDateString(),
    };
    setJournals([...journals, newJournal]);
    setTitle('');
    setContent('');
  };

  return (
    
    <Center bg='#FEFAE0' w={"100vw"} h={"100vh"}>
    <Container size="md" style={{ marginTop: '20px', paddingTop: '10em' }}>
     
      <Card shadow="sm" padding="lg" mb="lg">
        <Title order={2} align="center" mb="xl">
            New Journal
        </Title>

        <TextInput
          label="Title"
          placeholder="Enter your Title"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          required
          mb="md"
        />

        <Textarea
          label="My Story"
          placeholder="How are you feeling Today"
          value={content}
          onChange={(event) => setContent(event.currentTarget.value)}
          autosize
          minRows={4}
          required
          mb="md"
        />

        <Button onClick={handleAddJournal} style={{backgroundColor: '#D4A373'}} fullWidth>
          Add Journal Entry
        </Button>
      </Card>

      <Title order={3} align="center" mt="xl" mb="lg">
        Past Journals
      </Title>

      <Stack spacing="md">
        {journals.length > 0 ? (
          journals.map((journal) => (
            <Card key={journal.id} shadow="sm" padding="lg">
              <Title order={4}>{journal.title}</Title>
              <p>{journal.content}</p>
              <p><em>{journal.date}</em></p>
            </Card>
          ))
        ) : (
          <p>No journals created yet. Start writing your first journal above!</p>
        )}
      </Stack>
    </Container>
    </Center>
  );
};

export default Journal;
