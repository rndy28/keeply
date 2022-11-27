import { createCtx } from "libs/utils/createContext";
import { useEffect, useState } from "react";
import { ThemeProvider as StyledComponentProvider, useTheme as useStyledTheme } from "styled-components";
import { dark, light } from "styles/theme";

const [useChangeTheme, Provider] = createCtx<() => void>();

export type Theme = "light" | "dark";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => localStorage.getItem("preferredTheme") as Theme);

  const changeTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("preferredTheme", theme);
  }, [theme]);

  return (
    <Provider value={changeTheme}>
      <StyledComponentProvider theme={theme === "light" ? light : dark}>{children}</StyledComponentProvider>
    </Provider>
  );
};

const useTheme = () => useStyledTheme();

export { useTheme, useChangeTheme, ThemeProvider };
