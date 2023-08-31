import { useNavigate } from "react-router-dom";
import { useTheme } from "../Contexts/ThemeProvider";

export const Navbar = () => {
  const navigate = useNavigate();
  const { toggleTheme, isThemeDark } = useTheme();

  return (
    <div className={isThemeDark ? "navbar" : "light-nav navbar"}>
      <h1 onClick={() => navigate("/")}>Snap Traverse</h1>
      <i
        className={`fa-solid ${isThemeDark ? "fa-moon" : "fa-sun"}`}
        onClick={toggleTheme}
      ></i>
    </div>
  );
};
