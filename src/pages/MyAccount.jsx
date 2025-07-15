import { useAuth } from "../contexts/AuthContext";
import { Helmet } from "react-helmet";

export default function MyAccount() {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>My Account - LuxWatch</title>
      </Helmet>

      <div className="container mt-5">
        <h2 className="mb-4">My Account</h2>

        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Account Details</h5>
            <ul className="list-group list-group-flush mt-3">
              <li className="list-group-item">
                <strong>Name:</strong> {user.name}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {user.email}
              </li>
              <li className="list-group-item">
                <strong>Role:</strong> {user.role}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
