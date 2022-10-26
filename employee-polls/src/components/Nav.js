import { connect } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Nav = ({ users }) => {
  const { authed, authedUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const currentUser = users[authedUser];

  const homeSelected = location.pathname === "/";
  const leaderboardSelected = location.pathname === "/leaderboard";
  const newSelected = location.pathname === "/add";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="nav">
      <ul>
        <li style={{ borderBottom: homeSelected ? "2px solid black" : "" }}>
          <Link to="/">Home</Link>
        </li>
        <li
          style={{ borderBottom: leaderboardSelected ? "2px solid black" : "" }}
        >
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li style={{ borderBottom: newSelected ? "2px solid black" : "" }}>
          <Link to="/add">New</Link>
        </li>
        {currentUser && (
          <li>
            <div>
              <img
                src={currentUser.avatarURL}
                alt={`Avatar of ${currentUser.name}`}
                className="avatar"
              />
            </div>
            <div>{currentUser.id}</div>
          </li>
        )}
        {currentUser && <li></li>}
        {authed && <NavLink onClick={handleLogout}>Logout</NavLink>}
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(Nav);
