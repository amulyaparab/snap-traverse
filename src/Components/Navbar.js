import { useNavigate } from "react-router-dom";
import { useTheme } from "../Contexts/ThemeProvider";

export const Navbar = () => {
  const navigate = useNavigate();
  const { toggleTheme, isThemeDark } = useTheme();

  return (
    <div className={isThemeDark ? "navbar" : "light-nav navbar"}>
      <h1 onClick={() => navigate("/")}>Snap Traverse</h1>
      {isThemeDark ? (
        <i className="fa-solid fa-moon" onClick={toggleTheme}></i>
      ) : (
        <i class="fa-solid fa-sun" onClick={toggleTheme}></i>
      )}
    </div>
  );
};
