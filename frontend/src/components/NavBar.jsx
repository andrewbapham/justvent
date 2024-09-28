import { Group, UnstyledButton } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/new_make_logo_updated.png";
import "./Navbar.css";

function NavBar() {
  const navigate = useNavigate();

  return (
    <Group
      h="100%"
      px="md"
      style={{
        borderBottom: "2px solid #e0e0e0",
        paddingBottom: "10px",
      }}
    >
      <Group justify="space-between" style={{ flex: 1, padding: "10px" }}>
        <Group ml="xl" gap={2} visibleFrom="sm">
          <UnstyledButton
            onClick={() => navigate("/")}
            className="custom-button"
            style={{
              padding: "8px",
              outline: "none",
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <img src={homeIcon} alt="Home" width={80} height={80} />
          </UnstyledButton>

          <UnstyledButton
            onClick={() => navigate("/journal")}
            className="custom-button"
            style={{
              padding: "8px",
              outline: "none",
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            Journal
          </UnstyledButton>

          <UnstyledButton
            onClick={() => navigate("/dashboard")}
            className="custom-button"
            style={{
              padding: "8px",
              outline: "none",
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            Dashboard
          </UnstyledButton>

          <UnstyledButton
            className="custom-button"
            style={{
              padding: "8px",
              outline: "none",
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            Sign In
          </UnstyledButton>
        </Group>
      </Group>
    </Group>
  );
}

export default NavBar;
