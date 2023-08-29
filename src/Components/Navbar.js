import { useNavigate } from "react-router-dom";
import { useTheme } from "../Contexts/ThemeProvider";

export const Navbar = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };
  return (
    <div className="navbar">
      <h1 onClick={() => navigate("/")}>Snap Traverse</h1>
      {theme === "dark" ? (
        <i className="fa-solid fa-moon" onClick={toggleTheme}></i>
      ) : (
        <i class="fa-solid fa-sun" onClick={toggleTheme}></i>
      )}
    </div>
  );
};
