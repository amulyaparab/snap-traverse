import { NavLink } from "react-router-dom";
import { useTheme } from "../Contexts/ThemeProvider";
import { useBox } from "../Contexts/BoxProvider";

export const Header = () => {
  const { theme } = useTheme();
  const { showCube } = useBox();

  return (
    <ul className={theme === "dark" ? "routing" : "routing light-routing"}>
      <li>
        <NavLink
          to="/"
          activeclassname="active"
          className={showCube && "seperator"}
        >
          Map View
        </NavLink>
      </li>
      {showCube && (
        <li>
          <NavLink to="/cube" activeclassname="active">
            Cube View
          </NavLink>
        </li>
      )}
    </ul>
  );
};
