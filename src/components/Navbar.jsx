import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function AppNavbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("lux_token");
    toast.success("You have successfully logged out.");
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Rollie
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="rollie-navbar" />
        <Navbar.Collapse id="rollie-navbar">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link disabled className="d-flex align-items-center gap-2">
                  Welcome, <strong>{user?.firstName}</strong>
                  <Badge
                    bg={
                      user.role === "admin"
                        ? "danger"
                        : user.plan === "premium"
                        ? "success"
                        : "secondary"
                    }
                    pill
                  >
                    {user.role === "admin"
                      ? "Admin"
                      : user.plan === "premium"
                      ? "Premium"
                      : "Free"}
                  </Badge>
                </Nav.Link>
                {user?.role === "admin" && (
                  <Nav.Link as={Link} to="/admin/upload">
                    Upload Document
                  </Nav.Link>
                )}
                {user?.role === "admin" && (
                  <Nav.Link as={Link} to="/admin/users">
                    Manage Users
                  </Nav.Link>
                )}
                <Nav.Link as={Link} to="/search">
                  Search
                </Nav.Link>
                <Nav.Link as={Link} to="/account">
                  My Account
                </Nav.Link>
                {user?.role === "admin" && (
                  <Nav.Link as={Link} to="/plans">
                    Plans
                  </Nav.Link>
                )}
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                  className="ms-2"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Log In
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
