import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <ul className="pagination">
      <li>
        <NavLink to="/" activeclassname="active">
          Map
        </NavLink>
      </li>
      <li>
        <NavLink to="/cube" activeclassname="active">
          Cube
        </NavLink>
      </li>
    </ul>
  );
};
