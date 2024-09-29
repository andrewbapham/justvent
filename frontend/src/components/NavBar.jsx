import { useState } from "react";
import { Group, UnstyledButton } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/new_make_logo_updated.png";
import "./navbar.css";

function NavBar() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  return (
    <Group
      w="100%"
      px="md"
      justify="space-between"
      style={{
        borderBottom: "2px solid #e0e0e0",
        paddingBottom: "10px",
      }}
    >
      <Group gap={2}>
        <UnstyledButton
          onClick={() => navigate("/")}
          className="logo-button"
          style={{
            outline: "none",
            backgroundColor: "transparent",
            border: "none",
            paddingTop: "10px",
          }}
        >
          <img src={homeIcon} alt="Home" width={50} height={50} />
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
      </Group>

      <UnstyledButton
        onClick={() => navigate("/signin")}
        className="custom-button"
        id="hoverbutton"
        style={{
          textAlign: "center",
          padding: "12px 20px", 
          outline: "none",
          backgroundColor: isHovered ? "#C46A33" : "#D4A373", // Hover effect
          border: "none",
          color: "white",
          width: "100px", 
          borderRadius: "5px",
          fontSize: "1rem", 
          marginRight: "0.5em",
          cursor: "pointer", 
          transition: "background-color 0.3s ease", 
        }}
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} // Reset hover state to false
      >
        Sign In
      </UnstyledButton>
    </Group>
  );
}

export default NavBar;
