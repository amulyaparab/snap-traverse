import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <ul className="pagination">
      <li>
        <NavLink to="/" activeClassName="active">
          Map
        </NavLink>
      </li>
      <li>
        <NavLink to="/cube" activeClassName="active">
          Cube
        </NavLink>
      </li>
    </ul>
  );
};
