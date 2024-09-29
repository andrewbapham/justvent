import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import App from "./App.jsx";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider>
      <Notifications position="bottom-right" />
      <App />
    </MantineProvider>
  </StrictMode>
);
