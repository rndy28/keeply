import { createCtx } from "libs/utils/createContext";
import { useEffect, useState } from "react";
import { ThemeProvider as StyledComponentProvider, useTheme as useStyledTheme } from "styled-components";
import { dark, light } from "styles/theme";

const [useChangeTheme, Provider] = createCtx<() => void>();

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const changeTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  return (
    <Provider value={changeTheme}>
      <StyledComponentProvider theme={theme === "light" ? light : dark}>{children}</StyledComponentProvider>
    </Provider>
  );
};

const useTheme = () => useStyledTheme();

export { useTheme, useChangeTheme, ThemeProvider };
