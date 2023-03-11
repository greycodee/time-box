import { Container } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Container sx={{
      pt:2
    }} maxWidth="sm">
      <App />
    </Container>
  </React.StrictMode>
);
