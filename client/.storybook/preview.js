import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../src/styles/GlobalStyle";
import { dark } from "../src/styles/theme";

export const decorators = [
  (Story) => {
    return React.createElement(ThemeProvider, {
      children: [React.createElement(Story), React.createElement(GlobalStyles)],
      theme: dark
    })
  }
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
