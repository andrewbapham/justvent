import { AppShell, Burger, Group, UnstyledButton } from "@mantine/core";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  return (
    <AppShell.Header>
      <Group h="100%" px="md">
        <Group justify="justify-between" style={{ flex: 1, padding: "20px" }}>
          <Group ml="xl" gap={10} visibleFrom="sm">
            <UnstyledButton
              onClick={() => navigate("/")}
              style={{ padding: "8px" }}
            >
              Home
            </UnstyledButton>
            <UnstyledButton
              onClick={() => navigate("/journal")}
              style={{ padding: "8px" }}
            >
              Journal
            </UnstyledButton>
            <UnstyledButton
              onClick={() => navigate("/dashboard")}
              style={{ padding: "8px" }}
            >
              Dashboard
            </UnstyledButton>
            <UnstyledButton style={{ padding: "8px" }}>Sign In</UnstyledButton>
          </Group>
        </Group>
      </Group>
    </AppShell.Header>
  );
}

export default NavBar;
