import { NavLink } from "react-router-dom";
import { useTheme } from "../Contexts/ThemeProvider";

export const Header = () => {
  const { theme } = useTheme();

  return (
    <ul className={theme === "dark" ? "routing" : "routing light-routing"}>
      <li>
        <NavLink to="/" activeclassname="active">
          Map View
        </NavLink>
      </li>
      <li>
        <NavLink to="/cube" activeclassname="active">
          Cube View
        </NavLink>
      </li>
    </ul>
  );
};
