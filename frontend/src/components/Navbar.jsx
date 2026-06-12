import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

function Navbar() {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (

    <nav className="navbar">

      <div className="logo">
        StudyPulse AI
      </div>

      <div className="nav-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/chat">
          Chat
        </Link>

        <Link to="/roadmap">
          Roadmap
        </Link>

        <Link to="/profile">
          Profile
        </Link>

      </div>

      <div className="user-section">

        <span>
          {user?.name}
        </span>

        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>

      </div>

    </nav>

  );
}

export default Navbar;