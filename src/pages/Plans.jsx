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
    toast.success("You’ve been upgraded to Premium! 🚀");
    navigate("/search");
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Plans & Pricing - Rollie</title>
      </Helmet>

      <div className="container mt-5 mb-5">
        <h2 className="text-center fw-semibold mb-2">Choose Your Plan</h2>
        <p className="text-center text-muted mb-4">
          Find the right plan for your watch journey.
        </p>

        <div className="row justify-content-center g-4">
          {/* Free Plan */}
          <div className="col-md-5">
            <div className="card border-0 shadow-lg h-100">
              <div className="card-body text-center">
                <h4 className="card-title fw-bold">Free Plan</h4>
                <p className="text-muted mt-2">Great for occasional users.</p>

                <ul className="list-unstyled text-start mt-4 mb-4 small">
                  <li>✔ Up to 2 searches per month</li>
                  <li>✔ Access to basic search features</li>
                  <li className="text-muted">✖ Advanced filters</li>
                  <li className="text-muted">✖ Saved searches</li>
                </ul>

                <button
                  className="btn btn-outline-dark w-100"
                  disabled={user?.plan === "free"}
                >
                  {user?.plan === "free" ? "Current Plan" : "Free Plan"}
                </button>
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="col-md-5">
            <div className="card border-0 shadow-lg h-100 bg-light">
              <div className="card-body text-center">
                <h4 className="card-title fw-bold">Premium Plan</h4>
                <p className="text-muted mt-2">
                  Ideal for professionals and resellers.
                </p>

                <ul className="list-unstyled text-start mt-4 mb-4 small">
                  <li>✔ Unlimited searches</li>
                  <li>✔ Access to advanced filters</li>
                  <li>✔ Save and revisit your searches</li>
                  <li>✔ Early access to market insights</li>
                </ul>

                {user?.plan === "premium" || user?.role === "admin" ? (
                  <button className="btn btn-outline-success w-100" disabled>
                    Current Plan
                  </button>
                ) : (
                  <button
                    className="btn btn-dark w-100"
                    onClick={handleUpgrade}
                  >
                    Upgrade to Premium
                  </button>
                )}
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
