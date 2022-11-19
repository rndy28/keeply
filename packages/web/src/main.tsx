import App from "App";
import { ThemeProvider } from "libs/contexts/ThemeContext";
import "normalize.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import type { } from "styled-components/cssprop";
import { GlobalStyles } from "styles/GlobalStyle";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
