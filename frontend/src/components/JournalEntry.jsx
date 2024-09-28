import { Card, Title, Text } from "@mantine/core";
import "./styles.css";

export function JournalEntry({ id, title, content, date }) {
  return (
    <Card key={id} shadow="sm" padding="lg" className="journal_entry">
      <Title order={3}>{title}</Title>
      <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
        <Text size="md" c="gray.7">
          {content}
        </Text>
      </div>
      <p>
        <em>{date}</em>
      </p>
    </Card>
  );
}
