import "normalize.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "App";
import { BrowserRouter } from "react-router-dom";
import type {} from "styled-components/cssprop";
import { ThemeProvider } from "libs/contexts/ThemeContext";
import { GlobalStyles } from "styles/GlobalStyle";
import {  HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <GlobalStyles />
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
