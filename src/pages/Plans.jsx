import { Helmet } from "react-helmet";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageTransition from "../components/PageTransition";

export default function Plans() {
  const { user, upgradeToPremium } = useAuth();
  const navigate = useNavigate();

  const handleUpgrade = () => {
    upgradeToPremium();
    toast.success("You have been upgraded to the Premium Plan! 🚀");
    navigate("/search");
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Subscription Plans - Rollie</title>
      </Helmet>

      <div className="container mt-5">
        <h2 className="mb-4 text-center">Choose Your Plan</h2>

        <div className="row justify-content-center g-4">
          {/* Free Plan */}
          <div className="col-md-5">
            <div className="card border-primary shadow-sm h-100">
              <div className="card-body text-center">
                <h4 className="card-title">Free Plan</h4>
                <p className="card-text mt-3">Great for occasional use.</p>
                <ul className="list-group list-group-flush text-start mt-3 mb-4">
                  <li className="list-group-item">
                    ✔ Up to 2 searches per month
                  </li>
                  <li className="list-group-item">✔ Access to basic search</li>
                  <li className="list-group-item text-muted">
                    ✖ No advanced filters
                  </li>
                  <li className="list-group-item text-muted">
                    ✖ No saved searches
                  </li>
                </ul>
                <button className="btn btn-outline-primary" disabled>
                  Current Plan
                </button>
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="col-md-5">
            <div className="card border-success shadow-sm h-100">
              <div className="card-body text-center">
                <h4 className="card-title">Premium Plan</h4>
                <p className="card-text mt-3">
                  Best for frequent users and watch resellers.
                </p>
                <ul className="list-group list-group-flush text-start mt-3 mb-4">
                  <li className="list-group-item">✔ Unlimited searches</li>
                  <li className="list-group-item">
                    ✔ Access to advanced filters
                  </li>
                  <li className="list-group-item">
                    ✔ Save and revisit searches
                  </li>
                  <li className="list-group-item">
                    ✔ Early access to price trends
                  </li>
                </ul>
                <button className="btn btn-success" onClick={handleUpgrade}>
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <small className="text-muted">
            Logged in as <strong>{user?.email}</strong>
          </small>
        </div>
      </div>
    </PageTransition>
  );
}
