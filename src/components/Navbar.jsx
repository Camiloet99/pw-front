import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("lux_token");
    toast.success("You have successfully logged out.");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          LuxWatch
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-link d-flex align-items-center gap-2">
                    Welcome, <strong>{user.name}</strong>
                    <span
                      className={`badge rounded-pill ${
                        user.plan === "premium" ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {user.plan === "premium" ? "Premium" : "Free"}
                    </span>
                  </span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/search">
                    Search
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/account">
                    My Account
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/plans">
                    Plans
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light ms-2"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Log In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
