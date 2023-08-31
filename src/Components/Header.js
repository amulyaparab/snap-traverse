import { NavLink } from "react-router-dom";
import { useTheme } from "../Contexts/ThemeProvider";
import { useBox } from "../Contexts/BoxProvider";
import { useEffect, useState } from "react";

export const Header = () => {
  const { isThemeDark } = useTheme();
  const { showCube } = useBox();
  const [counter, setCounter] = useState(0);
  const { cube } = useBox();

  const handleRotation = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    if (counter > 0) {
      console.log(cube.current);
    }
  }, [counter]);

  return (
    <ul className={isThemeDark ? "routing" : "routing light-routing"}>
      <li onClick={handleRotation}>
        {/* <NavLink
          to="/"
          activeclassname="active"
          className={showCube && "seperator"}
        > */}
        Map View
        {/* </NavLink> */}
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
