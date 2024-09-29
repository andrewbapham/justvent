import React, { useState } from "react";
import {
  Container,
  Button,
  Card,
  Title,
  Center,
} from "@mantine/core";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the dashboard page on form submission
    navigate("/dashboard");
  };

  return (
    <Center w={"100vw"} h={"100vh"} bg={"#FAEDCD"}> {/* Full page background color */}
      <Container
        align="center"
        size="md"
        style={{ marginTop: "20px", paddingTop: "5em" }}
      >
        <Card shadow="sm" padding="lg" mb="lg" bg={"#FAEDCD"}> {/* Form background color */}
          <Title order={2} align="center" style={{ marginBottom: "20px" }}>
            Sign in or create your account
          </Title>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", /* Center the form inputs */
              gap: "20px", /* Larger gap for larger inputs */
              marginTop: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "80%", /* Center and limit form width */
                marginBottom: "10px",
              }}
            >
              <label style={{ marginBottom: "10px", fontSize: "18px" }}>
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  padding: "15px 20px", /* Larger padding for larger input */
                  fontSize: "16px",
                  border: "1px solid #5D8A2C",
                  backgroundColor: "#ffffff", /* Input background color changed to white */
                  outline: "none",
                  width: "100%",
                  borderRadius: "5px",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "80%", /* Center and limit form width */
                marginBottom: "10px",
              }}
            >
              <label style={{ marginBottom: "10px", fontSize: "18px" }}>
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  padding: "15px 20px", /* Larger padding for larger input */
                  fontSize: "16px",
                  border: "1px solid #5D8A2C",
                  backgroundColor: "#ffffff", /* Input background color changed to white */
                  outline: "none",
                  width: "100%",
                  borderRadius: "5px",
                }}
              />
            </div>
            <Button
              type="submit"
              style={{
                padding: "10px 20px", // Reduced padding to prevent text from being covered
                backgroundColor: "#4CAF50", // Green background color
                color: "#ffffff", // White text color for good contrast
                border: "none", // Remove border for a cleaner look
                fontSize: "18px", // Reasonable font size for visibility
                fontWeight: "bold", // Bold text for better visibility
                textAlign: "center", // Ensure the text is centered
                borderRadius: "5px", // Rounded corners for better aesthetics
                cursor: "pointer", // Add pointer cursor for better UX
              }}
            >
              Sign In
            </Button>

            {/* Text to create an account */}
            <p
              className="create-account"
              onClick={() => {
                alert("Coming on future updates");
              }}
              style={{ marginTop: "15px", cursor: "pointer" }}
            >
              Create an account
            </p>
          </form>
        </Card>
      </Container>
      <style>
        {
          ".create-account {color: #7e8f43;text-align: center;font-size: 16px;} .create-account:hover {color: #bac985;text-decoration: underline;.hide-scroll-bar {overflow-x: hidden;} .submit-button:hover {background-color: #5D8A2C;} "
        }
      </style>
    </Center>
  );
};

export default Signin;
