import { useNavigate } from "react-router-dom";
import { useTheme } from "../Contexts/ThemeProvider";
import { useBox } from "../Contexts/BoxProvider";

export const Navbar = () => {
  const navigate = useNavigate();
  const { setBoxTexture, screenshot } = useBox();
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
    theme === "dark" &&
      !screenshot &&
      setBoxTexture(
        "https://images.unsplash.com/photo-1570284613060-766c33850e00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      );
    theme === "light" &&
      !screenshot &&
      setBoxTexture(
        "https://images.unsplash.com/photo-1602173195036-5c649b66422d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"
      );
  };
  return (
    <div className={theme === "dark" ? "navbar" : "light-nav navbar"}>
      <h1 onClick={() => navigate("/")}>Snap Traverse</h1>
      {theme === "dark" ? (
        <i className="fa-solid fa-moon" onClick={toggleTheme}></i>
      ) : (
        <i class="fa-solid fa-sun" onClick={toggleTheme}></i>
      )}
    </div>
  );
};
