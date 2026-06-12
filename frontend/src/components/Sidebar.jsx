import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <aside className="sidebar">

      <h2>
        Menu
      </h2>

      <Link to="/dashboard">
        Dashboard
      </Link>

      <Link to="/chat">
        AI Chat
      </Link>

      <Link to="/roadmap">
        Roadmaps
      </Link>

      <Link to="/profile">
        Profile
      </Link>

    </aside>

  );
}

export default Sidebar;