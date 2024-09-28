import React from "react";
import "@mantine/core/styles.css";
import { AppShell, MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import NavBar from "../src/components/NavBar";

import "./App.css";

function App() {
  return (
    <MantineProvider>
      <Router>
        <AppShell>
          <header>
            <NavBar />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <GuestRoute path="/register" element={<Auth key="register" />} /> */}
              {/* <GuestRoute path="/login" element={<Auth key="login" />} /> */}
              {/* <AuthRoute path="/settings" element={<Settings />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/journal" element={<Journal />} />
              {/* <Route path="/profile/:username" element={<Profile />} /> */}
              {/* <AuthRoute path="/@:username" element={<Profile />} /> */}
            </Routes>
          </main>
          <footer>
            <div className="container">footer</div>
          </footer>
        </AppShell>
      </Router>
    </MantineProvider>
  );
}

export default App;
