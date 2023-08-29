import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h1 onClick={() => navigate("/")}>Snap Traverse</h1>
      <i className="fa-solid fa-moon"></i>
    </div>
  );
};
