import { Card, Title, Text, Flex } from "@mantine/core";

export function JournalEntry({ id, title, content, date }) {
  return (
    <Card key={id} shadow="sm" padding="lg" style={{ overflowY: "scroll" }}>
      <Flex justify={"space-between"}>
        <Title order={3}>{title}</Title>
        <Text>{date}</Text>
      </Flex>
      <div
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
          backgroundColor: "white",
          height: "60vh",
        }}
      >
        <Text
          size="md"
          c="gray.7"
          px={"30px"}
          py={"10px"}
          style={{ overflowY: scroll }}
        >
          {content}
        </Text>
      </div>
    </Card>
  );
}
