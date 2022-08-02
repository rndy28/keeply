import { DefaultTheme } from "styled-components";

export const light: DefaultTheme = {
  colorBackground: "#fff",
  colorText: "#434C5E",
  colorBorder: "#D8DEE9",
  colorCardBackground: "transparent",
  colorDisabledBackground: "#f3f5f8",
  colorLabel: "#5e6779",
  colorLabelBackground: "#f3f5f8",
  colorAccent: "#3B4252",
  colorAccentText: "#f7f8fb",
  borderRadius: "0.4rem",
  boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
  state: "light",
};

export const dark: DefaultTheme = {
  ...light,
  colorBackground: "#2E3440",
  colorText: "#D8DEE9",
  colorBorder: "#3B4252",
  colorCardBackground: "transparent",
  colorDisabledBackground: "#4C566A",
  colorLabel: "#c2c8d2",
  colorLabelBackground: "#353c4a",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
  borderRadius: "0.4rem",
  state: "dark",
};
