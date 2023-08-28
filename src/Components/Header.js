import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <ul className="pagination">
      <li>
        <NavLink to="/">Map</NavLink>
      </li>{" "}
      <li>|</li>
      <li>
        <NavLink to="/cube">Cube</NavLink>
      </li>
    </ul>
  );
};
