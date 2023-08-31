import { NavLink } from "react-router-dom";
import { useTheme } from "../Contexts/ThemeProvider";
import { useBox } from "../Contexts/BoxProvider";

export const Header = () => {
  const { isThemeDark } = useTheme();
  const { showCube } = useBox();

  return (
    <ul className={isThemeDark ? "routing" : "routing light-routing"}>
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
