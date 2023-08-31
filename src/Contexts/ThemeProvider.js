import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const isItemInLocalStorage = localStorage.getItem("themeOfSnapTraverse");

  const [theme, setTheme] = useState(
    isItemInLocalStorage ? isItemInLocalStorage : "dark"
  );

  const isThemeDark = theme === "dark";

  const toggleTheme = () => {
    isThemeDark ? setTheme("light") : setTheme("dark");
  };

  useEffect(() => {
    localStorage.setItem("themeOfSnapTraverse", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme, isThemeDark }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
