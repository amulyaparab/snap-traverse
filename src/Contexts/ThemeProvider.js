import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  // const toggleTheme = () => {
  //   theme === "dark" ? setTheme("light") : setTheme("dark");
  //   theme === "dark" ? set
  // };
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
