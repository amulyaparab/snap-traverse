import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <nav>
      <NavLink to="/">Map</NavLink>
      <NavLink to="/cube">Cube</NavLink>
    </nav>
  );
};
