import { Card, Title } from "@mantine/core";
import "./styles.css";

export function JournalEntry({ id, title, content, date }) {
  return (
    <Card key={id} shadow="sm" padding="lg" className="journal_entry">
      <Title order={4}>{title}</Title>
      <p>{content}</p>
      <p>
        <em>{date}</em>
      </p>
    </Card>
  );
}
