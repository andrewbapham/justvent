import React from "react";
import "@mantine/core/styles.css";
import { AppShell } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import NavBar from "../src/components/NavBar";
import Signin from "./pages/SignIn";

import "./App.css";

function App() {
  return (
    <AppShell
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Router>
        <AppShell.Header>
          <NavBar />
        </AppShell.Header>
        <AppShell.Main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <GuestRoute path="/register" element={<Auth key="register" />} /> */}
            {/* <GuestRoute path="/login" element={<Auth key="login" />} /> */}
            {/* <AuthRoute path="/settings" element={<Settings />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/signin" element={<Signin />} />
            {/* <Route path="/profile/:username" element={<Profile />} /> */}
            {/* <AuthRoute path="/@:username" element={<Profile />} /> */}
          </Routes>
        </AppShell.Main>
      </Router>
    </AppShell>
  );
}

export default App;
